/*
  # 用户关注系统

  1. 新表
    - `user_follows`
      - `id` (uuid, primary key)
      - `follower_id` (uuid, 关注者ID)
      - `following_id` (uuid, 被关注者ID)
      - `created_at` (timestamp)

  2. 安全策略
    - 启用 RLS
    - 用户可以管理自己的关注关系
    - 所有用户可以查看关注关系
*/

CREATE TABLE IF NOT EXISTS user_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  following_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;

-- 用户可以管理自己的关注关系
CREATE POLICY "用户可以管理自己的关注关系"
  ON user_follows
  FOR ALL
  TO authenticated
  USING (auth.uid() = follower_id)
  WITH CHECK (auth.uid() = follower_id);

-- 所有用户可以查看关注关系
CREATE POLICY "所有用户可以查看关注关系"
  ON user_follows
  FOR SELECT
  TO authenticated
  USING (true);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_user_follows_follower_id ON user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following_id ON user_follows(following_id);