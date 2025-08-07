export interface Task {
  id: string;
  user_id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_time: string;
  points: number;
  destination_name: string;
  destination_distance?: string;
  destination_image?: string;
  destination_latitude?: number;
  destination_longitude?: number;
  outdoor_goal_title?: string;
  outdoor_goal_description?: string;
  outdoor_goal_tips?: string;
  social_goal_title?: string;
  social_goal_description?: string;
  social_goal_tips?: string;
  preparation: string[];
  safety_tips: string[];
  status: 'available' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  level: number;
  social_level: number;
  title: string;
  social_title: string;
  points: number;
  social_points: number;
  streak: number;
  join_date: string;
  completed_tasks: number;
  total_distance: number;
  favorite_location?: string;
  created_at: string;
  updated_at: string;
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
  user_profile?: {
    username: string;
    avatar_url?: string;
    level: number;
    title: string;
  };
}

export interface TaskCompletion {
  id: string;
  user_id: string;
  task_id: string;
  completion_photos: string[];
  completion_notes?: string;
  rating?: number;
  outdoor_completed: boolean;
  social_completed: boolean;
  outdoor_points_earned: number;
  social_points_earned: number;
  completed_at: string;
}