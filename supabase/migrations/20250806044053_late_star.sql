/*
  # 添加数据表的插入策略

  为基础数据表添加 INSERT 策略，允许系统初始化数据。

  1. 策略更新
    - `destinations` 表：允许认证用户插入目的地数据
    - `outdoor_goals_data` 表：允许认证用户插入户外目标数据  
    - `social_goals_data` 表：允许认证用户插入社交目标数据
    - `preparation_items_data` 表：允许认证用户插入准备物品数据
    - `safety_tips_data` 表：允许认证用户插入安全提示数据

  2. 安全考虑
    - 这些策略允许认证用户插入基础数据
    - 在生产环境中，可能需要更严格的权限控制
*/

-- 为 destinations 表添加 INSERT 策略
CREATE POLICY "Allow authenticated users to insert destinations"
  ON destinations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 为 outdoor_goals_data 表添加 INSERT 策略
CREATE POLICY "Allow authenticated users to insert outdoor goals"
  ON outdoor_goals_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 为 social_goals_data 表添加 INSERT 策略
CREATE POLICY "Allow authenticated users to insert social goals"
  ON social_goals_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 为 preparation_items_data 表添加 INSERT 策略
CREATE POLICY "Allow authenticated users to insert preparation items"
  ON preparation_items_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 为 safety_tips_data 表添加 INSERT 策略
CREATE POLICY "Allow authenticated users to insert safety tips"
  ON safety_tips_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);