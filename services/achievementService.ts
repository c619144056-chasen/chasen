import { supabase } from '../lib/supabase';
import { Achievement, UserAchievement } from '../lib/supabase';

export class AchievementService {
  // 获取所有成就
  static async getAllAchievements() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('points', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取成就错误:', error);
      return { data: null, error };
    }
  }

  // 获取用户成就
  static async getUserAchievements(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq('user_id', userId)
        .order('unlocked_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取用户成就错误:', error);
      return { data: null, error };
    }
  }

  // 解锁成就
  static async unlockAchievement(userId: string, achievementId: string) {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievementId,
        })
        .select(`
          *,
          achievement:achievements(*)
        `)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('解锁成就错误:', error);
      return { data: null, error };
    }
  }

  // 智能成就检查和解锁系统
  static async checkAndUnlockAchievements(userId: string) {
    try {
      // 获取用户档案和统计数据
      const [profileResult, tasksResult, postsResult] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('id', userId).single(),
        supabase.from('daily_tasks').select('*').eq('user_id', userId),
        supabase.from('community_posts').select('*').eq('user_id', userId)
      ]);

      if (profileResult.error) throw profileResult.error;

      const profile = profileResult.data;
      const tasks = tasksResult.data || [];
      const posts = postsResult.data || [];

      // 获取用户已有成就
      const { data: userAchievements } = await this.getUserAchievements(userId);
      const unlockedAchievementIds = userAchievements?.map(ua => ua.achievement_id) || [];

      // 获取所有成就
      const { data: allAchievements } = await this.getAllAchievements();
      if (!allAchievements) return { data: [], error: null };

      const newAchievements = [];

      // 智能成就检查系统
      for (const achievement of allAchievements) {
        if (unlockedAchievementIds.includes(achievement.id)) continue;

        const shouldUnlock = await this.evaluateAchievementCondition(
          achievement,
          profile,
          tasks,
          posts
        );

        if (shouldUnlock) {
          const { data: newAchievement } = await this.unlockAchievement(userId, achievement.id);
          if (newAchievement) {
            newAchievements.push(newAchievement);
            
            // 发送成就解锁通知
            await this.sendAchievementNotification(userId, achievement);
            
            // 更新用户积分
            await this.updateUserPointsForAchievement(userId, achievement.points);
          }
        }
      }

      return { data: newAchievements, error: null };
    } catch (error) {
      console.error('检查成就错误:', error);
      return { data: null, error };
    }
  }

  // 更新用户积分（成就奖励）
  static async updateUserPointsForAchievement(userId: string, points: number) {
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('points')
        .eq('id', userId)
        .single();

      if (profile) {
        await supabase
          .from('user_profiles')
          .update({
            points: profile.points + points,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);
      }
    } catch (error) {
      console.error('更新成就积分错误:', error);
    }
  }

  // 评估成就解锁条件
  static async evaluateAchievementCondition(
    achievement: Achievement,
    profile: any,
    tasks: any[],
    posts: any[]
  ): Promise<boolean> {
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const currentStreak = profile.streak;
    const totalPoints = profile.points;

    switch (achievement.unlock_condition) {
      // 基础任务成就
      case 'complete_first_task': {
        return completedTasks.length >= 1;
      }

      case 'complete_5_tasks': {
        return completedTasks.length >= 5;
      }

      case 'complete_10_tasks':
        return completedTasks.length >= 10;

      case 'complete_15_tasks':
        return completedTasks.length >= 15;

      case 'complete_20_tasks':
        return completedTasks.length >= 20;

      case 'complete_25_tasks':
        return completedTasks.length >= 25;

      case 'complete_30_tasks':
        return completedTasks.length >= 30;

      case 'complete_40_tasks':
        return completedTasks.length >= 40;

      case 'complete_50_tasks':
        return completedTasks.length >= 50;

      case 'complete_75_tasks':
        return completedTasks.length >= 75;

      case 'complete_100_tasks':
        return completedTasks.length >= 100;

      case 'complete_150_tasks':
        return completedTasks.length >= 150;

      case 'complete_200_tasks':
        return completedTasks.length >= 200;

      case 'complete_300_tasks':
        return completedTasks.length >= 300;

      case 'complete_500_tasks':
        return completedTasks.length >= 500;

      // 连续天数成就
      case 'streak_3_days': {
        return currentStreak >= 3;
      }

      case 'streak_5_days': {
        return currentStreak >= 5;
      }

      case 'streak_7_days':
        return currentStreak >= 7;

      case 'streak_10_days':
        return currentStreak >= 10;

      case 'streak_15_days':
        return currentStreak >= 15;

      case 'streak_21_days':
        return currentStreak >= 21;

      case 'streak_30_days':
        return currentStreak >= 30;

      case 'streak_60_days':
        return currentStreak >= 60;

      case 'streak_90_days':
        return currentStreak >= 90;

      case 'streak_100_days':
        return currentStreak >= 100;

      case 'streak_200_days':
        return currentStreak >= 200;

      case 'streak_365_days':
        return currentStreak >= 365;

      // 积分成就
      case 'earn_100_points': {
        return totalPoints >= 100;
      }

      case 'earn_250_points': {
        return totalPoints >= 250;
      }

      case 'earn_500_points':
        return totalPoints >= 500;

      case 'earn_750_points':
        return totalPoints >= 750;

      case 'earn_1000_points':
        return totalPoints >= 1000;

      case 'earn_1500_points':
        return totalPoints >= 1500;

      case 'earn_2000_points':
        return totalPoints >= 2000;

      case 'earn_2500_points':
        return totalPoints >= 2500;

      case 'earn_3500_points':
        return totalPoints >= 3500;

      case 'earn_5000_points':
        return totalPoints >= 5000;

      case 'earn_7500_points':
        return totalPoints >= 7500;

      case 'earn_10000_points':
        return totalPoints >= 10000;

      case 'earn_15000_points':
        return totalPoints >= 15000;

      case 'earn_20000_points':
        return totalPoints >= 20000;

      // 照片上传成就
      case 'upload_1_photo': {
        const tasksWithPhotos1 = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length > 0
        );
        return tasksWithPhotos1.length >= 1;
      }

      case 'upload_3_photos': {
        const tasksWithPhotos3 = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length > 0
        );
        return tasksWithPhotos3.length >= 3;
      }

      case 'upload_5_photos': {
        const tasksWithPhotos5 = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length > 0
        );
        return tasksWithPhotos5.length >= 5;
      }

      case 'upload_10_photos': {
        const tasksWithPhotos = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length > 0
        );
        return tasksWithPhotos.length >= 10;
      }

      case 'upload_15_photos': {
        const tasksWithPhotos15 = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length > 0
        );
        return tasksWithPhotos15.length >= 15;
      }

      case 'upload_20_photos': {
        const tasksWithPhotos20 = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length > 0
        );
        return tasksWithPhotos20.length >= 20;
      }

      case 'upload_25_photos': {
        const { data: completionsWithPhotos } = await supabase
          .from('task_completions')
          .select('completion_photos')
          .eq('user_id', profile.id)
          .not('completion_photos', 'is', null);
        
        const photosCount = completionsWithPhotos?.filter(c => 
          c.completion_photos && c.completion_photos.length > 0
        ).length || 0;
        
        return photosCount >= 25;
      }

      case 'upload_35_photos': {
        const { data: completionsWithPhotos } = await supabase
          .from('task_completions')
          .select('completion_photos')
          .eq('user_id', profile.id)
          .not('completion_photos', 'is', null);
        
        const photosCount = completionsWithPhotos?.filter(c => 
          c.completion_photos && c.completion_photos.length > 0
        ).length || 0;
        
        return photosCount >= 35;
      }

      case 'upload_50_photos': {
        const { data: completionsWithPhotos } = await supabase
          .from('task_completions')
          .select('completion_photos')
          .eq('user_id', profile.id)
          .not('completion_photos', 'is', null);
        
        const photosCount = completionsWithPhotos?.filter(c => 
          c.completion_photos && c.completion_photos.length > 0
        ).length || 0;
        
        return photosCount >= 50;
      }

      case 'upload_75_photos': {
        const { data: completionsWithPhotos } = await supabase
          .from('task_completions')
          .select('completion_photos')
          .eq('user_id', profile.id)
          .not('completion_photos', 'is', null);
        
        const photosCount = completionsWithPhotos?.filter(c => 
          c.completion_photos && c.completion_photos.length > 0
        ).length || 0;
        
        return photosCount >= 75;
      }

      case 'upload_100_photos': {
        const { data: completionsWithPhotos } = await supabase
          .from('task_completions')
          .select('completion_photos')
          .eq('user_id', profile.id)
          .not('completion_photos', 'is', null);
        
        const photosCount = completionsWithPhotos?.filter(c => 
          c.completion_photos && c.completion_photos.length > 0
        ).length || 0;
        
        return photosCount >= 100;
      }

      // 社区互动成就
      case 'first_post':
        return posts.length >= 1;

      case 'post_5_times':
        return posts.length >= 5;

      case 'post_10_times':
        return posts.length >= 10;

      case 'post_15_times':
        return posts.length >= 15;

      case 'post_20_times':
        return posts.length >= 20;

      case 'post_30_times':
        return posts.length >= 30;

      case 'post_50_times': {
        return posts.length >= 50;
      }

      case 'get_10_likes': {
        const totalLikes10 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes10 >= 10;
      }

      case 'get_5_likes': {
        const totalLikes5 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes5 >= 5;
      }

      case 'get_15_likes': {
        const totalLikes15 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes15 >= 15;
      }

      case 'get_20_likes': {
        const totalLikes20 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes20 >= 20;
      }

      case 'get_25_likes': {
        const totalLikes25 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes25 >= 25;
      }

      case 'get_35_likes': {
        const totalLikes35 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes35 >= 35;
      }

      case 'get_50_likes': {
        const totalLikes = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes >= 50;
      }

      case 'get_75_likes': {
        const totalLikes75 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes75 >= 75;
      }

      case 'get_100_likes': {
        const totalLikes100 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes100 >= 100;
      }

      case 'get_150_likes': {
        const totalLikes150 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes150 >= 150;
      }

      case 'get_200_likes': {
        const totalLikes200 = posts.reduce((sum, post) => sum + post.likes_count, 0);
        return totalLikes200 >= 200;
      }

      case 'post_50_comments':
        // 这需要评论数据，暂时简化
        return posts.length >= 15 && totalPoints >= 1000;

      case 'post_10_comments': {
        return posts.length >= 5 && totalPoints >= 200;
      }

      case 'post_25_comments':
        return posts.length >= 10 && totalPoints >= 500;

      case 'post_100_comments':
        return posts.length >= 25 && totalPoints >= 2000;

      case 'social_butterfly':
        return posts.length >= 20; // This case was already wrapped in the previous turn.

      // 时间相关成就
      case 'morning_explorer': {
        const morningTasks = completedTasks.filter(t => {
          const hour = new Date(t.completed_at).getHours();
          return hour >= 6 && hour < 10;
        });
        return morningTasks.length >= 10;
      }

      case 'afternoon_adventurer': {
        const afternoonTasks = completedTasks.filter(t => {
          const hour = new Date(t.completed_at).getHours();
          return hour >= 14 && hour < 18;
        });
        return afternoonTasks.length >= 10;
      }

      case 'sunset_seeker': {
        const sunsetTasks = completedTasks.filter(t => {
          const hour = new Date(t.completed_at).getHours();
          return hour >= 18 && hour < 20;
        });
        return sunsetTasks.length >= 5;
      }

      // 季节成就
      case 'spring_explorer': {
        const springTasks = completedTasks.filter(t => {
          const month = new Date(t.completed_at).getMonth() + 1;
          return month >= 3 && month <= 5;
        });
        return springTasks.length >= 10;
      }

      case 'summer_adventurer': {
        const summerTasks = completedTasks.filter(t => {
          const month = new Date(t.completed_at).getMonth() + 1;
          return month >= 6 && month <= 8;
        });
        return summerTasks.length >= 10;
      }

      case 'autumn_wanderer': {
        const autumnTasks = completedTasks.filter(t => {
          const month = new Date(t.completed_at).getMonth() + 1;
          return month >= 9 && month <= 11;
        });
        return autumnTasks.length >= 10;
      }

      case 'winter_warrior': {
        const winterTasks = completedTasks.filter(t => {
          const month = new Date(t.completed_at).getMonth() + 1;
          return month === 12 || month <= 2;
        });
        return winterTasks.length >= 10;
      }

      // 特殊挑战成就
      case 'speed_demon': {
        const quickTasks = completedTasks.filter(t => {
          const startTime = new Date(t.created_at);
          const endTime = new Date(t.completed_at);
          const diffInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
          return diffInMinutes <= 30;
        });
        return quickTasks.length >= 5;
      }

      case 'marathon_explorer': {
        const longTasks = completedTasks.filter(t => {
          const startTime = new Date(t.created_at);
          const endTime = new Date(t.completed_at);
          const diffInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
          return diffInHours >= 3;
        });
        return longTasks.length >= 5;
      }

      case 'quality_seeker': {
        const { data: highRatedCompletions } = await supabase
          .from('task_completions')
          .select('rating')
          .eq('user_id', profile.id)
          .gte('rating', 4);
        
        return highRatedCompletions && highRatedCompletions.length >= 20;
      }

      case 'diverse_explorer': {
        const uniqueDestinations = new Set(completedTasks.map(t => t.destination_name));
        return uniqueDestinations.size >= 15;
      }

      case 'consistency_master':
        return currentStreak >= 50 && completedTasks.length >= 30;

      case 'social_influencer': {
        const totalInteractions = posts.reduce((sum, post) => 
          sum + post.likes_count + post.comments_count + post.shares_count, 0
        );
        return totalInteractions >= 100;
      }

      case 'helpful_community_member':
        return posts.length >= 30 && totalPoints >= 3000;

      case 'nature_scientist': {
        const observationTasks = completedTasks.filter(t => 
          t.outdoor_goal_description && t.outdoor_goal_description.includes('观察')
        );
        return observationTasks.length >= 15;
      }

      case 'adventure_seeker': {
        const hardTasks = completedTasks.filter(t => t.difficulty === 'hard');
        return hardTasks.length >= 10;
      }

      case 'social_connector':
        return posts.length >= 25 && totalPoints >= 2000;

      case 'dedication_champion':
        return currentStreak >= 14 && completedTasks.length >= 20;

      case 'exploration_veteran':
        return completedTasks.length >= 80 && currentStreak >= 20;

      case 'community_leader':
        return posts.length >= 40 && totalPoints >= 5000;

      case 'nature_guardian':
        return completedTasks.length >= 60 && posts.length >= 20;

      case 'outdoor_enthusiast':
        return completedTasks.length >= 35 && currentStreak >= 10;

      case 'photo_storyteller': {
        const photoStorytellerTasks = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length >= 2
        );
        return photoStorytellerTasks.length >= 20;
      }

      case 'challenge_conqueror': {
        const allDifficulties = ['easy', 'medium', 'hard'];
        const completedDifficulties = new Set(completedTasks.map(t => t.difficulty));
        return allDifficulties.every(d => completedDifficulties.has(d)) && completedTasks.length >= 15;
      }

      case 'weekend_explorer': {
        const weekendTasks = completedTasks.filter(t => {
          const day = new Date(t.completed_at).getDay();
          return day === 0 || day === 6;
        });
        return weekendTasks.length >= 15;
      }

      case 'weekday_warrior': {
        const weekdayTasks = completedTasks.filter(t => {
          const day = new Date(t.completed_at).getDay();
          return day >= 1 && day <= 5;
        });
        return weekdayTasks.length >= 20;
      }

      case 'monthly_champion': {
        const thisMonth = new Date();
        const monthStart = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
        const monthTasks = completedTasks.filter(t => {
          const taskDate = new Date(t.completed_at);
          return taskDate >= monthStart;
        });
        return monthTasks.length >= 15;
      }

      case 'yearly_legend': {
        const thisYear = new Date().getFullYear();
        const yearTasks = completedTasks.filter(t => {
          const taskYear = new Date(t.completed_at).getFullYear();
          return taskYear === thisYear;
        });
        return yearTasks.length >= 100;
      }

      case 'complete_weekend_warrior': {
        // 连续4个周末完成任务
        const weekendTasks = completedTasks.filter(t => {
          const date = new Date(t.completed_at);
          const day = date.getDay();
          return day === 0 || day === 6; // 周日或周六
        });
        return weekendTasks.length >= 8; // 4个周末 = 8天
      }

      case 'early_bird': {
        const earlyTasks = completedTasks.filter(t => {
          const hour = new Date(t.completed_at).getHours();
          return hour < 6;
        });
        return earlyTasks.length >= 10;
      }

      case 'night_owl': {
        const nightTasks = completedTasks.filter(t => {
          const hour = new Date(t.completed_at).getHours();
          return hour >= 20;
        });
        return nightTasks.length >= 10;
      }

      case 'four_seasons': {
        const seasons = new Set();
        completedTasks.forEach(t => {
          const month = new Date(t.completed_at).getMonth() + 1;
          if (month >= 3 && month <= 5) seasons.add('spring');
          else if (month >= 6 && month <= 8) seasons.add('summer');
          else if (month >= 9 && month <= 11) seasons.add('autumn');
          else seasons.add('winter');
        });
        return seasons.size >= 4;
      }

      case 'weather_warrior':
        // 简化实现，基于任务数量
        return completedTasks.length >= 25;

      case 'location_collector':
        // 简化实现，基于任务数量
        return completedTasks.length >= 30;

      case 'perfectionist': {
        const recentTasks = completedTasks.slice(-10);
        return recentTasks.length >= 10 && 
               recentTasks.every(t => t.rating === 5);
      }

      case 'complete_5_observation_tasks':
        // 简化实现，基于任务数量
        return completedTasks.length >= 5;

      case 'nature_photographer': {
        const naturePhotographerTasks = completedTasks.filter(t => 
          t.completion_photos && t.completion_photos.length >= 3
        );
        return naturePhotographerTasks.length >= 15;
      }

      case 'community_helper':
        // 这需要评论和点赞数据，暂时简化
        return posts.length >= 10 && totalPoints >= 2000;

      case 'nature_mentor':
        // 这需要导师系统数据，暂时简化
        return totalPoints >= 3000 && completedTasks.length >= 50;

      case 'eco_warrior':
        // 这需要环保任务标记，暂时简化
        return completedTasks.length >= 20 && posts.length >= 5;

      default:
        return false;
    }
  }

  // 发送成就解锁通知
  static async sendAchievementNotification(userId: string, achievement: Achievement) {
    try {
      // 创建应用内通知
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type: 'achievement_unlocked',
          title: '🎉 恭喜解锁新成就！',
          message: `您获得了"${achievement.title}"成就，奖励${achievement.points}积分！`,
          data: { achievementId: achievement.id },
          read: false
        });

      if (error) {
        console.error('创建成就通知错误:', error);
      }
      
      console.log(`🎉 用户 ${userId} 解锁了成就: ${achievement.title}`);
    } catch (error) {
      console.error('发送成就通知错误:', error);
    }
  }

  // 获取成就进度
  static async getAchievementProgress(userId: string, achievementId: string) {
    try {
      const { data: achievement } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', achievementId)
        .single();

      if (!achievement) return { data: null, error: 'Achievement not found' };

      // 获取用户数据
      const [profileResult, tasksResult, postsResult] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('id', userId).single(),
        supabase.from('daily_tasks').select('*').eq('user_id', userId),
        supabase.from('community_posts').select('*').eq('user_id', userId)
      ]);

      const profile = profileResult.data;
      const tasks = tasksResult.data || [];
      const posts = postsResult.data || [];
      const completedTasks = tasks.filter(t => t.status === 'completed');

      let current = 0;
      let total = 1;

      switch (achievement.unlock_condition) {
        case 'complete_first_task':
          current = Math.min(completedTasks.length, 1);
          total = 1;
          break;

        case 'complete_5_tasks':
          current = Math.min(completedTasks.length, 5);
          total = 5;
          break;

        case 'streak_7_days':
          current = Math.min(profile.streak, 7);
          total = 7;
          break;

        case 'streak_30_days':
          current = Math.min(profile.streak, 30);
          total = 30;
          break;

        case 'complete_10_tasks':
          current = Math.min(completedTasks.length, 10);
          total = 10;
          break;

        case 'complete_25_tasks':
          current = Math.min(completedTasks.length, 25);
          total = 25;
          break;

        case 'complete_50_tasks':
          current = Math.min(completedTasks.length, 50);
          total = 50;
          break;

        case 'complete_100_tasks':
          current = Math.min(completedTasks.length, 100);
          total = 100;
          break;

        case 'complete_200_tasks':
          current = Math.min(completedTasks.length, 200);
          total = 200;
          break;

        case 'streak_15_days':
          current = Math.min(profile.streak, 15);
          total = 15;
          break;

        case 'streak_3_days':
          current = Math.min(profile.streak, 3);
          total = 3;
          break;

        case 'streak_100_days':
          current = Math.min(profile.streak, 100);
          total = 100;
          break;

        case 'earn_500_points':
          current = Math.min(profile.points, 500);
          total = 500;
          break;

        case 'earn_1000_points':
          current = Math.min(profile.points, 1000);
          total = 1000;
          break;

        case 'earn_2500_points':
          current = Math.min(profile.points, 2500);
          total = 2500;
          break;

        case 'earn_5000_points':
          current = Math.min(profile.points, 5000);
          total = 5000;
          break;

        case 'earn_10000_points':
          current = Math.min(profile.points, 10000);
          total = 10000;
          break;

        case 'first_post':
          current = Math.min(posts.length, 1);
          total = 1;
          break;

        case 'social_butterfly':
          current = Math.min(posts.length, 20);
          total = 20;
          break;

        case 'get_10_likes':
          const likes10 = posts.reduce((sum, post) => sum + post.likes_count, 0);
          current = Math.min(likes10, 10);
          total = 10;
          break;

        case 'get_25_likes':
          const likes25 = posts.reduce((sum, post) => sum + post.likes_count, 0);
          current = Math.min(likes25, 25);
          total = 25;
          break;

        case 'get_50_likes':
          const likes50 = posts.reduce((sum, post) => sum + post.likes_count, 0);
          current = Math.min(likes50, 50);
          total = 50;
          break;

        case 'get_100_likes':
          const likes100 = posts.reduce((sum, post) => sum + post.likes_count, 0);
          current = Math.min(likes100, 100);
          total = 100;
          break;

        default:
          current = 0;
          total = 1;
      }

      return { 
        data: { 
          current, 
          total, 
          percentage: Math.round((current / total) * 100),
          completed: current >= total
        }, 
        error: null 
      };
    } catch (error) {
      console.error('获取成就进度错误:', error);
      return { data: null, error };
    }
  }

  // 初始化默认成就数据
  static async initializeDefaultAchievements() {
    try {
      const defaultAchievements = [
        // 入门成就
        {
          title: '初次探索',
          description: '完成你的第一个户外任务',
          icon_name: 'leaf',
          color: '#10B981',
          points: 50,
          unlock_condition: 'complete_first_task'
        },
        {
          title: '首次分享',
          description: '在社区发布你的第一条动态',
          icon_name: 'users',
          color: '#3B82F6',
          points: 30,
          unlock_condition: 'first_post'
        },
        {
          title: '首张照片',
          description: '上传你的第一张户外探索照片',
          icon_name: 'camera',
          color: '#8B5CF6',
          points: 25,
          unlock_condition: 'upload_1_photo'
        },
        {
          title: '积分入门',
          description: '累计获得100积分',
          icon_name: 'star',
          color: '#F59E0B',
          points: 25,
          unlock_condition: 'earn_100_points'
        },
        
        // 基础任务成就
        {
          title: '新手上路',
          description: '完成5个户外任务',
          icon_name: 'target',
          color: '#10B981',
          points: 100,
          unlock_condition: 'complete_5_tasks'
        },
        {
          title: '任务达人',
          description: '完成10个户外任务',
          icon_name: 'target',
          color: '#3B82F6',
          points: 200,
          unlock_condition: 'complete_10_tasks'
        },
        {
          title: '探索新手',
          description: '完成15个户外任务',
          icon_name: 'mountain',
          color: '#6366F1',
          points: 250,
          unlock_condition: 'complete_15_tasks'
        },
        {
          title: '户外爱好者',
          description: '完成20个户外任务',
          icon_name: 'mountain',
          color: '#8B5CF6',
          points: 300,
          unlock_condition: 'complete_20_tasks'
        },
        {
          title: '活跃探索者',
          description: '完成25个户外任务',
          icon_name: 'mountain',
          color: '#7C3AED',
          points: 400,
          unlock_condition: 'complete_25_tasks'
        },
        {
          title: '坚持探索者',
          description: '完成30个户外任务',
          icon_name: 'target',
          color: '#059669',
          points: 450,
          unlock_condition: 'complete_30_tasks'
        },
        {
          title: '资深探索者',
          description: '完成40个户外任务',
          icon_name: 'mountain',
          color: '#0D9488',
          points: 600,
          unlock_condition: 'complete_40_tasks'
        },
        {
          title: '观察家',
          description: '完成5个观察类任务',
          icon_name: 'target',
          color: '#8B5CF6',
          points: 100,
          unlock_condition: 'complete_5_observation_tasks'
        },
        // 坚持成就
        {
          title: '三天坚持',
          description: '连续3天完成户外活动',
          icon_name: 'star',
          color: '#F59E0B',
          points: 75,
          unlock_condition: 'streak_3_days'
        },
        {
          title: '连续一周',
          description: '连续7天完成户外活动',
          icon_name: 'star',
          color: '#F59E0B',
          points: 100,
          unlock_condition: 'streak_7_days'
        },
        {
          title: '半月勇士',
          description: '连续15天完成户外活动',
          icon_name: 'award',
          color: '#EF4444',
          points: 300,
          unlock_condition: 'streak_15_days'
        },
        {
          title: '坚持不懈',
          description: '连续30天完成户外活动',
          icon_name: 'award',
          color: '#EF4444',
          points: 500,
          unlock_condition: 'streak_30_days'
        },
        {
          title: '百日挑战',
          description: '连续100天完成户外活动',
          icon_name: 'trophy',
          color: '#DC2626',
          points: 2000,
          unlock_condition: 'streak_100_days'
        },
        // 任务完成成就
        {
          title: '新手上路',
          description: '完成5个户外任务',
          icon_name: 'target',
          color: '#10B981',
          points: 100,
          unlock_condition: 'complete_5_tasks'
        },
        {
          title: '任务达人',
          description: '完成10个户外任务',
          icon_name: 'target',
          color: '#3B82F6',
          points: 200,
          unlock_condition: 'complete_10_tasks'
        },
        {
          title: '活跃探索者',
          description: '完成25个户外任务',
          icon_name: 'mountain',
          color: '#7C3AED',
          points: 400,
          unlock_condition: 'complete_25_tasks'
        },
        {
          title: '探索专家',
          description: '完成50个户外任务',
          icon_name: 'mountain',
          color: '#8B5CF6',
          points: 750,
          unlock_condition: 'complete_50_tasks'
        },
        {
          title: '探索精英',
          description: '完成75个户外任务',
          icon_name: 'trophy',
          color: '#7C2D12',
          points: 1000,
          unlock_condition: 'complete_75_tasks'
        },
        {
          title: '探索大师',
          description: '完成100个户外任务',
          icon_name: 'trophy',
          color: '#EF4444',
          points: 1500,
          unlock_condition: 'complete_100_tasks'
        },
        {
          title: '探索宗师',
          description: '完成150个户外任务',
          icon_name: 'trophy',
          color: '#B91C1C',
          points: 2000,
          unlock_condition: 'complete_150_tasks'
        },
        {
          title: '传奇探索者',
          description: '完成200个户外任务',
          icon_name: 'trophy',
          color: '#DC2626',
          points: 3000,
          unlock_condition: 'complete_200_tasks'
        },
        {
          title: '探索传说',
          description: '完成300个户外任务',
          icon_name: 'trophy',
          color: '#7F1D1D',
          points: 4500,
          unlock_condition: 'complete_300_tasks'
        },
        {
          title: '探索神话',
          description: '完成500个户外任务',
          icon_name: 'trophy',
          color: '#450A0A',
          points: 8000,
          unlock_condition: 'complete_500_tasks'
        },
        
        // 连续天数成就
        {
          title: '三天坚持',
          description: '连续3天完成户外活动',
          icon_name: 'star',
          color: '#F59E0B',
          points: 75,
          unlock_condition: 'streak_3_days'
        },
        {
          title: '五日挑战',
          description: '连续5天完成户外活动',
          icon_name: 'star',
          color: '#D97706',
          points: 100,
          unlock_condition: 'streak_5_days'
        },
        {
          title: '连续一周',
          description: '连续7天完成户外活动',
          icon_name: 'star',
          color: '#F59E0B',
          points: 150,
          unlock_condition: 'streak_7_days'
        },
        {
          title: '十日勇士',
          description: '连续10天完成户外活动',
          icon_name: 'award',
          color: '#EA580C',
          points: 200,
          unlock_condition: 'streak_10_days'
        },
        {
          title: '半月勇士',
          description: '连续15天完成户外活动',
          icon_name: 'award',
          color: '#EF4444',
          points: 300,
          unlock_condition: 'streak_15_days'
        },
        {
          title: '三周坚持',
          description: '连续21天完成户外活动',
          icon_name: 'award',
          color: '#DC2626',
          points: 400,
          unlock_condition: 'streak_21_days'
        },
        {
          title: '坚持不懈',
          description: '连续30天完成户外活动',
          icon_name: 'award',
          color: '#EF4444',
          points: 500,
          unlock_condition: 'streak_30_days'
        },
        {
          title: '两月传奇',
          description: '连续60天完成户外活动',
          icon_name: 'trophy',
          color: '#B91C1C',
          points: 1200,
          unlock_condition: 'streak_60_days'
        },
        {
          title: '三月神话',
          description: '连续90天完成户外活动',
          icon_name: 'trophy',
          color: '#991B1B',
          points: 1800,
          unlock_condition: 'streak_90_days'
        },
        {
          title: '百日挑战',
          description: '连续100天完成户外活动',
          icon_name: 'trophy',
          color: '#DC2626',
          points: 2000,
          unlock_condition: 'streak_100_days'
        },
        {
          title: '半年传奇',
          description: '连续200天完成户外活动',
          icon_name: 'trophy',
          color: '#7F1D1D',
          points: 5000,
          unlock_condition: 'streak_200_days'
        },
        {
          title: '年度大师',
          description: '连续365天完成户外活动',
          icon_name: 'trophy',
          color: '#450A0A',
          points: 10000,
          unlock_condition: 'streak_365_days'
        },
        
        // 积分成就
        {
          title: '积分起步',
          description: '累计获得250积分',
          icon_name: 'star',
          color: '#FBBF24',
          points: 50,
          unlock_condition: 'earn_250_points'
        },
        {
          title: '积分新手',
          description: '累计获得500积分',
          icon_name: 'star',
          color: '#F59E0B',
          points: 75,
          unlock_condition: 'earn_500_points'
        },
        {
          title: '积分进阶',
          description: '累计获得750积分',
          icon_name: 'star',
          color: '#D97706',
          points: 100,
          unlock_condition: 'earn_750_points'
        },
        {
          title: '积分收集者',
          description: '累计获得1000积分',
          icon_name: 'star',
          color: '#F59E0B',
          points: 150,
          unlock_condition: 'earn_1000_points'
        },
        {
          title: '积分达人',
          description: '累计获得1500积分',
          icon_name: 'award',
          color: '#EA580C',
          points: 200,
          unlock_condition: 'earn_1500_points'
        },
        {
          title: '积分高手',
          description: '累计获得2000积分',
          icon_name: 'award',
          color: '#DC2626',
          points: 250,
          unlock_condition: 'earn_2000_points'
        },
        {
          title: '积分专家',
          description: '累计获得2500积分',
          icon_name: 'award',
          color: '#8B5CF6',
          points: 300,
          unlock_condition: 'earn_2500_points'
        },
        {
          title: '积分精英',
          description: '累计获得3500积分',
          icon_name: 'award',
          color: '#7C3AED',
          points: 400,
          unlock_condition: 'earn_3500_points'
        },
        {
          title: '积分大师',
          description: '累计获得5000积分',
          icon_name: 'award',
          color: '#EF4444',
          points: 500,
          unlock_condition: 'earn_5000_points'
        },
        {
          title: '积分宗师',
          description: '累计获得7500积分',
          icon_name: 'trophy',
          color: '#B91C1C',
          points: 750,
          unlock_condition: 'earn_7500_points'
        },
        {
          title: '积分传奇',
          description: '累计获得10000积分',
          icon_name: 'trophy',
          color: '#DC2626',
          points: 1000,
          unlock_condition: 'earn_10000_points'
        },
        {
          title: '积分神话',
          description: '累计获得15000积分',
          icon_name: 'trophy',
          color: '#7F1D1D',
          points: 1500,
          unlock_condition: 'earn_15000_points'
        },
        {
          title: '积分至尊',
          description: '累计获得20000积分',
          icon_name: 'trophy',
          color: '#450A0A',
          points: 2000,
          unlock_condition: 'earn_20000_points'
        },
        
        // 摄影成就
        {
          title: '摄影新手',
          description: '上传3张精美的自然照片',
          icon_name: 'camera',
          color: '#06B6D4',
          points: 75,
          unlock_condition: 'upload_3_photos'
        },
        {
          title: '摄影入门',
          description: '上传5张精美的自然照片',
          icon_name: 'camera',
          color: '#3B82F6',
          points: 100,
          unlock_condition: 'upload_5_photos'
        },
        {
          title: '摄影爱好者',
          description: '上传10张精美的自然照片',
          icon_name: 'camera',
          color: '#3B82F6',
          points: 150,
          unlock_condition: 'upload_10_photos'
        },
        {
          title: '摄影进阶',
          description: '上传15张精美的自然照片',
          icon_name: 'camera',
          color: '#2563EB',
          points: 200,
          unlock_condition: 'upload_15_photos'
        },
        {
          title: '摄影达人',
          description: '上传20张精美的自然照片',
          icon_name: 'camera',
          color: '#1D4ED8',
          points: 250,
          unlock_condition: 'upload_20_photos'
        },
        {
          title: '摄影专家',
          description: '上传25张精美的自然照片',
          icon_name: 'camera',
          color: '#7C3AED',
          points: 300,
          unlock_condition: 'upload_25_photos'
        },
        {
          title: '摄影高手',
          description: '上传35张精美的自然照片',
          icon_name: 'camera',
          color: '#6D28D9',
          points: 400,
          unlock_condition: 'upload_35_photos'
        },
        {
          title: '自然摄影师',
          description: '上传50张精美的自然照片',
          icon_name: 'camera',
          color: '#8B5CF6',
          points: 500,
          unlock_condition: 'upload_50_photos'
        },
        {
          title: '摄影大师',
          description: '上传75张精美的自然照片',
          icon_name: 'camera',
          color: '#5B21B6',
          points: 750,
          unlock_condition: 'upload_75_photos'
        },
        {
          title: '视觉艺术家',
          description: '上传100张精美的自然照片',
          icon_name: 'camera',
          color: '#DC2626',
          points: 1000,
          unlock_condition: 'upload_100_photos'
        },
        
        // 社区成就
        {
          title: '社区新人',
          description: '在社区中获得5个点赞',
          icon_name: 'heart',
          color: '#EC4899',
          points: 50,
          unlock_condition: 'get_5_likes'
        },
        {
          title: '受欢迎新人',
          description: '在社区中获得10个点赞',
          icon_name: 'users',
          color: '#10B981',
          points: 75,
          unlock_condition: 'get_10_likes'
        },
        {
          title: '社区活跃者',
          description: '在社区中获得15个点赞',
          icon_name: 'users',
          color: '#059669',
          points: 100,
          unlock_condition: 'get_15_likes'
        },
        {
          title: '人气新星',
          description: '在社区中获得20个点赞',
          icon_name: 'users',
          color: '#047857',
          points: 125,
          unlock_condition: 'get_20_likes'
        },
        {
          title: '社区新人',
          description: '在社区中获得10个点赞',
          icon_name: 'users',
          color: '#10B981',
          points: 50,
          unlock_condition: 'get_10_likes'
        },
        {
          title: '受欢迎的探索者',
          description: '在社区中获得25个点赞',
          icon_name: 'users',
          color: '#3B82F6',
          points: 150,
          unlock_condition: 'get_25_likes'
        },
        {
          title: '社区之星',
          description: '在社区中获得35个点赞',
          icon_name: 'users',
          color: '#2563EB',
          points: 200,
          unlock_condition: 'get_35_likes'
        },
        {
          title: '社区贡献者',
          description: '在社区中获得50个点赞',
          icon_name: 'users',
          color: '#8B5CF6',
          points: 250,
          unlock_condition: 'get_50_likes'
        },
        {
          title: '人气达人',
          description: '在社区中获得75个点赞',
          icon_name: 'users',
          color: '#7C3AED',
          points: 350,
          unlock_condition: 'get_75_likes'
        },
        {
          title: '社区明星',
          description: '在社区中获得100个点赞',
          icon_name: 'users',
          color: '#EF4444',
          points: 400,
          unlock_condition: 'get_100_likes'
        },
        {
          title: '社区偶像',
          description: '在社区中获得150个点赞',
          icon_name: 'heart',
          color: '#DC2626',
          points: 600,
          unlock_condition: 'get_150_likes'
        },
        {
          title: '社区传奇',
          description: '在社区中获得200个点赞',
          icon_name: 'heart',
          color: '#B91C1C',
          points: 800,
          unlock_condition: 'get_200_likes'
        },
        
        // 发布动态成就
        {
          title: '分享新手',
          description: '发布5条社区动态',
          icon_name: 'users',
          color: '#10B981',
          points: 75,
          unlock_condition: 'post_5_times'
        },
        {
          title: '分享达人',
          description: '发布10条社区动态',
          icon_name: 'users',
          color: '#059669',
          points: 100,
          unlock_condition: 'post_10_times'
        },
        {
          title: '内容创作者',
          description: '发布15条社区动态',
          icon_name: 'users',
          color: '#047857',
          points: 150,
          unlock_condition: 'post_15_times'
        },
        {
          title: '社交达人',
          description: '发布20条社区动态',
          icon_name: 'users',
          color: '#3B82F6',
          points: 200,
          unlock_condition: 'post_20_times'
        },
        {
          title: '内容专家',
          description: '发布30条社区动态',
          icon_name: 'users',
          color: '#2563EB',
          points: 300,
          unlock_condition: 'post_30_times'
        },
        {
          title: '社区领袖',
          description: '发布50条社区动态',
          icon_name: 'users',
          color: '#1D4ED8',
          points: 500,
          unlock_condition: 'post_50_times'
        },
        
        // 评论互动成就
        {
          title: '互动新手',
          description: '发表10条有意义的评论',
          icon_name: 'users',
          color: '#8B5CF6',
          points: 75,
          unlock_condition: 'post_10_comments'
        },
        {
          title: '评论达人',
          description: '发表25条有意义的评论',
          icon_name: 'users',
          color: '#F59E0B',
          points: 125,
          unlock_condition: 'post_25_comments'
        },
        {
          title: '评论专家',
          description: '发表50条有意义的评论',
          icon_name: 'users',
          color: '#EF4444',
          points: 200,
          unlock_condition: 'post_50_comments'
        },
        {
          title: '评论大师',
          description: '发表100条有意义的评论',
          icon_name: 'users',
          color: '#DC2626',
          points: 400,
          unlock_condition: 'post_100_comments'
        },
        
        // 时间相关成就
        {
          title: '晨光探索者',
          description: '在早晨6-10点完成10个任务',
          icon_name: 'star',
          color: '#FBBF24',
          points: 200,
          unlock_condition: 'morning_explorer'
        },
        {
          title: '午后冒险家',
          description: '在下午2-6点完成10个任务',
          icon_name: 'mountain',
          color: '#F59E0B',
          points: 200,
          unlock_condition: 'afternoon_adventurer'
        },
        {
          title: '夕阳追寻者',
          description: '在傍晚6-8点完成5个任务',
          icon_name: 'star',
          color: '#EA580C',
          points: 150,
          unlock_condition: 'sunset_seeker'
        },
        {
          title: '早起的鸟儿',
          description: '在早上6点前完成10个任务',
          icon_name: 'star',
          color: '#F59E0B',
          points: 250,
          unlock_condition: 'early_bird'
        },
        {
          title: '夜猫子探索者',
          description: '在晚上8点后完成10个任务',
          icon_name: 'star',
          color: '#8B5CF6',
          points: 250,
          unlock_condition: 'night_owl'
        },
        
        // 季节成就
        {
          title: '春日探索者',
          description: '在春季完成10个户外任务',
          icon_name: 'leaf',
          color: '#10B981',
          points: 200,
          unlock_condition: 'spring_explorer'
        },
        {
          title: '夏日冒险家',
          description: '在夏季完成10个户外任务',
          icon_name: 'star',
          color: '#F59E0B',
          points: 200,
          unlock_condition: 'summer_adventurer'
        },
        {
          title: '秋日漫步者',
          description: '在秋季完成10个户外任务',
          icon_name: 'leaf',
          color: '#EA580C',
          points: 200,
          unlock_condition: 'autumn_wanderer'
        },
        {
          title: '冬日勇士',
          description: '在冬季完成10个户外任务',
          icon_name: 'mountain',
          color: '#3B82F6',
          points: 250,
          unlock_condition: 'winter_warrior'
        },
        {
          title: '四季探索者',
          description: '在春夏秋冬四个季节都完成过任务',
          icon_name: 'leaf',
          color: '#10B981',
          points: 400,
          unlock_condition: 'four_seasons'
        },
        
        // 特殊挑战成就
        {
          title: '闪电完成者',
          description: '在30分钟内完成5个任务',
          icon_name: 'target',
          color: '#FBBF24',
          points: 300,
          unlock_condition: 'speed_demon'
        },
        {
          title: '马拉松探索者',
          description: '完成5个超过3小时的长时间任务',
          icon_name: 'mountain',
          color: '#7C3AED',
          points: 400,
          unlock_condition: 'marathon_explorer'
        },
        {
          title: '品质追求者',
          description: '获得20个4星以上的任务评分',
          icon_name: 'star',
          color: '#F59E0B',
          points: 300,
          unlock_condition: 'quality_seeker'
        },
        {
          title: '多样化探索者',
          description: '完成15个观察类任务',
          icon_name: 'target',
          color: '#0891B2',
          points: 350,
          unlock_condition: 'nature_scientist'
        },
        {
          title: '冒险寻求者',
          description: '完成10个高难度任务',
          icon_name: 'mountain',
          color: '#B91C1C',
          points: 500,
          unlock_condition: 'adventure_seeker'
        },
        {
          title: '社交连接者',
          description: '发布25条动态并获得2000积分',
          icon_name: 'users',
          color: '#7C3AED',
          points: 400,
          unlock_condition: 'social_connector'
        },
        {
          title: '自然导师',
          description: '帮助10位新用户完成他们的首次任务',
          icon_name: 'heart',
          color: '#EF4444',
          points: 800,
          unlock_condition: 'nature_mentor'
        },
        {
          title: '环保卫士',
          description: '参与5次环境保护相关的任务或活动',
          icon_name: 'leaf',
          color: '#10B981',
          points: 350,
          unlock_condition: 'eco_warrior'
        }
      ];

      // 检查是否已有成就数据
      const { data: existingAchievements } = await supabase
        .from('achievements')
        .select('id')
        .limit(1);

      if (!existingAchievements || existingAchievements.length === 0) {
        const { error } = await supabase
          .from('achievements')
          .insert(defaultAchievements);

        if (error) throw error;
        console.log('默认成就数据初始化完成');
      }

      return { error: null };
    } catch (error) {
      console.error('初始化成就数据错误:', error);
      return { error };
    }
  }

  // 获取成就排行榜
  static async getAchievementLeaderboard(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          id,
          username,
          avatar_url,
          points,
          completed_tasks,
          level,
          title
        `)
        .order('points', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // 为每个用户获取成就数量
      const leaderboard = await Promise.all(
        data.map(async (user) => {
          const { data: achievements } = await this.getUserAchievements(user.id);
          return {
            ...user,
            achievementCount: achievements?.length || 0
          };
        })
      );

      return { data: leaderboard, error: null };
    } catch (error) {
      console.error('获取成就排行榜错误:', error);
      return { data: null, error };
    }
  }
}