/*
  # 创建存储桶和安全策略

  1. 存储桶
    - `avatars` - 用户头像
    - `task-photos` - 任务完成照片
    - `community-posts` - 社区动态图片

  2. 安全策略
    - 允许认证用户上传和查看图片
    - 用户只能删除自己上传的图片
*/

-- 创建存储桶
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('avatars', 'avatars', true),
  ('task-photos', 'task-photos', true),
  ('community-posts', 'community-posts', true)
ON CONFLICT (id) DO NOTHING;

-- 头像存储桶策略
CREATE POLICY "用户可以查看所有头像"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "用户可以上传头像"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "用户可以更新自己的头像"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "用户可以删除自己的头像"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 任务照片存储桶策略
CREATE POLICY "用户可以查看任务照片"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'task-photos');

CREATE POLICY "用户可以上传任务照片"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'task-photos');

CREATE POLICY "用户可以删除自己的任务照片"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'task-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 社区动态图片存储桶策略
CREATE POLICY "用户可以查看社区图片"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'community-posts');

CREATE POLICY "用户可以上传社区图片"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'community-posts');

CREATE POLICY "用户可以删除自己的社区图片"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'community-posts' AND auth.uid()::text = (storage.foldername(name))[1]);