/*
  # 修复任务逻辑一致性和数据完整性

  1. 数据库结构调整
    - 为 outdoor_goals_data 表添加 applicable_destination_type 列
    - 为 social_goals_data 表添加 applicable_destination_type 列
    - 为现有数据填充适当的目的地类型关联

  2. 基础数据初始化
    - 插入宁波本地目的地数据
    - 插入与目的地类型匹配的户外目标
    - 插入与目的地类型匹配的社交目标
    - 插入准备物品和安全提示数据

  3. 性能优化
    - 为新列创建索引以提高查询性能
*/

-- 1. 为 outdoor_goals_data 表添加 applicable_destination_type 列
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'outdoor_goals_data' AND column_name = 'applicable_destination_type'
  ) THEN
    ALTER TABLE outdoor_goals_data ADD COLUMN applicable_destination_type text;
  END IF;
END $$;

-- 2. 为 social_goals_data 表添加 applicable_destination_type 列
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'social_goals_data' AND column_name = 'applicable_destination_type'
  ) THEN
    ALTER TABLE social_goals_data ADD COLUMN applicable_destination_type text;
  END IF;
END $$;

-- 3. 清理并插入目的地数据
DELETE FROM destinations WHERE name IN (
  '鄞州公园荷花池', '象山半岛海滩', '四明山森林公园', '东钱湖风景区', '天童森林公园'
);

INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('鄞州公园荷花池', '步行8分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8174, 121.5501, 'easy', 'park'),
('象山半岛海滩', '驾车45分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4774, 121.8693, 'medium', 'beach'),
('四明山森林公园', '驾车1小时', 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7000, 121.2000, 'hard', 'mountain'),
('东钱湖风景区', '驾车30分钟', 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7833, 121.6167, 'medium', 'lake'),
('天童森林公园', '驾车25分钟', 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8500, 121.7000, 'medium', 'forest');

-- 4. 清理并插入户外目标数据
DELETE FROM outdoor_goals_data WHERE title IN (
  '荷花观察挑战', '花卉摄影探索', '鸟类观察记录', '海浪观察记录', 
  '贝壳收集整理', '登高望远挑战', '地质观察探索', '湖面倒影拍摄', 
  '森林声音收集', '自然观察挑战'
);

INSERT INTO outdoor_goals_data (title, description, tips, min_user_level, applicable_destination_type) VALUES
-- 公园类户外目标
('荷花观察挑战', '在荷花池边观察并拍摄不同品种的荷花', '注意观察荷花的花瓣形状、颜色变化和开放程度', 1, 'park'),
('花卉摄影探索', '在公园中寻找并拍摄5种不同颜色的花朵', '关注花朵的形状、颜色搭配和光影效果', 1, 'park'),
('鸟类观察记录', '在公园中观察并记录至少3种不同的鸟类', '保持安静，使用望远镜或手机变焦功能', 2, 'park'),

-- 海滩类户外目标
('海浪观察记录', '在海边观察并记录海浪的节奏和形态变化', '注意潮汐时间，保持安全距离', 2, 'beach'),
('贝壳收集整理', '在海滩上收集不同形状和颜色的贝壳', '只收集空贝壳，保护海洋生物', 1, 'beach'),

-- 山地类户外目标
('登高望远挑战', '攀登到山峰的观景点，拍摄全景照片', '注意安全，选择合适的登山路线', 3, 'mountain'),
('地质观察探索', '在山地寻找并观察不同类型的岩石和地质结构', '了解基本地质知识，注意安全', 4, 'mountain'),

-- 湖泊类户外目标
('湖面倒影拍摄', '拍摄湖面上的倒影，捕捉对称美', '选择无风的时刻，湖面平静如镜', 2, 'lake'),

-- 森林类户外目标
('森林声音收集', '在森林中录制不同的自然声音', '鸟鸣、风声、叶子摩擦声等', 2, 'forest'),

-- 通用户外目标
('自然观察挑战', '寻找并拍摄3种不同形状的叶子，观察它们的纹理和颜色差异', '注意观察叶子的边缘、叶脉和颜色变化', 1, null);

-- 5. 清理并插入社交目标数据
DELETE FROM social_goals_data WHERE title IN (
  '公园友善问候', '儿童互动游戏', '海滩运动参与', '海滩摄影互助',
  '登山伙伴结识', '山顶合影留念', '湖边垂钓交流', '森林徒步组队',
  '分享与连接'
);

INSERT INTO social_goals_data (title, description, tips, min_user_level, applicable_destination_type) VALUES
-- 公园类社交目标
('公园友善问候', '在公园中向3位不同的游客友善问候', '保持微笑，选择合适的时机', 1, 'park'),
('儿童互动游戏', '与公园中的小朋友进行简单的互动游戏', '征得家长同意，保持适当距离', 2, 'park'),

-- 海滩类社交目标
('海滩运动参与', '参与海滩上的集体运动（如沙滩排球）', '积极参与，享受团队合作', 3, 'beach'),
('海滩摄影互助', '与其他游客互相帮助拍摄海滩照片', '主动提供帮助，分享美好时刻', 2, 'beach'),

-- 山地类社交目标
('登山伙伴结识', '在登山过程中结识新的登山伙伴', '互相鼓励，分享登山经验', 3, 'mountain'),
('山顶合影留念', '在山顶与其他登山者合影留念', '分享成功的喜悦，建立友谊', 2, 'mountain'),

-- 湖泊类社交目标
('湖边垂钓交流', '与湖边的垂钓者交流钓鱼心得', '学习钓鱼技巧，分享经验', 3, 'lake'),

-- 森林类社交目标
('森林徒步组队', '在森林中组织徒步小队，共同探索', '确保安全，互相照应', 4, 'forest'),

-- 通用社交目标
('分享与连接', '将今日最美的发现分享到社区，或邀请一位朋友加入明日挑战', '真诚的分享能激励更多人开始户外探索', 1, null);

-- 6. 插入准备物品数据（如果不存在）
INSERT INTO preparation_items_data (item_text, min_difficulty_level, applicable_weather)
SELECT * FROM (VALUES
  ('手机充电至少50%', 'easy', null),
  ('穿着舒适的步行鞋', 'easy', null),
  ('带上一瓶水', 'easy', null),
  ('随身携带纸巾', 'easy', null),
  ('防晒霜', 'easy', 'sunny'),
  ('遮阳帽', 'easy', 'sunny'),
  ('雨伞', 'easy', 'rainy'),
  ('防水外套', 'medium', 'rainy'),
  ('急救包', 'hard', null),
  ('备用电池', 'hard', null)
) AS new_items(item_text, min_difficulty_level, applicable_weather)
WHERE NOT EXISTS (
  SELECT 1 FROM preparation_items_data p 
  WHERE p.item_text = new_items.item_text
);

-- 7. 插入安全提示数据（如果不存在）
INSERT INTO safety_tips_data (tip_text, applicable_destination_type, applicable_weather)
SELECT * FROM (VALUES
  ('告知家人你的出行计划', null, null),
  ('保持手机电量充足', null, null),
  ('随时注意个人物品安全', null, null),
  ('注意路面湿滑', null, 'rainy'),
  ('及时补充水分', null, 'hot'),
  ('注意防晒', 'beach', 'sunny'),
  ('注意山地安全，不要独自行动', 'mountain', null),
  ('注意水边安全，不要靠近深水区', 'lake', null),
  ('在森林中保持在标记路径上', 'forest', null)
) AS new_tips(tip_text, applicable_destination_type, applicable_weather)
WHERE NOT EXISTS (
  SELECT 1 FROM safety_tips_data s 
  WHERE s.tip_text = new_tips.tip_text
);

-- 8. 创建性能优化索引
CREATE INDEX IF NOT EXISTS idx_outdoor_goals_destination_type 
ON outdoor_goals_data(applicable_destination_type);

CREATE INDEX IF NOT EXISTS idx_social_goals_destination_type 
ON social_goals_data(applicable_destination_type);

CREATE INDEX IF NOT EXISTS idx_destinations_type 
ON destinations(type);

CREATE INDEX IF NOT EXISTS idx_preparation_items_difficulty 
ON preparation_items_data(min_difficulty_level);

CREATE INDEX IF NOT EXISTS idx_safety_tips_destination_type 
ON safety_tips_data(applicable_destination_type);