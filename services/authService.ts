import { supabase } from '../lib/supabase';

export class AuthService {
  // 用户注册
  static async signUp(email: string, password: string, username: string) {
    try {
      console.log('AuthService: Signing up user:', email, username);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // 禁用邮箱确认重定向
        }
      });

      if (error) throw error;

      if (data.user) {
        console.log('AuthService: User created, creating profile:', data.user.id);
        // 创建用户档案
        const { error: profileError } = await this.createUserProfile(data.user.id, username, email);
        if (profileError) {
          console.error('AuthService: Profile creation error:', profileError);
          throw profileError;
        }
        console.log('AuthService: User profile created successfully');
      }

      return { data, error: null };
    } catch (error) {
      console.error('注册错误:', error);
      return { data: null, error };
    }
  }

  // 创建用户档案
  static async createUserProfile(userId: string, username: string, email: string) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          username,
          level: 1,
          title: '自然新手',
          social_level: 1,
          social_title: '社交新手',
          points: 0,
          social_points: 0,
          streak: 0,
          completed_tasks: 0,
          total_distance: 0,
          notifications_enabled: true,
          location_enabled: true,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('创建用户档案错误:', error);
      return { data: null, error };
    }
  }

  // 用户登录
  static async signIn(email: string, password: string) {
    try {
      console.log('AuthService: Signing in user:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('AuthService: Sign in error:', error);
        throw error;
      }
      console.log('AuthService: Sign in successful:', data.user?.email);
      return { data, error: null };
    } catch (error) {
      console.error('登录错误:', error);
      return { data: null, error };
    }
  }

  // 用户登出
  static async signOut() {
    try {
      console.log('AuthService: Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthService: Sign out error:', error);
        throw error;
      }
      console.log('AuthService: Sign out successful');
      return { error: null };
    } catch (error) {
      console.error('登出错误:', error);
      return { error };
    }
  }

  // 获取当前用户
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('AuthService: Get current user error:', error);
        throw error;
      }
      return { user, error: null };
    } catch (error) {
      console.error('获取用户错误:', error);
      return { user: null, error };
    }
  }

  // 获取用户档案
  static async getUserProfile(userId: string) {
    try {
      console.log('AuthService: Getting user profile for:', userId);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // 使用 maybeSingle 而不是 single

      if (error) {
        console.error('AuthService: Get user profile error:', error);
        throw error;
      }

      if (!data) {
        console.log('AuthService: No user profile found for:', userId);
        throw new Error('用户档案不存在');
      }

      console.log('AuthService: User profile retrieved:', data);
      return { data, error: null };
    } catch (error) {
      console.error('获取用户档案错误:', error);
      return { data: null, error };
    }
  }

  // 更新用户档案
  static async updateUserProfile(userId: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('更新用户档案错误:', error);
      return { data: null, error };
    }
  }
}