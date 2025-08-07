import { supabase } from '../lib/supabase';
import { sql } from '@supabase/supabase-js';
import { CommunityPost } from '../lib/supabase';

export class CommunityService {
  // 创建社区动态
  static async createPost(userId: string, postData: {
    content: string;
    imageUrl?: string;
    location?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          user_id: userId,
          content: postData.content,
          image_url: postData.imageUrl,
          location: postData.location,
        })
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title)
        `)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('创建动态错误:', error);
      return { data: null, error };
    }
  }

  // 获取社区动态列表
  static async getCommunityPosts(limit = 20, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取社区动态错误:', error);
      return { data: null, error };
    }
  }

  // 检查用户是否已点赞
  static async checkUserLikedPost(userId: string, postId: string) {
    try {
      const { data, error } = await supabase
        .from('post_likes')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle();

      if (error) throw error;
      return { data: !!data, error: null };
    } catch (error) {
      console.error('检查点赞状态错误:', error);
      return { data: false, error };
    }
  }

  // 点赞动态
  static async likePost(userId: string, postId: string) {
    try {
      // 检查是否已经点赞
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle();

      if (existingLike) {
        // 取消点赞
        await supabase
          .from('post_likes')
          .delete()
          .eq('user_id', userId)
          .eq('post_id', postId);

        // 减少点赞数
        const { error: updateError } = await supabase
          .from('community_posts')
          .update({ likes_count: sql`likes_count - 1` })
          .eq('id', postId);

        if (updateError) throw updateError;
        return { data: { liked: false }, error: null };
      } else {
        // 添加点赞
        await supabase
          .from('post_likes')
          .insert({ user_id: userId, post_id: postId });

        // 增加点赞数
        const { error: updateError } = await supabase
          .from('community_posts')
          .update({ likes_count: sql`likes_count + 1` })
          .eq('id', postId);

        if (updateError) throw updateError;
        
        // 发送点赞通知给动态作者
        await this.sendInteractionNotification(userId, postId, 'like');
        
        return { data: { liked: true }, error: null };
      }
    } catch (error) {
      console.error('点赞错误:', error);
      return { data: null, error };
    }
  }

  // 评论动态
  static async commentOnPost(userId: string, postId: string, content: string) {
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          user_id: userId,
          post_id: postId,
          content: content
        })
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title)
        `)
        .single();

      if (error) throw error;

      // 增加评论数
      await supabase
        .from('community_posts')
        .update({ comments_count: sql`comments_count + 1` })
        .eq('id', postId);

      // 发送评论通知给动态作者
      await this.sendInteractionNotification(userId, postId, 'comment');
      return { data, error: null };
    } catch (error) {
      console.error('评论错误:', error);
      return { data: null, error };
    }
  }

  // 发送互动通知
  static async sendInteractionNotification(fromUserId: string, postId: string, type: 'like' | 'comment' | 'share') {
    try {
      // 获取动态作者信息
      const { data: post } = await supabase
        .from('community_posts')
        .select('user_id')
        .eq('id', postId)
        .single();

      if (!post || post.user_id === fromUserId) return; // 不给自己发通知

      // 获取操作用户信息
      const { data: fromUser } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('id', fromUserId)
        .single();

      if (!fromUser) return;

      const messages = {
        like: `${fromUser.username} 点赞了您的动态`,
        comment: `${fromUser.username} 评论了您的动态`,
        share: `${fromUser.username} 分享了您的动态`
      };

      await supabase
        .from('notifications')
        .insert({
          user_id: post.user_id,
          type: 'community_interaction',
          title: '社区互动',
          message: messages[type],
          data: { fromUserId, postId, type },
          read: false
        });

    } catch (error) {
      console.error('发送互动通知错误:', error);
    }
  }

  // 关注用户
  static async followUser(followerId: string, followingId: string) {
    try {
      if (followerId === followingId) {
        return { data: null, error: '不能关注自己' };
      }

      // 检查是否已经关注
      const { data: existingFollow } = await supabase
        .from('user_follows')
        .select('id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .maybeSingle();

      if (existingFollow) {
        return { data: null, error: '已经关注了该用户' };
      }

      const { data, error } = await supabase
        .from('user_follows')
        .insert({
          follower_id: followerId,
          following_id: followingId
        })
        .select()
        .single();

      if (error) throw error;

      // 发送关注通知
      const { data: follower } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('id', followerId)
        .single();

      if (follower) {
        await supabase
          .from('notifications')
          .insert({
            user_id: followingId,
            type: 'community_interaction',
            title: '新的关注者',
            message: `${follower.username} 关注了您`,
            data: { fromUserId: followerId, type: 'follow' },
            read: false
          });
      }

      return { data, error: null };
    } catch (error) {
      console.error('关注用户错误:', error);
      return { data: null, error };
    }
  }

  // 取消关注用户
  static async unfollowUser(followerId: string, followingId: string) {
    try {
      const { error } = await supabase
        .from('user_follows')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId);

      if (error) throw error;
      return { data: true, error: null };
    } catch (error) {
      console.error('取消关注错误:', error);
      return { data: null, error };
    }
  }

  // 检查是否关注了某用户
  static async checkFollowStatus(followerId: string, followingId: string) {
    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select('id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .maybeSingle();

      if (error) throw error;
      return { data: !!data, error: null };
    } catch (error) {
      console.error('检查关注状态错误:', error);
      return { data: false, error };
    }
  }

  // 获取用户的关注者列表
  static async getUserFollowers(userId: string, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          follower_id,
          created_at,
          follower:user_profiles!follower_id(id, username, avatar_url, level, title)
        `)
        .eq('following_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取关注者列表错误:', error);
      return { data: null, error };
    }
  }

  // 获取用户的关注列表
  static async getUserFollowing(userId: string, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          following_id,
          created_at,
          following:user_profiles!following_id(id, username, avatar_url, level, title)
        `)
        .eq('follower_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取关注列表错误:', error);
      return { data: null, error };
    }
  }

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

      return { data, error: null };
    } catch (error) {
      console.error('创建小组错误:', error);
      return { data: null, error };
    }
  }

  // 加入兴趣小组
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
        .from('interest_groups')
        .update({ member_count: sql`member_count + 1` })
        .eq('id', groupId);

      return { data, error: null };
    } catch (error) {
      console.error('加入小组错误:', error);
      return { data: null, error };
    }
  }

  // 获取热门兴趣小组
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
  // 获取动态评论
  static async getPostComments(postId: string, limit = 20, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取评论错误:', error);
      return { data: null, error };
    }
  }

  // 分享动态
  static async sharePost(userId: string, postId: string) {
    try {
      // 检查是否已经分享过
      const { data: existingShare } = await supabase
        .from('post_shares')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle();

      if (existingShare) {
        // 已经分享过，直接返回
        return { data: { shared: true, alreadyShared: true }, error: null };
      }

      // 记录分享行为
      await supabase
        .from('post_shares')
        .insert({ user_id: userId, post_id: postId });

      // 增加分享数
      const { error } = await supabase
        .from('community_posts')
        .update({ shares_count: sql`shares_count + 1` })
        .eq('id', postId);

      if (error) throw error;
      return { data: { shared: true, alreadyShared: false }, error: null };
    } catch (error) {
      console.error('分享错误:', error);
      return { data: null, error };
    }
  }

  // 获取用户的动态
  static async getUserPosts(userId: string, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取用户动态错误:', error);
      return { data: null, error };
    }
  }

  // 获取热门动态
  static async getTrendingPosts(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title)
        `)
        .order('likes_count', { ascending: false })
        .order('comments_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('获取热门动态错误:', error);
      return { data: null, error };
    }
  }

  // 搜索动态
  static async searchPosts(query: string, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user_profile:user_profiles(username, avatar_url, level, title)
        `)
        .textSearch('content', query)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('搜索动态错误:', error);
      return { data: null, error };
    }
  }

  // 举报动态
  static async reportPost(userId: string, postId: string, reason: string) {
    try {
      const { data, error } = await supabase
        .from('post_reports')
        .insert({
          user_id: userId,
          post_id: postId,
          reason: reason
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('举报动态错误:', error);
      return { data: null, error };
    }
  }

  // 获取社区统计
  static async getCommunityStats() {
    try {
      const [postsResult, usersResult, likesResult] = await Promise.all([
        supabase.from('community_posts').select('id', { count: 'exact' }),
        supabase.from('user_profiles').select('id', { count: 'exact' }),
        supabase.from('post_likes').select('id', { count: 'exact' })
      ]);

      return {
        data: {
          totalPosts: postsResult.count || 0,
          totalUsers: usersResult.count || 0,
          totalLikes: likesResult.count || 0
        },
        error: null
      };
    } catch (error) {
      console.error('获取社区统计错误:', error);
      return { data: null, error };
    }
  }
}