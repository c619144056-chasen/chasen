/*
  # 添加数据库函数

  1. 函数
    - `update_user_stats` - 更新用户统计数据
    - `increment_post_likes` - 增加动态点赞数
    - `calculate_user_level` - 计算用户等级

  2. 触发器
    - 自动更新用户等级
    - 自动更新时间戳
*/

-- 更新用户统计数据的函数
CREATE OR REPLACE FUNCTION update_user_stats(
  user_id uuid,
  points_to_add integer DEFAULT 0,
  tasks_to_add integer DEFAULT 0,
  distance_to_add numeric DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_profiles 
  SET 
    points = points + points_to_add,
    completed_tasks = completed_tasks + tasks_to_add,
    total_distance = total_distance + distance_to_add,
    level = CASE 
      WHEN (points + points_to_add) >= 1000 THEN 10
      WHEN (points + points_to_add) >= 800 THEN 9
      WHEN (points + points_to_add) >= 600 THEN 8
      WHEN (points + points_to_add) >= 500 THEN 7
      WHEN (points + points_to_add) >= 400 THEN 6
      WHEN (points + points_to_add) >= 300 THEN 5
      WHEN (points + points_to_add) >= 200 THEN 4
      WHEN (points + points_to_add) >= 100 THEN 3
      WHEN (points + points_to_add) >= 50 THEN 2
      ELSE 1
    END,
    title = CASE 
      WHEN (points + points_to_add) >= 1000 THEN '探索大师'
      WHEN (points + points_to_add) >= 800 THEN '自然导师'
      WHEN (points + points_to_add) >= 600 THEN '户外专家'
      WHEN (points + points_to_add) >= 500 THEN '冒险家'
      WHEN (points + points_to_add) >= 400 THEN '探险者'
      WHEN (points + points_to_add) >= 300 THEN '自然爱好者'
      WHEN (points + points_to_add) >= 200 THEN '户外达人'
      WHEN (points + points_to_add) >= 100 THEN '自然学徒'
      WHEN (points + points_to_add) >= 50 THEN '初级探索者'
      ELSE '自然新手'
    END,
    updated_at = now()
  WHERE id = user_id;
END;
$$;

-- 增加动态点赞数的函数
CREATE OR REPLACE FUNCTION increment_post_likes(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE community_posts 
  SET likes_count = likes_count + 1
  WHERE id = post_id;
END;
$$;

-- 计算连续天数的函数
CREATE OR REPLACE FUNCTION update_user_streak(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  last_completion_date date;
  current_streak integer;
BEGIN
  -- 获取用户最近的任务完成日期
  SELECT DATE(completed_at) INTO last_completion_date
  FROM daily_tasks 
  WHERE user_id = update_user_streak.user_id 
    AND status = 'completed'
  ORDER BY completed_at DESC 
  LIMIT 1;
  
  -- 如果今天完成了任务
  IF last_completion_date = CURRENT_DATE THEN
    -- 计算连续天数
    SELECT COUNT(*) INTO current_streak
    FROM (
      SELECT DATE(completed_at) as completion_date
      FROM daily_tasks 
      WHERE user_id = update_user_streak.user_id 
        AND status = 'completed'
      ORDER BY completed_at DESC
    ) consecutive_days
    WHERE completion_date >= CURRENT_DATE - INTERVAL '30 days';
    
    -- 更新用户连续天数
    UPDATE user_profiles 
    SET streak = current_streak
    WHERE id = user_id;
  END IF;
END;
$$;

-- 自动更新时间戳的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 为用户档案表添加更新时间戳触发器
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();