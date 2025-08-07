/*
  # 添加社交等级系统

  1. 数据库更改
    - 在 `user_profiles` 表中添加社交等级相关字段
    - 在 `daily_tasks` 表中添加社交任务完成状态字段
    - 在 `task_completions` 表中添加分别完成状态字段

  2. 新增字段说明
    - `social_level`: 用户社交等级
    - `social_points`: 社交积分
    - `social_title`: 社交称号
    - `outdoor_completed`: 户外任务是否完成
    - `social_completed`: 社交任务是否完成
    - `outdoor_points_earned`: 户外任务获得的积分
    - `social_points_earned`: 社交任务获得的积分

  3. 安全策略
    - 保持现有的 RLS 策略不变
*/

-- 为 user_profiles 表添加社交等级字段
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'social_level'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN social_level integer DEFAULT 1;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'social_points'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN social_points integer DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'social_title'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN social_title text DEFAULT '社交新手';
  END IF;
END $$;

-- 为 task_completions 表添加分别完成状态字段
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_completions' AND column_name = 'outdoor_completed'
  ) THEN
    ALTER TABLE task_completions ADD COLUMN outdoor_completed boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_completions' AND column_name = 'social_completed'
  ) THEN
    ALTER TABLE task_completions ADD COLUMN social_completed boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_completions' AND column_name = 'outdoor_points_earned'
  ) THEN
    ALTER TABLE task_completions ADD COLUMN outdoor_points_earned integer DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_completions' AND column_name = 'social_points_earned'
  ) THEN
    ALTER TABLE task_completions ADD COLUMN social_points_earned integer DEFAULT 0;
  END IF;
END $$;

-- 为现有用户设置默认社交等级数据
UPDATE user_profiles 
SET 
  social_level = 1,
  social_points = 0,
  social_title = '社交新手'
WHERE 
  social_level IS NULL 
  OR social_points IS NULL 
  OR social_title IS NULL;