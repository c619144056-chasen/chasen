/*
  # 兴趣小组系统

  1. 新表
    - `interest_groups`
      - `id` (uuid, primary key)
      - `name` (text, 小组名称)
      - `description` (text, 小组描述)
      - `category` (text, 小组分类)
      - `is_private` (boolean, 是否私有)
      - `creator_id` (uuid, 创建者ID)
      - `member_count` (integer, 成员数量)
      - `created_at` (timestamp)
    
    - `group_members`
      - `id` (uuid, primary key)
      - `group_id` (uuid, 小组ID)
      - `user_id` (uuid, 用户ID)
      - `role` (text, 角色: admin, moderator, member)
      - `status` (text, 状态: active, pending, banned)
      - `joined_at` (timestamp)

  2. 安全策略
    - 启用 RLS
    - 适当的权限控制
*/

CREATE TABLE IF NOT EXISTS interest_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  is_private boolean DEFAULT false,
  creator_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  member_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES interest_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'pending', 'banned')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- 启用 RLS
ALTER TABLE interest_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

-- 兴趣小组策略
CREATE POLICY "所有用户可以查看公开小组"
  ON interest_groups
  FOR SELECT
  TO authenticated
  USING (NOT is_private OR creator_id = auth.uid());

CREATE POLICY "用户可以创建小组"
  ON interest_groups
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "创建者可以管理小组"
  ON interest_groups
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id);

-- 小组成员策略
CREATE POLICY "用户可以查看自己的小组成员关系"
  ON group_members
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM interest_groups 
    WHERE id = group_id AND (NOT is_private OR creator_id = auth.uid())
  ));

CREATE POLICY "用户可以加入小组"
  ON group_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以退出小组"
  ON group_members
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_interest_groups_category ON interest_groups(category);
CREATE INDEX IF NOT EXISTS idx_interest_groups_creator_id ON interest_groups(creator_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);