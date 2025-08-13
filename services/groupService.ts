import { supabase } from '../lib/supabase';

export interface InterestGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  is_private: boolean;
  creator_id: string;
  member_count: number;
  created_at: string;
  creator?: {
    username: string;
    avatar_url?: string;
  };
}

export interface GroupMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  message_type: 'text' | 'image' | 'system';
  reply_to?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  user_profile?: {
    username: string;
    avatar_url?: string;
    level: number;
    title: string;
  };
  reply_message?: {
    content: string;
    user_profile?: {
      username: string;
    };
  };
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'pending' | 'banned';
  joined_at: string;
  user_profile?: {
    username: string;
    avatar_url?: string;
    level: number;
    title: string;
  };
}

export class GroupService {
  // 创建兴趣小组
  static async createGroup(creatorId: string, groupData: {
    name: string;
    description: string;
    category: string;
    isPrivate: boolean;
  }) {
    try {
      const { data, error } = await supabase
        .from('interest_groups')
        .insert({
          name: groupData.name,
          description: groupData.description,
          category: groupData.category,
          is_private: groupData.isPrivate,
          creator_id: creatorId,
          member_count: 1
        })
        .select()
        .single();

      if (error) throw error;

      // 创建者自动加入小组
      await supabase
        .from('group_members')
        .insert({
          group_id: data.id,
          user_id: creatorId,
          role: 'admin',
          status: 'active'
        });

      // 发送欢迎消息
      await this.sendSystemMessage(data.id, '欢迎来到小组！开始你们的探索交流吧 🌟');

      return { data, error: null };
    } catch (error) {
      console.error('创建小组错误:', error);
      return { data: null, error };
    }
  }

  // 获取热门小组
  static async getPopularGroups(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('interest_groups')
        .select(`
          *,
          creator:user_profiles!creator_id(username, avatar_url)
        `)
        .eq('is_private', false)
        .order('member_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取热门小组错误:', error);
      return { data: null, error };
    }
  }

  // 获取用户加入的小组
  static async getUserGroups(userId: string) {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          group:interest_groups(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('joined_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取用户小组错误:', error);
      return { data: null, error };
    }
  }

  // 加入小组
  static async joinGroup(userId: string, groupId: string) {
    try {
      // 检查是否已经是成员
      const { data: existingMember } = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existingMember) {
        return { data: null, error: '已经是小组成员' };
      }

      const { data, error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: userId,
          role: 'member',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      // 更新小组成员数
      await supabase
        .rpc('increment_member_count', { group_id: groupId });

      // 获取用户信息并发送加入消息
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('id', userId)
        .single();

      if (userProfile) {
        await this.sendSystemMessage(groupId, `${userProfile.username} 加入了小组 👋`);
      }

      return { data, error: null };
    } catch (error) {
      console.error('加入小组错误:', error);
      return { data: null, error };
    }
  }

  // 离开小组
  static async leaveGroup(userId: string, groupId: string) {
    try {
      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', userId);

      if (error) throw error;

      // 更新小组成员数
      await supabase
        .rpc('decrement_member_count', { group_id: groupId });

      return { error: null };
    } catch (error) {
      console.error('离开小组错误:', error);
      return { error };
    }
  }

  // 获取小组详情
  static async getGroupDetails(groupId: string) {
    try {
      const { data, error } = await supabase
        .from('interest_groups')
        .select(`
          *,
          creator:user_profiles!creator_id(username, avatar_url, level, title)
        `)
        .eq('id', groupId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取小组详情错误:', error);
      return { data: null, error };
    }
  }

  // 获取小组成员
  static async getGroupMembers(groupId: string) {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title)
        `)
        .eq('group_id', groupId)
        .eq('status', 'active')
        .order('joined_at', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取小组成员错误:', error);
      return { data: null, error };
    }
  }

  // 发送消息
  static async sendMessage(userId: string, groupId: string, content: string, replyTo?: string) {
    try {
      const { data, error } = await supabase
        .from('group_messages')
        .insert({
          group_id: groupId,
          user_id: userId,
          content: content.trim(),
          message_type: 'text',
          reply_to: replyTo || null
        })
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title),
          reply_message:group_messages!reply_to(
            content,
            user_profiles(username)
          )
        `)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('发送消息错误:', error);
      return { data: null, error };
    }
  }

  // 获取小组消息
  static async getGroupMessages(groupId: string, limit = 50, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('group_messages')
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title),
          reply_message:group_messages!reply_to(
            content,
            user_profiles(username)
          )
        `)
        .eq('group_id', groupId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      
      // 反转数组，让最新消息在底部
      return { data: data?.reverse() || [], error: null };
    } catch (error) {
      console.error('获取小组消息错误:', error);
      return { data: null, error };
    }
  }

  // 删除消息（软删除）
  static async deleteMessage(messageId: string, userId: string) {
    try {
      const { error } = await supabase
        .from('group_messages')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', messageId)
        .eq('user_id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('删除消息错误:', error);
      return { error };
    }
  }

  // 发送系统消息
  static async sendSystemMessage(groupId: string, content: string) {
    try {
      const { error } = await supabase
        .from('group_messages')
        .insert({
          group_id: groupId,
          user_id: '00000000-0000-0000-0000-000000000000', // 系统用户ID
          content,
          message_type: 'system'
        });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('发送系统消息错误:', error);
      return { error };
    }
  }

  // 检查用户是否为小组成员
  static async checkMembership(userId: string, groupId: string) {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select('role, status')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      
      return { 
        data: {
          isMember: !!data && data.status === 'active',
          role: data?.role || null,
          status: data?.status || null
        }, 
        error: null 
      };
    } catch (error) {
      console.error('检查成员资格错误:', error);
      return { data: { isMember: false, role: null, status: null }, error };
    }
  }

  // 搜索小组
  static async searchGroups(query: string, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('interest_groups')
        .select(`
          *,
          creator:user_profiles!creator_id(username, avatar_url)
        `)
        .eq('is_private', false)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('member_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('搜索小组错误:', error);
      return { data: null, error };
    }
  }
}