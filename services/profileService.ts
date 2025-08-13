import { supabase } from '../lib/supabase';

export class ProfileService {
  // 更新用户档案
  static async updateProfile(userId: string, updates: {
    username?: string;
    favorite_location?: string;
    bio?: string;
    avatar_url?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('更新档案错误:', error);
      return { data: null, error };
    }
  }

  // 获取用户统计数据
  static async getUserStats(userId: string) {
    try {
      const [tasksResult, postsResult, achievementsResult] = await Promise.all([
        supabase.from('daily_tasks').select('*').eq('user_id', userId),
        supabase.from('community_posts').select('*').eq('user_id', userId),
        supabase.from('user_achievements').select('*').eq('user_id', userId)
      ]);

      const tasks = tasksResult.data || [];
      const posts = postsResult.data || [];
      const achievements = achievementsResult.data || [];

      const completedTasks = tasks.filter(t => t.status === 'completed');
      const thisWeekTasks = tasks.filter(t => {
        const taskDate = new Date(t.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return taskDate > weekAgo;
      });

      const stats = {
        totalTasks: tasks.length,
        completedTasks: completedTasks.length,
        thisWeekTasks: thisWeekTasks.length,
        totalPosts: posts.length,
        totalAchievements: achievements.length,
        totalLikes: posts.reduce((sum, post) => sum + post.likes_count, 0),
        averageRating: completedTasks.length > 0 
          ? completedTasks.reduce((sum, task) => sum + (task.rating || 0), 0) / completedTasks.length 
          : 0,
        tasksByDifficulty: {
          easy: completedTasks.filter(t => t.difficulty === 'easy').length,
          medium: completedTasks.filter(t => t.difficulty === 'medium').length,
          hard: completedTasks.filter(t => t.difficulty === 'hard').length,
        },
        monthlyProgress: this.calculateMonthlyProgress(completedTasks)
      };

      return { data: stats, error: null };
    } catch (error) {
      console.error('获取用户统计错误:', error);
      return { data: null, error };
    }
  }

  // 计算月度进度
  static calculateMonthlyProgress(completedTasks: any[]) {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const monthTasks = completedTasks.filter(task => {
        const taskDate = new Date(task.completed_at);
        return taskDate >= month && taskDate < nextMonth;
      });

      months.push({
        month: month.toLocaleDateString('zh-CN', { month: 'short' }),
        tasks: monthTasks.length,
        points: monthTasks.reduce((sum, task) => sum + task.points, 0)
      });
    }

    return months;
  }

  // 获取用户排名
  static async getUserRanking(userId: string) {
    try {
      // 获取用户积分排名
      const { data: pointsRanking } = await supabase
        .from('user_profiles')
        .select('id, points')
        .order('points', { ascending: false });

      const pointsRank = pointsRanking?.findIndex(user => user.id === userId) + 1 || 0;

      // 获取用户任务完成排名
      const { data: tasksRanking } = await supabase
        .from('user_profiles')
        .select('id, completed_tasks')
        .order('completed_tasks', { ascending: false });

      const tasksRank = tasksRanking?.findIndex(user => user.id === userId) + 1 || 0;

      return {
        data: {
          pointsRank,
          tasksRank,
          totalUsers: pointsRanking?.length || 0
        },
        error: null
      };
    } catch (error) {
      console.error('获取用户排名错误:', error);
      return { data: null, error };
    }
  }

  // 获取用户偏好设置
  static async getUserPreferences(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      // 如果没有偏好设置，返回默认值
      if (!data) {
        const defaultPrefs = {
          notifications_enabled: true,
          location_enabled: true,
          difficulty_preference: 'medium',
          activity_types: ['walking', 'photography', 'meditation'],
          reminder_time: '09:00'
        };
        
        // 创建默认偏好设置
        await this.updateUserPreferences(userId, defaultPrefs);
        
        return {
          data: defaultPrefs,
          error: null
        };
      }

      return { data, error: null };
    } catch (error) {
      console.error('获取用户偏好错误:', error);
      return { data: null, error };
    }
  }

  // 更新用户偏好设置
  static async updateUserPreferences(userId: string, preferences: any) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: userId,
          ...preferences,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('更新用户偏好错误:', error);
      return { data: null, error };
    }
  }
}