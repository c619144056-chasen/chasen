import { supabase } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Create a service role client for data initialization (bypasses RLS)
const getServiceClient = () => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('TaskService: Service role key not found. Falling back to regular client...');
    return supabase;
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export class TaskService {
  // 获取今日任务
  static async getTodayTask(userId: string) {
    try {
      // 检查是否已有今日任务
      const today = new Date().toISOString().split('T')[0];
      
      const { data: existingTask, error: fetchError } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lt('created_at', `${today}T23:59:59.999Z`)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingTask) {
        return { data: existingTask, error: null };
      }

      // 生成新任务
      return await this.generateSmartTask(userId);
    } catch (error) {
      console.error('获取今日任务错误:', error);
      return { data: null, error };
    }
  }

  // 智能生成任务
  static async generateSmartTask(userId: string) {
    try {
      // 获取用户信息
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('level, social_level')
        .eq('id', userId)
        .single();

      const userLevel = userProfile?.level || 1;
      const socialLevel = userProfile?.social_level || 1;

      // 获取随机目的地
      const { data: destinations } = await supabase
        .from('destinations')
        .select('*');

      if (!destinations || destinations.length === 0) {
        throw new Error('没有可用的目的地数据');
      }

      const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];

      // 获取适合的户外目标
      const { data: outdoorGoals } = await supabase
        .from('outdoor_goals_data')
        .select('*')
        .lte('min_user_level', userLevel)
        .or(`applicable_destination_type.eq.${randomDestination.type},applicable_destination_type.is.null`);

      // 获取适合的社交目标
      const { data: socialGoals } = await supabase
        .from('social_goals_data')
        .select('*')
        .lte('min_user_level', socialLevel)
        .or(`applicable_destination_type.eq.${randomDestination.type},applicable_destination_type.is.null`);

      // 随机选择目标
      const selectedOutdoorGoal = outdoorGoals && outdoorGoals.length > 0 
        ? outdoorGoals[Math.floor(Math.random() * outdoorGoals.length)]
        : this.getDefaultOutdoorGoal();

      const selectedSocialGoal = socialGoals && socialGoals.length > 0
        ? socialGoals[Math.floor(Math.random() * socialGoals.length)]
        : this.getDefaultSocialGoal();

      // 获取准备物品
      const { data: preparationItems } = await supabase
        .from('preparation_items_data')
        .select('item_text')
        .lte('min_difficulty_level', randomDestination.difficulty_level);

      // 获取安全提示
      const { data: safetyTips } = await supabase
        .from('safety_tips_data')
        .select('tip_text')
        .or(`applicable_destination_type.eq.${randomDestination.type},applicable_destination_type.is.null`);

      // 创建任务
      const newTask = {
        user_id: userId,
        title: `探索${randomDestination.name}`,
        difficulty: randomDestination.difficulty_level,
        estimated_time: this.getEstimatedTime(randomDestination.difficulty_level),
        points: this.getTaskPoints(randomDestination.difficulty_level),
        destination_name: randomDestination.name,
        destination_distance: randomDestination.distance,
        destination_image: randomDestination.image,
        destination_latitude: randomDestination.latitude,
        destination_longitude: randomDestination.longitude,
        outdoor_goal_title: selectedOutdoorGoal.title,
        outdoor_goal_description: selectedOutdoorGoal.description,
        outdoor_goal_tips: selectedOutdoorGoal.tips,
        social_goal_title: selectedSocialGoal.title,
        social_goal_description: selectedSocialGoal.description,
        social_goal_tips: selectedSocialGoal.tips,
        preparation: preparationItems?.map(item => item.item_text) || [],
        safety_tips: safetyTips?.map(tip => tip.tip_text) || [],
        status: 'available'
      };

      const { data: createdTask, error } = await supabase
        .from('daily_tasks')
        .insert(newTask)
        .select()
        .single();

      if (error) throw error;

      return { data: createdTask, error: null };
    } catch (error) {
      console.error('生成智能任务错误:', error);
      return { data: null, error };
    }
  }

  // 开始任务
  static async startTask(taskId: string) {
    try {
      const { data, error } = await supabase
        .from('daily_tasks')
        .update({ status: 'in_progress' })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('开始任务错误:', error);
      return { data: null, error };
    }
  }

  // 完成任务
  static async completeTask(taskId: string, completionData: {
    completion_photos?: string[];
    completion_notes?: string;
    rating?: number;
  }) {
    try {
      // 获取任务信息
      const { data: task } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (!task) {
        throw new Error('任务不存在');
      }

      // 计算积分分配
      const totalPoints = task.points || 50;
      const outdoorPoints = Math.floor(totalPoints * 0.6);
      const socialPoints = totalPoints - outdoorPoints;

      // 创建完成记录
      const { error: completionError } = await supabase
        .from('task_completions')
        .insert({
          user_id: task.user_id,
          task_id: taskId,
          completion_photos: completionData.completion_photos || [],
          completion_notes: completionData.completion_notes,
          rating: completionData.rating,
          outdoor_completed: true,
          social_completed: true,
          outdoor_points_earned: outdoorPoints,
          social_points_earned: socialPoints
        });

      if (completionError) throw completionError;

      // 更新任务状态
      const { data: updatedTask, error: updateError } = await supabase
        .from('daily_tasks')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', taskId)
        .select()
        .single();

      if (updateError) throw updateError;

      // 更新用户积分和统计
      await this.updateUserStats(task.user_id, totalPoints, outdoorPoints, socialPoints);

      return { data: updatedTask, error: null };
    } catch (error) {
      console.error('完成任务错误:', error);
      return { data: null, error };
    }
  }

  // 更新用户统计
  static async updateUserStats(userId: string, totalPoints: number, outdoorPoints: number, socialPoints: number) {
    try {
      const { data: currentProfile } = await supabase
        .from('user_profiles')
        .select('points, social_points, completed_tasks, streak, level, social_level')
        .eq('id', userId)
        .single();

      if (!currentProfile) return;

      const newPoints = (currentProfile.points || 0) + outdoorPoints;
      const newSocialPoints = (currentProfile.social_points || 0) + socialPoints;
      const newCompletedTasks = (currentProfile.completed_tasks || 0) + 1;
      const newStreak = (currentProfile.streak || 0) + 1;

      // 计算新等级
      const newLevel = Math.floor(newPoints / 1000) + 1;
      const newSocialLevel = Math.floor(newSocialPoints / 500) + 1;

      const { error } = await supabase
        .from('user_profiles')
        .update({
          points: newPoints,
          social_points: newSocialPoints,
          completed_tasks: newCompletedTasks,
          streak: newStreak,
          level: newLevel,
          social_level: newSocialLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('更新用户统计错误:', error);
    }
  }

  // 获取任务历史
  static async getTaskHistory(userId: string, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('daily_tasks')
        .select(`
          *,
          task_completions (
            completion_photos,
            completion_notes,
            rating,
            completed_at
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取任务历史错误:', error);
      return { data: null, error };
    }
  }

  // 获取任务统计
  static async getTaskStats(userId: string) {
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('completed_tasks, points, social_points, streak, level, social_level')
        .eq('id', userId)
        .single();

      const { data: completions } = await supabase
        .from('task_completions')
        .select('rating')
        .eq('user_id', userId);

      const averageRating = completions && completions.length > 0
        ? completions.reduce((sum, c) => sum + (c.rating || 0), 0) / completions.length
        : 0;

      return {
        data: {
          completedTasks: profile?.completed_tasks || 0,
          totalPoints: profile?.points || 0,
          socialPoints: profile?.social_points || 0,
          currentStreak: profile?.streak || 0,
          level: profile?.level || 1,
          socialLevel: profile?.social_level || 1,
          averageRating: Math.round(averageRating * 10) / 10
        },
        error: null
      };
    } catch (error) {
      console.error('获取任务统计错误:', error);
      return { data: null, error };
    }
  }

  // 辅助方法
  static getEstimatedTime(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '30-45分钟';
      case 'medium': return '45-60分钟';
      case 'hard': return '60-90分钟';
      default: return '30-45分钟';
    }
  }

  static getTaskPoints(difficulty: string): number {
    switch (difficulty) {
      case 'easy': return 50;
      case 'medium': return 75;
      case 'hard': return 100;
      default: return 50;
    }
  }

  static getDefaultOutdoorGoal() {
    return {
      title: '自然观察挑战',
      description: '寻找并拍摄3种不同形状的叶子，观察它们的纹理和颜色差异',
      tips: '注意观察叶子的边缘、叶脉和颜色变化'
    };
  }

  static getDefaultSocialGoal() {
    return {
      title: '友善问候',
      description: '向遇到的3位游客友善问候',
      tips: '保持微笑，选择合适的时机'
    };
  }
}