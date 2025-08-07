/*
  # 创建小组消息表和相关功能

  1. 新表
    - `group_messages`
      - `id` (uuid, 主键)
      - `group_id` (uuid, 外键到 interest_groups)
      - `user_id` (uuid, 外键到 user_profiles)
      - `content` (text, 消息内容)
      - `message_type` (text, 消息类型)
      - `reply_to` (uuid, 回复消息ID)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `deleted_at` (timestamp, 软删除)

  2. 安全策略
    - 启用行级安全
    - 小组成员可以查看消息
    - 小组成员可以发送消息
    - 用户可以删除自己的消息

  3. 索引
    - group_id 索引（查询优化）
    - created_at 索引（时间排序）
    - user_id 索引（用户消息查询）
*/

-- 创建小组消息表
CREATE TABLE IF NOT EXISTS group_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  user_id uuid NOT NULL,
  content text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'system')),
  reply_to uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- 添加外键约束
ALTER TABLE group_messages 
ADD CONSTRAINT group_messages_group_id_fkey 
FOREIGN KEY (group_id) REFERENCES interest_groups(id) ON DELETE CASCADE;

ALTER TABLE group_messages 
ADD CONSTRAINT group_messages_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;

ALTER TABLE group_messages 
ADD CONSTRAINT group_messages_reply_to_fkey 
FOREIGN KEY (reply_to) REFERENCES group_messages(id) ON DELETE SET NULL;

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_group_messages_group_id ON group_messages(group_id);
CREATE INDEX IF NOT EXISTS idx_group_messages_created_at ON group_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_group_messages_user_id ON group_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_group_messages_reply_to ON group_messages(reply_to);

-- 启用行级安全
ALTER TABLE group_messages ENABLE ROW LEVEL SECURITY;

-- 创建安全策略
CREATE POLICY "小组成员可以查看消息"
  ON group_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_members.group_id = group_messages.group_id 
      AND group_members.user_id = auth.uid() 
      AND group_members.status = 'active'
    )
  );

CREATE POLICY "小组成员可以发送消息"
  ON group_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_members.group_id = group_messages.group_id 
      AND group_members.user_id = auth.uid() 
      AND group_members.status = 'active'
    )
    AND auth.uid() = user_id
  );

CREATE POLICY "用户可以删除自己的消息"
  ON group_messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_group_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_group_messages_updated_at
  BEFORE UPDATE ON group_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_group_messages_updated_at();