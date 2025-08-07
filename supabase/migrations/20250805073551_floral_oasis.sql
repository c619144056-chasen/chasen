/*
  # 创建任务数据表

  1. 新表
    - `destinations` - 目的地数据表
      - `id` (uuid, 主键)
      - `name` (text, 目的地名称)
      - `distance` (text, 距离描述)
      - `image` (text, 图片URL)
      - `latitude` (numeric, 纬度)
      - `longitude` (numeric, 经度)
      - `difficulty_level` (text, 难度等级)
      - `type` (text, 地点类型)
    
    - `outdoor_goals_data` - 户外目标数据表
      - `id` (uuid, 主键)
      - `title` (text, 目标标题)
      - `description` (text, 目标描述)
      - `tips` (text, 提示)
      - `min_user_level` (integer, 最低用户等级)
    
    - `social_goals_data` - 社交目标数据表
      - `id` (uuid, 主键)
      - `title` (text, 目标标题)
      - `description` (text, 目标描述)
      - `tips` (text, 提示)
      - `min_user_level` (integer, 最低用户等级)
    
    - `preparation_items_data` - 准备物品数据表
      - `id` (uuid, 主键)
      - `item_text` (text, 物品描述)
      - `min_difficulty_level` (text, 最低难度等级)
      - `applicable_weather` (text, 适用天气)
    
    - `safety_tips_data` - 安全提示数据表
      - `id` (uuid, 主键)
      - `tip_text` (text, 提示内容)
      - `applicable_destination_type` (text, 适用地点类型)
      - `applicable_weather` (text, 适用天气)

  2. 安全策略
    - 所有表启用 RLS
    - 允许认证用户读取数据

  3. 数据初始化
    - 插入预设的目的地数据
    - 插入户外目标数据
    - 插入社交目标数据
    - 插入准备物品数据
    - 插入安全提示数据
*/

-- 创建目的地表
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  distance text,
  image text,
  latitude numeric,
  longitude numeric,
  difficulty_level text DEFAULT 'easy',
  type text DEFAULT 'park',
  created_at timestamptz DEFAULT now()
);

-- 创建户外目标数据表
CREATE TABLE IF NOT EXISTS outdoor_goals_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tips text,
  min_user_level integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- 创建社交目标数据表
CREATE TABLE IF NOT EXISTS social_goals_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tips text,
  min_user_level integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- 创建准备物品数据表
CREATE TABLE IF NOT EXISTS preparation_items_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_text text NOT NULL,
  min_difficulty_level text DEFAULT 'easy',
  applicable_weather text,
  created_at timestamptz DEFAULT now()
);

-- 创建安全提示数据表
CREATE TABLE IF NOT EXISTS safety_tips_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_text text NOT NULL,
  applicable_destination_type text,
  applicable_weather text,
  created_at timestamptz DEFAULT now()
);

-- 为 daily_tasks 表添加坐标字段
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'daily_tasks' AND column_name = 'destination_latitude'
  ) THEN
    ALTER TABLE daily_tasks ADD COLUMN destination_latitude numeric;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'daily_tasks' AND column_name = 'destination_longitude'
  ) THEN
    ALTER TABLE daily_tasks ADD COLUMN destination_longitude numeric;
  END IF;
END $$;

-- 启用 RLS
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE outdoor_goals_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_goals_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE preparation_items_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_tips_data ENABLE ROW LEVEL SECURITY;

-- 创建安全策略 - 允许认证用户读取数据
CREATE POLICY "Allow authenticated users to read destinations"
  ON destinations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read outdoor goals"
  ON outdoor_goals_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read social goals"
  ON social_goals_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read preparation items"
  ON preparation_items_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read safety tips"
  ON safety_tips_data
  FOR SELECT
  TO authenticated
  USING (true);

-- 插入目的地数据
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
-- 公园类
('绿源公园', '步行8分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9042, 116.4074, 'easy', 'park'),
('社区花园', '步行5分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.8942, 116.3974, 'easy', 'garden'),
('城市森林公园', '步行15分钟', 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9142, 116.4174, 'easy', 'park'),
('樱花公园', '步行10分钟', 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.8842, 116.3874, 'easy', 'park'),
-- 水景类
('湖心亭', '步行12分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9242, 116.4274, 'medium', 'scenic'),
('河滨步道', '步行15分钟', 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.8742, 116.3774, 'medium', 'riverside'),
('荷花池', '步行18分钟', 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9342, 116.4374, 'medium', 'scenic'),
('湿地公园', '步行25分钟', 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.8642, 116.3674, 'medium', 'wetland'),
-- 山地类
('山顶观景台', '步行25分钟', 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9442, 116.4474, 'hard', 'mountain'),
('森林小径', '步行30分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.8542, 116.3574, 'hard', 'forest'),
('竹林幽径', '步行20分钟', 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9542, 116.4574, 'medium', 'forest'),
-- 特色景点类
('古建筑群', '步行22分钟', 'https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9642, 116.4674, 'medium', 'historic'),
('雕塑公园', '步行16分钟', 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.8442, 116.3474, 'easy', 'art'),
('植物园温室', '步行28分钟', 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9742, 116.4774, 'medium', 'botanical'),
('天文观测台', '步行35分钟', 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.8342, 116.3374, 'hard', 'observatory');

-- 插入户外目标数据
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
-- 初级目标 (Level 1-2)
('自然观察挑战', '寻找并拍摄3种不同形状的叶子，观察它们的纹理和颜色差异', '注意观察叶子的边缘、叶脉和颜色变化', 1),
('色彩收集任务', '寻找并拍摄5种不同颜色的自然物体（花朵、石头、树皮等）', '尝试找到红、黄、蓝、绿、紫等不同色彩', 1),
('声音探索', '静坐5分钟，记录听到的所有自然声音', '鸟叫、风声、水声、昆虫声都是很好的记录对象', 1),
('正念冥想体验', '在自然环境中进行10分钟的呼吸冥想，感受周围的声音和气息', '找一个安静的角落，闭上眼睛专注于呼吸', 2),
('纹理探索', '用手触摸并拍摄5种不同纹理的自然表面', '树皮、石头、花瓣、叶子都有独特的纹理', 2),
-- 中级目标 (Level 3-5)
('微观摄影探索', '用手机微距功能拍摄5张不同的自然细节照片', '关注花朵的花蕊、水滴、昆虫等小细节', 3),
('光影捕捉', '在不同时间拍摄同一地点，观察光影变化', '早晨、中午、傍晚的光线会创造不同的氛围', 3),
('季节变化记录', '选择一棵树或一片区域，记录其当前季节特征', '注意叶子颜色、花朵状态、果实情况', 4),
('动物行为观察', '观察并记录一种小动物的行为模式（鸟类、昆虫、松鼠等）', '保持安静，耐心观察，不要惊扰动物', 4),
('生态系统观察', '观察并记录一个小生态系统中的生物互动关系', '可以选择一棵树、一片草地或一个小池塘', 5),
('天气预测挑战', '通过观察云朵、风向、动物行为来预测天气变化', '学习传统的天气预测方法，观察自然界的信号', 5),
-- 高级目标 (Level 6-10)
('植物识别专家', '识别并记录10种不同的植物，了解它们的特征和用途', '使用植物识别应用辅助学习，记录详细特征', 6),
('地质探索', '寻找并识别3种不同类型的岩石或矿物', '观察颜色、硬度、纹理等特征', 6),
('星空观测', '在晚上识别3个星座或观测月相变化', '选择光污染较少的地点，使用星图应用辅助', 7),
('自然艺术创作', '用自然材料创作一件艺术品并拍照记录', '可以用树叶、石头、花朵等创作图案或雕塑', 7),
('生物多样性调查', '在指定区域内记录所有发现的生物种类', '包括植物、动物、昆虫、真菌等，制作详细清单', 8),
('环境影响评估', '观察并记录人类活动对自然环境的影响', '注意垃圾、污染、栖息地破坏等问题', 9),
('自然导师挑战', '带领一位新手完成一次自然探索，分享你的知识和经验', '耐心教导，分享观察技巧和自然知识', 10);

-- 插入社交目标数据
INSERT INTO social_goals_data (title, description, tips, min_user_level) VALUES
-- 初级社交目标
('分享与连接', '将今日最美的发现分享到社区，或邀请一位朋友加入明日挑战', '真诚的分享能激励更多人开始户外探索', 1),
('新手问候', '在社区中向3位新用户表示欢迎或提供帮助', '友善的问候能让新手感受到社区的温暖', 1),
('互助与支持', '在社区中给其他探索者的分享点赞评论，或回答新手的问题', '每个人的鼓励都很珍贵，不要吝啬你的赞美', 2),
('经验分享', '分享一个你在户外探索中学到的小技巧或心得', '即使是简单的技巧，也可能对他人很有帮助', 2),
-- 中级社交目标
('知识传递', '向社区分享一个你今天学到的自然知识或观察心得', '即使是小小的发现，也可能启发他人', 3),
('摄影技巧分享', '分享一张你最满意的自然照片，并说明拍摄技巧', '包括拍摄角度、光线运用、构图方法等', 3),
('地点推荐', '向社区推荐一个你发现的优美自然地点', '详细描述地点特色、最佳游览时间和注意事项', 4),
('季节指南', '制作一份当前季节的户外活动指南分享给社区', '包括适合的活动、需要注意的事项、最佳时间等', 4),
-- 高级社交目标
('组织小型活动', '邀请2-3位朋友一起完成今日的户外挑战', '团队探索能带来更多乐趣和安全保障', 5),
('主题讨论发起', '在社区中发起一个关于自然保护或户外安全的讨论', '选择有意义的话题，引导积极的讨论', 6),
('新手导师', '主动联系一位新用户，提供个人指导和建议', '分享你的经验，帮助他们更好地开始户外探索', 7),
('社区贡献者', '为社区创建一份有用的资源（如植物识别指南、安全检查清单等）', '制作实用的内容，帮助整个社区提升探索体验', 8);

-- 插入准备物品数据
INSERT INTO preparation_items_data (item_text, min_difficulty_level, applicable_weather) VALUES
-- 基础物品
('手机充电至少50%', 'easy', NULL),
('穿着舒适的步行鞋', 'easy', NULL),
('带上一瓶水', 'easy', NULL),
('随身携带纸巾', 'easy', NULL),
('准备垃圾袋（保护环境）', 'easy', NULL),
('湿纸巾', 'easy', NULL),
('小零食', 'easy', NULL),
-- 天气相关物品
('防晒霜', 'easy', 'sunny'),
('遮阳帽', 'easy', 'sunny'),
('太阳镜', 'easy', 'sunny'),
('防晒衣', 'easy', 'sunny'),
('雨伞', 'easy', 'rainy'),
('防水外套', 'easy', 'rainy'),
('防滑鞋套', 'easy', 'rainy'),
('防水袋', 'easy', 'rainy'),
('保暖外套', 'easy', 'cold'),
('手套', 'easy', 'cold'),
('围巾', 'easy', 'cold'),
('暖宝宝', 'easy', 'cold'),
('充足的水', 'easy', 'hot'),
('遮阳伞', 'easy', 'hot'),
('降温毛巾', 'easy', 'hot'),
('电解质饮料', 'easy', 'hot'),
('轻薄外套', 'easy', 'cloudy'),
('备用衣物', 'easy', 'cloudy'),
('防风外套', 'easy', 'windy'),
('帽子绳带', 'easy', 'windy'),
-- 中级物品
('小背包', 'medium', NULL),
('能量棒', 'medium', NULL),
('创可贴', 'medium', NULL),
('驱虫剂', 'medium', NULL),
-- 高级物品
('急救包', 'hard', NULL),
('备用电池', 'hard', NULL),
('登山杖', 'hard', NULL),
('头灯', 'hard', NULL),
('哨子', 'hard', NULL),
('地图或GPS设备', 'hard', NULL);

-- 插入安全提示数据
INSERT INTO safety_tips_data (tip_text, applicable_destination_type, applicable_weather) VALUES
-- 基础安全提示
('告知家人你的出行计划', NULL, NULL),
('保持手机电量充足', NULL, NULL),
('随时注意个人物品安全', NULL, NULL),
('遵守当地规定和标识', NULL, NULL),
-- 天气相关安全提示
('注意路面湿滑', NULL, 'rainy'),
('避免在雷雨天气外出', NULL, 'rainy'),
('远离积水区域', NULL, 'rainy'),
('小心触电风险', NULL, 'rainy'),
('避免中午时段外出', NULL, 'hot'),
('及时补充水分', NULL, 'hot'),
('寻找阴凉处休息', NULL, 'hot'),
('注意中暑症状', NULL, 'hot'),
('注意保暖', NULL, 'cold'),
('小心结冰路面', NULL, 'cold'),
('避免长时间暴露在寒风中', NULL, 'cold'),
('注意冻伤风险', NULL, 'cold'),
('注意防晒', NULL, 'sunny'),
('避免长时间暴晒', NULL, 'sunny'),
('注意高空坠物', NULL, 'windy'),
('避免在大树下停留', NULL, 'windy'),
('注意天气变化', NULL, 'cloudy'),
('准备应对突然降雨', NULL, 'cloudy'),
-- 地点类型相关安全提示
('注意山路安全', 'mountain', NULL),
('不要偏离主要道路', 'mountain', NULL),
('避免独自登山', 'mountain', NULL),
('注意落石风险', 'mountain', NULL),
('远离水边危险区域', 'riverside', NULL),
('注意水位变化', 'riverside', NULL),
('不要下水游泳', 'riverside', NULL),
('小心湿滑石头', 'riverside', NULL),
('遵守公园规定', 'park', NULL),
('爱护环境', 'park', NULL),
('不要喂食野生动物', 'park', NULL),
('垃圾请带走', 'park', NULL),
('不要偏离标记路径', 'forest', NULL),
('注意野生动物', 'forest', NULL),
('防止迷路', 'forest', NULL),
('小心有毒植物', 'forest', NULL),
('注意观景台安全', 'scenic', NULL),
('不要攀爬护栏', 'scenic', NULL),
('拍照时注意脚下', 'scenic', NULL),
('不要采摘花草', 'garden', NULL),
('注意蜜蜂等昆虫', 'garden', NULL),
('走指定路径', 'garden', NULL),
('不要进入湿地核心区', 'wetland', NULL),
('注意保护鸟类栖息地', 'wetland', NULL),
('穿防水鞋', 'wetland', NULL),
('保护文物古迹', 'historic', NULL),
('不要触摸展品', 'historic', NULL),
('保持安静', 'historic', NULL),
('不要触摸艺术品', 'art', NULL),
('注意雕塑周围安全', 'art', NULL),
('不要采摘植物', 'botanical', NULL),
('注意温室内湿滑', 'botanical', NULL),
('遵守参观规则', 'botanical', NULL),
('夜间注意安全', 'observatory', NULL),
('使用红光手电', 'observatory', NULL),
('注意台阶', 'observatory', NULL);