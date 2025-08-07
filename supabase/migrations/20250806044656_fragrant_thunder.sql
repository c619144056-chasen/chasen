/*
  # 修复数据初始化的 RLS 策略

  1. 问题描述
    - 应用启动时数据初始化失败，因为基础数据表缺少 INSERT 策略
    - 导致应用无法正常启动和显示登录界面

  2. 解决方案
    - 为所有基础数据表添加 INSERT 策略
    - 允许已认证用户插入基础数据
    - 确保数据初始化能够成功完成

  3. 涉及的表
    - destinations
    - outdoor_goals_data  
    - social_goals_data
    - preparation_items_data
    - safety_tips_data
*/

-- 为 destinations 表添加 INSERT 策略
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'destinations' 
    AND policyname = 'Allow system data initialization'
  ) THEN
    CREATE POLICY "Allow system data initialization"
      ON destinations
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- 为 outdoor_goals_data 表添加 INSERT 策略
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'outdoor_goals_data' 
    AND policyname = 'Allow system data initialization'
  ) THEN
    CREATE POLICY "Allow system data initialization"
      ON outdoor_goals_data
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- 为 social_goals_data 表添加 INSERT 策略
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'social_goals_data' 
    AND policyname = 'Allow system data initialization'
  ) THEN
    CREATE POLICY "Allow system data initialization"
      ON social_goals_data
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- 为 preparation_items_data 表添加 INSERT 策略
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'preparation_items_data' 
    AND policyname = 'Allow system data initialization'
  ) THEN
    CREATE POLICY "Allow system data initialization"
      ON preparation_items_data
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- 为 safety_tips_data 表添加 INSERT 策略
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'safety_tips_data' 
    AND policyname = 'Allow system data initialization'
  ) THEN
    CREATE POLICY "Allow system data initialization"
      ON safety_tips_data
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;