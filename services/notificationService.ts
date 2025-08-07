import { supabase } from '../lib/supabase';

export interface Notification {
  id: string;
  user_id: string;
  type: 'achievement_unlocked' | 'task_reminder' | 'community_interaction' | 'system';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

export class NotificationService {
  // 创建通知
  static async createNotification(userId: string, notificationData: {
    type: string;
    title: string;
    message: string;
    data?: any;
  }) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type: notificationData.type,
          title: notificationData.title,
          message: notificationData.message,
          data: notificationData.data,
          read: false
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('创建通知错误:', error);
      return { data: null, error };
    }
  }

  // 获取用户通知
  static async getUserNotifications(userId: string, limit = 20, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取通知错误:', error);
      return { data: null, error };
    }
  }

  // 标记通知为已读
  static async markAsRead(notificationId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('标记通知已读错误:', error);
      return { data: null, error };
    }
  }

  // 标记所有通知为已读
  static async markAllAsRead(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('标记所有通知已读错误:', error);
      return { data: null, error };
    }
  }

  // 获取未读通知数量
  static async getUnreadCount(userId: string) {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
      return { data: count || 0, error: null };
    } catch (error) {
      console.error('获取未读通知数量错误:', error);
      return { data: 0, error };
    }
  }

  // 删除通知
  static async deleteNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('删除通知错误:', error);
      return { error };
    }
  }

  // 发送任务提醒
  static async sendTaskReminder(userId: string) {
    try {
      await this.createNotification(userId, {
        type: 'task_reminder',
        title: '今日任务提醒',
        message: '别忘了完成今天的户外探索任务哦！',
        data: { action: 'open_tasks' }
      });
    } catch (error) {
      console.error('发送任务提醒错误:', error);
    }
  }

  // 发送成就解锁通知
  static async sendAchievementNotification(userId: string, achievement: any) {
    try {
      await this.createNotification(userId, {
        type: 'achievement_unlocked',
        title: '🎉 恭喜解锁新成就！',
        message: `您获得了"${achievement.title}"成就，奖励${achievement.points}积分！`,
        data: { achievementId: achievement.id }
      });
    } catch (error) {
      console.error('发送成就通知错误:', error);
    }
  }

  // 发送社区互动通知
  static async sendCommunityNotification(userId: string, type: 'like' | 'comment' | 'follow', fromUser: any) {
    try {
      const messages = {
        like: `${fromUser.username} 点赞了您的动态`,
        comment: `${fromUser.username} 评论了您的动态`,
        follow: `${fromUser.username} 关注了您`
      };

      await this.createNotification(userId, {
        type: 'community_interaction',
        title: '社区互动',
        message: messages[type],
        data: { fromUserId: fromUser.id, type }
      });
    } catch (error) {
      console.error('发送社区通知错误:', error);
    }
  }
}