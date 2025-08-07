import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 数据库类型定义
export interface UserProfile {
  id: string;
  username: string;
  level: number;
  social_level: number;
  title: string;
  social_title: string;
  points: number;
  social_points: number;
  streak: number;
  avatar_url?: string;
  join_date: string;
  completed_tasks: number;
  total_distance: number;
  favorite_location?: string;
  created_at: string;
  updated_at: string;
  notifications_enabled?: boolean;
  location_enabled?: boolean;
  bio?: string;
}

export interface DailyTask {
  id: string;
  user_id: string;
  title: string;
  difficulty: string;
  estimated_time: string;
  points: number;
  destination_name: string;
  destination_distance?: string;
  destination_image?: string;
  outdoor_goal_title?: string;
  outdoor_goal_description?: string;
  outdoor_goal_tips?: string;
  social_goal_title?: string;
  social_goal_description?: string;
  social_goal_tips?: string;
  preparation: string[];
  safety_tips: string[];
  status: string;
  created_at: string;
  completed_at?: string;
}

export interface TaskCompletion {
  id: string;
  user_id: string;
  task_id: string;
  completion_photos: string[];
  completion_notes?: string;
  rating?: number;
  completed_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color: string;
  points: number;
  unlock_condition?: string;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement?: Achievement;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  location?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  user_profile?: UserProfile;
}