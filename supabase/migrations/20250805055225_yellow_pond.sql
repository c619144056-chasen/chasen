/*
  # 自然启程应用数据库架构

  1. 新建表
    - `user_profiles` - 用户档案信息
      - `id` (uuid, 主键, 关联auth.users)
      - `username` (text, 用户名)
      - `level` (integer, 用户等级)
      - `title` (text, 用户称号)
      - `points` (integer, 积分)
      - `streak` (integer, 连续天数)
      - `avatar_url` (text, 头像链接)
      - `join_date` (timestamp, 加入日期)
      - `completed_tasks` (integer, 完成任务数)
      - `total_distance` (numeric, 总探索距离)
      - `favorite_location` (text, 最喜欢的地点)
      
    - `daily_tasks` - 每日任务
      - `id` (uuid, 主键)
      - `user_id` (uuid, 外键关联user_profiles)
      - `title` (text, 任务标题)
      - `difficulty` (text, 难度等级)
      - `estimated_time` (text, 预估时间)
      - `points` (integer, 奖励积分)
      - `destination_name` (text, 目的地名称)
      - `destination_distance` (text, 距离)
      - `destination_image` (text, 目的地图片)
      - `outdoor_goal_title` (text, 户外目标标题)
      - `outdoor_goal_description` (text, 户外目标描述)
      - `outdoor_goal_tips` (text, 户外目标提示)
      - `social_goal_title` (text, 社交目标标题)
      - `social_goal_description` (text, 社交目标描述)
      - `social_goal_tips` (text, 社交目标提示)
      - `preparation` (text[], 准备清单)
      - `safety_tips` (text[], 安全提示)
      - `status` (text, 任务状态)
      - `created_at` (timestamp, 创建时间)
      - `completed_at` (timestamp, 完成时间)
      
    - `task_completions` - 任务完成记录
      - `id` (uuid, 主键)
      - `user_id` (uuid, 外键)
      - `task_id` (uuid, 外键)
      - `completion_photos` (text[], 完成照片)
      - `completion_notes` (text, 完成笔记)
      - `rating` (integer, 用户评分)
      - `completed_at` (timestamp, 完成时间)
      
    - `achievements` - 成就系统
      - `id` (uuid, 主键)
      - `title` (text, 成就标题)
      - `description` (text, 成就描述)
      - `icon_name` (text, 图标名称)
      - `color` (text, 颜色)
      - `points` (integer, 奖励积分)
      - `unlock_condition` (text, 解锁条件)
      
    - `user_achievements` - 用户成就
      - `id` (uuid, 主键)
      - `user_id` (uuid, 外键)
      - `achievement_id` (uuid, 外键)
      - `unlocked_at` (timestamp, 解锁时间)
      
    - `community_posts` - 社区动态
      - `id` (uuid, 主键)
      - `user_id` (uuid, 外键)
      - `content` (text, 内容)
      - `image_url` (text, 图片链接)
      - `location` (text, 位置)
      - `likes_count` (integer, 点赞数)
      - `comments_count` (integer, 评论数)
      - `shares_count` (integer, 分享数)
      - `created_at` (timestamp, 创建时间)

  2. 安全设置
    - 为所有表启用行级安全(RLS)
    - 添加适当的CRUD策略

  3. 索引优化
    - 为常用查询字段添加索引
*/

-- 创建用户档案表
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  level integer DEFAULT 1,
  title text DEFAULT '自然新手',
  points integer DEFAULT 0,
  streak integer DEFAULT 0,
  avatar_url text,
  join_date timestamptz DEFAULT now(),
  completed_tasks integer DEFAULT 0,
  total_distance numeric DEFAULT 0,
  favorite_location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建每日任务表
CREATE TABLE IF NOT EXISTS daily_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  difficulty text DEFAULT 'easy',
  estimated_time text DEFAULT '30-45分钟',
  points integer DEFAULT 50,
  destination_name text NOT NULL,
  destination_distance text,
  destination_image text,
  outdoor_goal_title text,
  outdoor_goal_description text,
  outdoor_goal_tips text,
  social_goal_title text,
  social_goal_description text,
  social_goal_tips text,
  preparation text[] DEFAULT '{}',
  safety_tips text[] DEFAULT '{}',
  status text DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- 创建任务完成记录表
CREATE TABLE IF NOT EXISTS task_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  task_id uuid REFERENCES daily_tasks(id) ON DELETE CASCADE,
  completion_photos text[] DEFAULT '{}',
  completion_notes text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  completed_at timestamptz DEFAULT now()
);

-- 创建成就表
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  color text DEFAULT '#10B981',
  points integer DEFAULT 50,
  unlock_condition text,
  created_at timestamptz DEFAULT now()
);

-- 创建用户成就表
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- 创建社区动态表
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  image_url text,
  location text,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 启用行级安全
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- 用户档案策略
CREATE POLICY "用户可以查看自己的档案"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "用户可以更新自己的档案"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "用户可以插入自己的档案"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- 每日任务策略
CREATE POLICY "用户可以查看自己的任务"
  ON daily_tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "用户可以创建自己的任务"
  ON daily_tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以更新自己的任务"
  ON daily_tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 任务完成记录策略
CREATE POLICY "用户可以查看自己的完成记录"
  ON task_completions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "用户可以创建完成记录"
  ON task_completions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 成就策略
CREATE POLICY "所有用户可以查看成就"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (true);

-- 用户成就策略
CREATE POLICY "用户可以查看自己的成就"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "用户可以获得成就"
  ON user_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 社区动态策略
CREATE POLICY "所有用户可以查看社区动态"
  ON community_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "用户可以创建动态"
  ON community_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以更新自己的动态"
  ON community_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 创建索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_daily_tasks_user_id ON daily_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_status ON daily_tasks(status);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_created_at ON daily_tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_task_completions_user_id ON task_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at);

-- 插入初始成就数据
INSERT INTO achievements (title, description, icon_name, color, points, unlock_condition) VALUES
('初次探索', '完成第一个户外任务', 'Leaf', '#10B981', 50, 'complete_first_task'),
('连续一周', '连续7天完成每日任务', 'Star', '#F59E0B', 100, 'streak_7_days'),
('摄影达人', '分享10张优质自然照片', 'Camera', '#3B82F6', 150, 'share_10_photos'),
('团队合作', '与3位不同的伙伴完成任务', 'Users', '#8B5CF6', 120, 'collaborate_3_users'),
('山峰征服者', '完成5个山地探索任务', 'Mountain', '#6B7280', 200, 'complete_5_mountain_tasks'),
('社区贡献者', '帮助10位新手完成任务', 'Heart', '#EF4444', 250, 'help_10_newbies'),
('探索大师', '达到Level 10并完成100个任务', 'Award', '#F59E0B', 500, 'reach_level_10_and_100_tasks')
ON CONFLICT DO NOTHING;