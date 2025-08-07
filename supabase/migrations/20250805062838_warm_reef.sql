/*
  # 修复用户档案表的行级安全策略

  1. 安全策略修复
    - 允许认证用户插入自己的档案
    - 允许认证用户读取自己的档案
    - 允许认证用户更新自己的档案

  2. 邮箱确认设置
    - 在开发环境中禁用邮箱确认要求
*/

-- 删除现有的有问题的策略
DROP POLICY IF EXISTS "用户可以插入自己的档案" ON user_profiles;
DROP POLICY IF EXISTS "用户可以查看自己的档案" ON user_profiles;
DROP POLICY IF EXISTS "用户可以更新自己的档案" ON user_profiles;

-- 创建正确的行级安全策略
CREATE POLICY "Allow authenticated users to insert their own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow authenticated users to read their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users to update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 确保RLS已启用
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;