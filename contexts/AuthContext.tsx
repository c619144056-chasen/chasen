import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, UserProfile } from '../lib/supabase';
import { AuthService } from '../services/authService';
import { DataService } from '../services/dataService';
import { router } from 'expo-router';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: useEffect triggered.');
    let isMounted = true;

    // 获取初始会话
    const initializeAuth = async () => {
      try {
        // 首先初始化应用数据
        console.log('AuthContext: Initializing app data...');
        // 延迟数据初始化到用户登录后
        console.log('AuthContext: Skipping data initialization during app startup');

        console.log('AuthContext: Initializing authentication...');
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('AuthContext: getSession result:', session?.user?.email ? 'User found' : 'No user session');
        
        if (error) {
          console.error('AuthContext: Error getting session:', error);
        }

        if (isMounted) {
          if (session?.user) {
            console.log('AuthContext: Found existing session for:', session.user.email);
            setUser(session.user);
            await loadUserProfile(session.user.id);
          } else {
            console.log('AuthContext: No existing session, redirecting to sign-in');
            setUser(null);
            setUserProfile(null);
            // 确保导航到登录页面
            setTimeout(() => {
              router.replace('/(auth)/sign-in');
            }, 100);
          }
          setLoading(false);
          console.log('AuthContext: initializeAuth finished, loading set to false');
        }
      } catch (error) {
        console.error('AuthContext: Error during initialization:', error);
        if (isMounted) {
          setLoading(false);
          // 即使出错也要导航到登录页面
          setTimeout(() => {
            router.replace('/(auth)/sign-in');
          }, 100);
        }
      }
    };

    initializeAuth();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        console.log('AuthContext: Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          try {
            await loadUserProfile(session.user.id);
            console.log('AuthContext: onAuthStateChange: loadUserProfile completed.');
          } catch (error) {
            console.log('AuthContext: Failed to load user profile, user may need to complete registration');
            // 如果无法加载用户档案，保持用户登录状态但档案为空
            setUserProfile(null);
          }
          
          // 登录成功后导航到主应用
          if (event === 'SIGNED_IN') {
            console.log('AuthContext: User signed in, navigating to tabs');
            // 在用户登录后初始化数据
            try {
              const result = await DataService.initializeAllData();
              if (result.success) {
                console.log('AuthContext: App data initialization completed successfully');
              } else {
                console.warn('AuthContext: App data initialization failed:', result.errors);
              }
            } catch (dataError) {
              console.warn('AuthContext: App data initialization error:', dataError);
            }
            setTimeout(() => router.replace('/(tabs)'), 100);
          }
        } else {
          setUser(null);
          setUserProfile(null);
          
          // 登出后导航到登录页面
          if (event === 'SIGNED_OUT') {
            console.log('AuthContext: User signed out, navigating to sign-in');
            setTimeout(() => router.replace('/(auth)/sign-in'), 100);
          }
        }

        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('AuthContext: Loading user profile for:', userId);
      const { data, error } = await AuthService.getUserProfile(userId);
      if (error) {
        console.error('AuthContext: Failed to load user profile:', error);
        // 如果用户档案不存在，可能是新用户，尝试创建一个基础档案
        if (error.code === 'PGRST116') {
          console.log('AuthContext: User profile not found, attempting to create a default profile.');
          try {
            const { data: createData, error: createError } = await supabase
              .from('user_profiles')
              .insert({
                id: userId,
                username: '用户' + Math.random().toString(36).substr(2, 5),
                level: 1,
                social_level: 1,
                title: '自然新手',
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
            
            if (createError) {
              console.error('AuthContext: Failed to create default profile:', createError);
              return;
            }
            
            console.log('AuthContext: Default profile created successfully');
            setUserProfile(createData);
          } catch (createError) {
            console.error('AuthContext: Exception creating default profile:', createError);
          }
        } else {
          console.error('AuthContext: Other profile loading error:', error);
        }
        return;
      }
      console.log('AuthContext: User profile loaded:', data?.username);
      setUserProfile(data);
    } catch (error) {
      console.error('AuthContext: Error loading user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('AuthContext: Attempting to sign in:', email);
    setLoading(true);
    const { error } = await AuthService.signIn(email, password);
    if (error) {
      console.error('AuthContext: Sign in error:', error);
      setLoading(false);
    }
    return { error };
  };

  const signUp = async (email: string, password: string, username: string) => {
    console.log('AuthContext: Attempting to sign up:', email, username);
    setLoading(true);
    const { error } = await AuthService.signUp(email, password, username);
    if (error) {
      console.error('AuthContext: Sign up error:', error);
      setLoading(false);
    }
    return { error };
  };

  const signOut = async () => {
    console.log('AuthContext: Signing out');
    setLoading(true);
    try {
      const { error } = await AuthService.signOut();
      if (error) {
        console.error('AuthContext: Sign out error:', error);
        throw error;
      }
      console.log('AuthContext: Sign out successful');
    } catch (error) {
      console.error('AuthContext: Sign out failed:', error);
      setLoading(false);
      throw error;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}