/*
  # 清空并重新生成户外活动数据

  1. 数据清理
    - 清空现有的每日任务数据
    - 清空现有的基础数据表（目的地、目标、准备物品、安全提示）

  2. 重新生成数据
    - 为20种活动类型各生成10个目的地
    - 为每种活动类型生成相应的户外目标
    - 生成社交目标数据
    - 生成准备物品和安全提示数据

  3. 活动类型覆盖
    - 步行探索、自然摄影、户外冥想、观鸟、观星、骑行
    - 越野跑、寻宝、钓鱼、背包旅行、皮划艇、定向越野
    - 野外采摘、吊床休闲、爬山、沙滩、文化、集市、公园、地方特色
*/

-- 清空现有数据
TRUNCATE TABLE daily_tasks CASCADE;
TRUNCATE TABLE destinations CASCADE;
TRUNCATE TABLE outdoor_goals_data CASCADE;
TRUNCATE TABLE social_goals_data CASCADE;
TRUNCATE TABLE preparation_items_data CASCADE;
TRUNCATE TABLE safety_tips_data CASCADE;

-- 重新生成目的地数据 (每种活动类型10个目的地)

-- 步行探索 (walking)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('绿荫步道', '步行5分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9042, 116.4074, 'easy', 'walking'),
('河滨漫步道', '步行8分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9142, 116.4174, 'easy', 'walking'),
('城市绿道', '步行12分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9242, 116.4274, 'easy', 'walking'),
('湖心环道', '步行15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9342, 116.4374, 'medium', 'walking'),
('花园小径', '步行6分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9442, 116.4474, 'easy', 'walking'),
('古树大道', '步行10分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9542, 116.4574, 'easy', 'walking'),
('竹林幽径', '步行18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9642, 116.4674, 'medium', 'walking'),
('石板古道', '步行20分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9742, 116.4774, 'medium', 'walking'),
('梧桐大街', '步行7分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9842, 116.4874, 'easy', 'walking'),
('樱花步道', '步行14分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9942, 116.4974, 'easy', 'walking');

-- 自然摄影 (photography)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('晨光花园', '步行8分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0042, 116.5074, 'easy', 'photography'),
('倒影湖', '步行12分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0142, 116.5174, 'easy', 'photography'),
('蝴蝶谷', '步行15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0242, 116.5274, 'medium', 'photography'),
('荷花池', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0342, 116.5374, 'easy', 'photography'),
('秋叶林', '步行18分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0442, 116.5474, 'medium', 'photography'),
('野花草地', '步行6分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0542, 116.5574, 'easy', 'photography'),
('石桥流水', '步行14分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0642, 116.5674, 'easy', 'photography'),
('云雾山顶', '步行25分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0742, 116.5774, 'hard', 'photography'),
('日出观景台', '步行22分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0842, 116.5874, 'medium', 'photography'),
('瀑布景区', '步行30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.0942, 116.5974, 'hard', 'photography');

-- 户外冥想 (meditation)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('静心亭', '步行5分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1042, 116.6074, 'easy', 'meditation'),
('禅意花园', '步行8分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1142, 116.6174, 'easy', 'meditation'),
('山间清泉', '步行20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1242, 116.6274, 'medium', 'meditation'),
('古寺后山', '步行25分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1342, 116.6374, 'medium', 'meditation'),
('湖心小岛', '步行15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1442, 116.6474, 'easy', 'meditation'),
('松林空地', '步行12分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1542, 116.6574, 'easy', 'meditation'),
('观音台', '步行18分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1642, 116.6674, 'medium', 'meditation'),
('云海观景点', '步行35分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1742, 116.6774, 'hard', 'meditation'),
('竹海深处', '步行28分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1842, 116.6874, 'medium', 'meditation'),
('山顶禅台', '步行40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.1942, 116.6974, 'hard', 'meditation');

-- 观鸟 (birdwatching)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('湿地观鸟台', '步行10分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2042, 116.7074, 'easy', 'birdwatching'),
('候鸟栖息地', '步行15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2142, 116.7174, 'easy', 'birdwatching'),
('森林鸟类保护区', '步行25分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2242, 116.7274, 'medium', 'birdwatching'),
('芦苇荡', '步行12分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2342, 116.7374, 'easy', 'birdwatching'),
('山谷鸟鸣点', '步行30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2442, 116.7474, 'medium', 'birdwatching'),
('古树鸟巢区', '步行8分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2542, 116.7574, 'easy', 'birdwatching'),
('水鸟观察点', '步行18分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2642, 116.7674, 'easy', 'birdwatching'),
('猛禽观测台', '步行35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2742, 116.7774, 'hard', 'birdwatching'),
('迁徙路线观察点', '步行22分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2842, 116.7874, 'medium', 'birdwatching'),
('鸟类摄影基地', '步行16分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.2942, 116.7974, 'easy', 'birdwatching');

-- 观星 (stargazing)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('天文观测台', '步行20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3042, 116.8074, 'easy', 'stargazing'),
('山顶观星点', '步行45分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3142, 116.8174, 'hard', 'stargazing'),
('郊外空旷地', '步行25分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3242, 116.8274, 'medium', 'stargazing'),
('湖边观星台', '步行15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3342, 116.8374, 'easy', 'stargazing'),
('高原观测点', '步行50分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3442, 116.8474, 'hard', 'stargazing'),
('草原星空区', '步行30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3542, 116.8574, 'medium', 'stargazing'),
('沙漠观星地', '步行40分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3642, 116.8674, 'hard', 'stargazing'),
('海边观星台', '步行18分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3742, 116.8774, 'easy', 'stargazing'),
('森林空地', '步行22分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3842, 116.8874, 'medium', 'stargazing'),
('古堡观星台', '步行35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.3942, 116.8974, 'medium', 'stargazing');

-- 骑行 (cycling)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('滨河自行车道', '骑行10分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4042, 116.9074, 'easy', 'cycling'),
('环湖骑行道', '骑行25分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4142, 116.9174, 'medium', 'cycling'),
('山地车道', '骑行35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4242, 116.9274, 'hard', 'cycling'),
('田园小径', '骑行15分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4342, 116.9374, 'easy', 'cycling'),
('海岸线骑行道', '骑行30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4442, 116.9474, 'medium', 'cycling'),
('森林步道', '骑行20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4542, 116.9574, 'easy', 'cycling'),
('古镇石路', '骑行18分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4642, 116.9674, 'easy', 'cycling'),
('山坡挑战道', '骑行40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4742, 116.9774, 'hard', 'cycling'),
('乡村绿道', '骑行22分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4842, 116.9874, 'medium', 'cycling'),
('城市环线', '骑行28分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.4942, 116.9974, 'medium', 'cycling');

-- 越野跑 (trail_running)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('森林越野径', '跑步15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5042, 117.0074, 'medium', 'trail_running'),
('山地跑道', '跑步25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5142, 117.0174, 'hard', 'trail_running'),
('河谷小径', '跑步12分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5242, 117.0274, 'easy', 'trail_running'),
('丘陵越野道', '跑步20分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5342, 117.0374, 'medium', 'trail_running'),
('沙滩跑道', '跑步18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5442, 117.0474, 'medium', 'trail_running'),
('公园环形道', '跑步10分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5542, 117.0574, 'easy', 'trail_running'),
('岩石小径', '跑步30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5642, 117.0674, 'hard', 'trail_running'),
('草原跑道', '跑步22分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5742, 117.0774, 'medium', 'trail_running'),
('湖边小径', '跑步14分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5842, 117.0874, 'easy', 'trail_running'),
('高山挑战道', '跑步45分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.5942, 117.0974, 'hard', 'trail_running');

-- 寻宝 (geocaching)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('城市寻宝点', '步行8分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6042, 117.1074, 'easy', 'geocaching'),
('森林宝藏地', '步行20分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6142, 117.1174, 'medium', 'geocaching'),
('古迹寻宝区', '步行15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6242, 117.1274, 'easy', 'geocaching'),
('山洞探宝点', '步行35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6342, 117.1374, 'hard', 'geocaching'),
('海岸寻宝地', '步行12分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6442, 117.1474, 'easy', 'geocaching'),
('废墟探索区', '步行25分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6542, 117.1574, 'medium', 'geocaching'),
('桥下秘密点', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6642, 117.1674, 'easy', 'geocaching'),
('高塔挑战点', '步行40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6742, 117.1774, 'hard', 'geocaching'),
('公园隐藏点', '步行6分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6842, 117.1874, 'easy', 'geocaching'),
('河岸宝藏点', '步行18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.6942, 117.1974, 'medium', 'geocaching');

-- 钓鱼 (fishing)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('静水湖钓点', '步行10分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7042, 117.2074, 'easy', 'fishing'),
('山溪钓鱼区', '步行25分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7142, 117.2174, 'medium', 'fishing'),
('河口钓鱼台', '步行15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7242, 117.2274, 'easy', 'fishing'),
('深潭垂钓点', '步行30分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7342, 117.2374, 'medium', 'fishing'),
('海钓码头', '步行20分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7442, 117.2474, 'easy', 'fishing'),
('野生鱼塘', '步行35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7542, 117.2574, 'hard', 'fishing'),
('竹林溪流', '步行18分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7642, 117.2674, 'medium', 'fishing'),
('水库钓鱼区', '步行22分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7742, 117.2774, 'easy', 'fishing'),
('古桥下钓点', '步行12分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7842, 117.2874, 'easy', 'fishing'),
('瀑布下游', '步行28分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.7942, 117.2974, 'medium', 'fishing');

-- 背包旅行 (backpacking)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('山间小屋', '徒步1小时', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8042, 117.3074, 'medium', 'backpacking'),
('野营基地', '徒步2小时', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8142, 117.3174, 'hard', 'backpacking'),
('森林露营地', '徒步45分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8242, 117.3274, 'medium', 'backpacking'),
('湖边营地', '徒步30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8342, 117.3374, 'easy', 'backpacking'),
('高山避难所', '徒步3小时', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8442, 117.3474, 'hard', 'backpacking'),
('草原营地', '徒步1.5小时', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8542, 117.3574, 'medium', 'backpacking'),
('海边露营点', '徒步25分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8642, 117.3674, 'easy', 'backpacking'),
('峡谷宿营地', '徒步2.5小时', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8742, 117.3774, 'hard', 'backpacking'),
('溪边野营点', '徒步40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8842, 117.3874, 'medium', 'backpacking'),
('山顶营地', '徒步4小时', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.8942, 117.3974, 'hard', 'backpacking');

-- 皮划艇 (kayaking)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('平静湖面', '划行20分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9042, 117.4074, 'easy', 'kayaking'),
('蜿蜒河道', '划行35分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9142, 117.4174, 'medium', 'kayaking'),
('海湾探索区', '划行45分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9242, 117.4274, 'medium', 'kayaking'),
('水库划行区', '划行25分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9342, 117.4374, 'easy', 'kayaking'),
('激流挑战段', '划行1小时', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9442, 117.4474, 'hard', 'kayaking'),
('红树林水道', '划行30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9542, 117.4574, 'medium', 'kayaking'),
('峡谷水道', '划行50分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9642, 117.4674, 'hard', 'kayaking'),
('湿地水道', '划行15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9742, 117.4774, 'easy', 'kayaking'),
('岛屿环游', '划行40分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9842, 117.4874, 'medium', 'kayaking'),
('溶洞水路', '划行55分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 40.9942, 117.4974, 'hard', 'kayaking');

-- 定向越野 (orienteering)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('森林定向区', '徒步30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0042, 117.5074, 'medium', 'orienteering'),
('山地定向场', '徒步45分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0142, 117.5174, 'hard', 'orienteering'),
('公园定向点', '徒步15分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0242, 117.5274, 'easy', 'orienteering'),
('丘陵越野区', '徒步35分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0342, 117.5374, 'medium', 'orienteering'),
('沙漠导航区', '徒步1小时', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0442, 117.5474, 'hard', 'orienteering'),
('湿地迷宫', '徒步25分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0542, 117.5574, 'medium', 'orienteering'),
('城市定向赛道', '徒步20分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0642, 117.5674, 'easy', 'orienteering'),
('峡谷挑战区', '徒步50分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0742, 117.5774, 'hard', 'orienteering'),
('草原导航点', '徒步40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0842, 117.5874, 'medium', 'orienteering'),
('海岸定向区', '徒步28分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.0942, 117.5974, 'easy', 'orienteering');

-- 野外采摘 (foraging)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('野果采摘区', '步行15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1042, 117.6074, 'easy', 'foraging'),
('蘑菇森林', '步行25分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1142, 117.6174, 'medium', 'foraging'),
('野菜田园', '步行12分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1242, 117.6274, 'easy', 'foraging'),
('药草山坡', '步行30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1342, 117.6374, 'medium', 'foraging'),
('野花草地', '步行8分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1442, 117.6474, 'easy', 'foraging'),
('山谷采摘点', '步行35分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1542, 117.6574, 'hard', 'foraging'),
('河边野菜区', '步行18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1642, 117.6674, 'easy', 'foraging'),
('古树下采摘区', '步行22分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1742, 117.6774, 'medium', 'foraging'),
('野生茶园', '步行40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1842, 117.6874, 'hard', 'foraging'),
('山坡果园', '步行20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.1942, 117.6974, 'easy', 'foraging');

-- 吊床休闲 (hammocking)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('林间空地', '步行10分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2042, 117.7074, 'easy', 'hammocking'),
('湖边树林', '步行15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2142, 117.7174, 'easy', 'hammocking'),
('山谷休憩点', '步行25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2242, 117.7274, 'medium', 'hammocking'),
('海边椰林', '步行12分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2342, 117.7374, 'easy', 'hammocking'),
('竹林深处', '步行20分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2442, 117.7474, 'easy', 'hammocking'),
('果园休息区', '步行8分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2542, 117.7574, 'easy', 'hammocking'),
('溪边柳荫', '步行18分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2642, 117.7674, 'easy', 'hammocking'),
('山坡松林', '步行30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2742, 117.7774, 'medium', 'hammocking'),
('花园凉亭', '步行6分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2842, 117.7874, 'easy', 'hammocking'),
('古寺后院', '步行22分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.2942, 117.7974, 'easy', 'hammocking');

-- 爬山 (hiking)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('龙脊山', '徒步1小时', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3042, 117.8074, 'medium', 'hiking'),
('虎啸峰', '徒步2小时', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3142, 117.8174, 'hard', 'hiking'),
('翠竹山', '徒步45分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3242, 117.8274, 'easy', 'hiking'),
('云雾山', '徒步3小时', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3342, 117.8374, 'hard', 'hiking'),
('凤凰岭', '徒步1.5小时', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3442, 117.8474, 'medium', 'hiking'),
('石门山', '徒步30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3542, 117.8574, 'easy', 'hiking'),
('天柱峰', '徒步4小时', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3642, 117.8674, 'hard', 'hiking'),
('望月山', '徒步2.5小时', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3742, 117.8774, 'hard', 'hiking'),
('青龙山', '徒步1小时', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3842, 117.8874, 'medium', 'hiking'),
('白云峰', '徒步50分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 41.3942, 117.8974, 'medium', 'hiking');

-- 沙滩 (beach)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('阳光海岸', '步行10分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.5430, 114.0560, 'easy', 'beach'),
('月牙湾', '步行15分钟', 'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.5530, 114.0660, 'easy', 'beach'),
('黄金沙滩', '步行8分钟', 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.5630, 114.0760, 'easy', 'beach'),
('珊瑚湾', '步行20分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.5730, 114.0860, 'easy', 'beach'),
('椰风海滩', '步行12分钟', 'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.5830, 114.0960, 'easy', 'beach'),
('银沙湾', '步行18分钟', 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.5930, 114.1060, 'easy', 'beach'),
('海豚湾', '步行25分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.6030, 114.1160, 'medium', 'beach'),
('贝壳海滩', '步行14分钟', 'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.6130, 114.1260, 'easy', 'beach'),
('日落海湾', '步行22分钟', 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.6230, 114.1360, 'easy', 'beach'),
('冲浪海滩', '步行16分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 22.6330, 114.1460, 'medium', 'beach');

-- 文化 (cultural)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('古城老街', '步行5分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.5670, 108.9870, 'easy', 'cultural'),
('历史博物馆', '步行8分钟', 'https://images.pexels.com/photos/1054989/pexels-photo-1054989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.5770, 108.9970, 'easy', 'cultural'),
('传统艺术中心', '步行12分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.5870, 109.0070, 'easy', 'cultural'),
('古建筑群', '步行15分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.5970, 109.0170, 'easy', 'cultural'),
('民俗文化村', '步行20分钟', 'https://images.pexels.com/photos/1054989/pexels-photo-1054989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.6070, 109.0270, 'easy', 'cultural'),
('书院遗址', '步行18分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.6170, 109.0370, 'easy', 'cultural'),
('古戏台', '步行10分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.6270, 109.0470, 'easy', 'cultural'),
('文庙', '步行14分钟', 'https://images.pexels.com/photos/1054989/pexels-photo-1054989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.6370, 109.0570, 'easy', 'cultural'),
('古塔', '步行25分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.6470, 109.0670, 'medium', 'cultural'),
('石刻艺术园', '步行16分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 34.6570, 109.0770, 'easy', 'cultural');

-- 集市 (market)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('农夫市集', '步行5分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.2340, 121.5670, 'easy', 'market'),
('夜市美食街', '步行8分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.2440, 121.5770, 'easy', 'market'),
('古玩市场', '步行10分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.2540, 121.5870, 'easy', 'market'),
('花鸟市场', '步行12分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.2640, 121.5970, 'easy', 'market'),
('手工艺品市场', '步行15分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.2740, 121.6070, 'easy', 'market'),
('海鲜市场', '步行18分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.2840, 121.6170, 'easy', 'market'),
('茶叶市场', '步行14分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.2940, 121.6270, 'easy', 'market'),
('跳蚤市场', '步行20分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.3040, 121.6370, 'easy', 'market'),
('水果批发市场', '步行16分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.3140, 121.6470, 'easy', 'market'),
('古董市场', '步行22分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 31.3240, 121.6570, 'easy', 'market');

-- 公园 (park)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('中央公园', '步行5分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9040, 116.4070, 'easy', 'park'),
('森林公园', '步行15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9140, 116.4170, 'easy', 'park'),
('湿地公园', '步行20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9240, 116.4270, 'easy', 'park'),
('植物园', '步行12分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9340, 116.4370, 'easy', 'park'),
('雕塑公园', '步行8分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9440, 116.4470, 'easy', 'park'),
('儿童公园', '步行6分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9540, 116.4570, 'easy', 'park'),
('体育公园', '步行10分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9640, 116.4670, 'easy', 'park'),
('樱花公园', '步行14分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9740, 116.4770, 'easy', 'park'),
('湖心公园', '步行18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9840, 116.4870, 'easy', 'park'),
('山地公园', '步行25分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 39.9940, 116.4970, 'medium', 'park');

-- 地方特色 (local_specialty)
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
('老字号茶馆', '步行5分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.6780, 104.0670, 'easy', 'local_specialty'),
('传统手工艺坊', '步行8分钟', 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.6880, 104.0770, 'easy', 'local_specialty'),
('特色小吃街', '步行6分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.6980, 104.0870, 'easy', 'local_specialty'),
('民间艺术馆', '步行10分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.7080, 104.0970, 'easy', 'local_specialty'),
('古法酿酒坊', '步行12分钟', 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.7180, 104.1070, 'easy', 'local_specialty'),
('传统糕点店', '步行7分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.7280, 104.1170, 'easy', 'local_specialty'),
('非遗传承馆', '步行15分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.7380, 104.1270, 'easy', 'local_specialty'),
('地方戏曲院', '步行18分钟', 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.7480, 104.1370, 'easy', 'local_specialty'),
('传统医药馆', '步行14分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.7580, 104.1470, 'easy', 'local_specialty'),
('民族服饰店', '步行9分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.7680, 104.1570, 'easy', 'local_specialty');

-- 户外目标数据 (每种活动类型对应的目标)

-- 步行探索目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('慢步观察', '以缓慢的步伐行走，仔细观察路边的植物和小动物', '保持安静，不要惊扰野生动物', 1),
('步数挑战', '完成8000步的步行目标，感受身体的活力', '穿着舒适的鞋子，保持匀速', 1),
('路径探索', '寻找一条从未走过的小径，发现新的风景', '注意安全，不要偏离主要道路太远', 2),
('晨光漫步', '在日出时分进行一次宁静的晨步', '早起需要，带上保暖衣物', 2),
('雨后漫步', '在雨后清新的空气中享受步行的乐趣', '注意路面湿滑，穿防滑鞋', 3),
('夜晚散步', '在安全的区域进行一次夜晚散步', '选择光线充足的安全区域', 3),
('冥想步行', '将步行与冥想结合，专注于每一步的感受', '放慢节奏，专注呼吸', 4),
('社交步行', '邀请朋友一起进行步行探索', '选择适合聊天的安静路线', 2),
('摄影步行', '边走边拍，记录沿途的美好瞬间', '带上相机或手机，注意构图', 3),
('历史步道', '沿着有历史意义的道路行走，了解其背景故事', '提前了解路线的历史背景', 4);

-- 自然摄影目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('微距摄影', '拍摄5张花朵或昆虫的微距照片', '使用手机的微距功能，注意光线', 1),
('光影捕捉', '拍摄3张展现光影变化的自然照片', '选择清晨或傍晚的黄金时段', 2),
('四季对比', '拍摄同一地点在不同季节的照片', '记录拍摄位置，定期回访', 3),
('动物摄影', '拍摄3种不同的野生动物照片', '保持距离，不要惊扰动物', 2),
('风景构图', '运用三分法则拍摄5张风景照片', '注意前景、中景、背景的层次', 3),
('黑白摄影', '拍摄5张黑白风格的自然照片', '关注光影对比和纹理细节', 4),
('倒影摄影', '拍摄水面倒影的完美照片', '选择无风的时段，水面平静', 2),
('日出日落', '拍摄一次完整的日出或日落过程', '提前到达，准备好拍摄位置', 3),
('全景摄影', '拍摄一张180度的全景照片', '使用手机全景模式，保持稳定', 3),
('细节特写', '拍摄10张展现自然细节的特写照片', '关注纹理、颜色、形状的变化', 4);

-- 户外冥想目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('呼吸冥想', '在自然环境中进行15分钟的呼吸冥想', '选择安静的地方，专注于呼吸节奏', 1),
('行走冥想', '进行20分钟的正念行走冥想', '每一步都要有意识，感受脚与地面的接触', 2),
('声音冥想', '聆听自然声音进行10分钟冥想', '闭上眼睛，专注于鸟鸣、风声、水声', 1),
('观察冥想', '观察一个自然物体进行冥想练习', '选择一朵花、一棵树或一块石头', 2),
('感恩冥想', '在自然中进行感恩冥想练习', '感谢大自然的馈赠和生命的美好', 3),
('身体扫描', '在户外进行全身放松的身体扫描冥想', '找一个舒适的坐姿或躺姿', 3),
('慈心冥想', '向自然万物发送慈爱的冥想练习', '培养对所有生命的慈悲心', 4),
('空性冥想', '在广阔的自然空间中体验空性冥想', '选择视野开阔的地方', 5),
('动态冥想', '结合轻柔动作的户外动态冥想', '如太极或瑜伽动作', 4),
('日出冥想', '在日出时进行迎接新一天的冥想', '早起观日出，感受新生的力量', 3);

-- 观鸟目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('鸟类识别', '识别并记录5种不同的鸟类', '使用鸟类识别app辅助学习', 1),
('鸟鸣录音', '录制3种不同鸟类的鸣叫声', '保持安静，使用手机录音功能', 2),
('鸟类摄影', '拍摄5张清晰的鸟类照片', '使用长焦镜头或手机变焦功能', 3),
('筑巢观察', '观察并记录鸟类的筑巢行为', '保持距离，不要干扰鸟类', 3),
('迁徙记录', '记录候鸟的迁徙路线和时间', '了解当地候鸟迁徙规律', 4),
('鸟类行为', '观察并记录鸟类的觅食行为', '耐心观察，记录行为特点', 2),
('早鸟观察', '在清晨观察鸟类的活动规律', '早起观鸟，活动最为频繁', 2),
('水鸟专题', '专门观察和记录水鸟的种类', '选择湖泊、河流等水域环境', 3),
('猛禽观测', '观察和识别猛禽类鸟类', '使用望远镜，注意安全距离', 4),
('鸟类栖息地', '研究不同鸟类的栖息地偏好', '对比不同环境中的鸟类分布', 5);

-- 观星目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('星座识别', '识别并记录5个主要星座', '使用星图app辅助学习', 1),
('行星观测', '观察并记录可见的行星', '了解行星的运行规律', 2),
('流星观测', '观察并记录流星的出现', '选择流星雨高峰期', 3),
('月相记录', '记录一个月内月亮的相位变化', '每晚观察并拍照记录', 2),
('银河摄影', '拍摄银河的壮丽照片', '选择无光污染的地点', 4),
('星空延时', '制作星空移动的延时摄影', '使用三脚架固定手机', 5),
('天体事件', '观察日食、月食等特殊天体事件', '提前了解天体事件时间', 4),
('星空绘图', '手绘观察到的星空图案', '准备纸笔，记录星座位置', 3),
('深空观测', '使用望远镜观测深空天体', '需要专业设备和知识', 5),
('天文摄影', '拍摄10张不同的天体照片', '学习天文摄影技巧', 4);

-- 骑行目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('距离挑战', '完成10公里的骑行距离', '保持匀速，注意补水', 1),
('爬坡挑战', '征服一个具有挑战性的上坡路段', '提前热身，控制节奏', 3),
('速度训练', '在安全路段进行速度训练', '选择平坦无车的路段', 2),
('耐力骑行', '完成1小时的连续骑行', '合理分配体力，适时休息', 3),
('风景骑行', '沿着风景优美的路线骑行', '享受沿途风景，适时停下拍照', 1),
('夜骑体验', '在安全的环境下进行夜间骑行', '确保照明设备充足，选择熟悉路线', 4),
('团队骑行', '组织或参加团队骑行活动', '注意团队协调，保持安全距离', 2),
('技巧练习', '练习骑行技巧如急转弯、刹车等', '在安全的空旷地带练习', 3),
('探索新路', '发现并骑行一条新的路线', '提前规划路线，告知他人行程', 2),
('环保骑行', '用骑行代替其他交通方式', '减少碳排放，享受绿色出行', 1);

-- 越野跑目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('地形适应', '在不同地形上进行跑步训练', '注意脚下安全，调整步伐', 2),
('耐力提升', '完成30分钟的连续越野跑', '循序渐进，不要急于求成', 3),
('坡度挑战', '征服一个陡峭的上坡跑段', '保持呼吸节奏，可以走跑结合', 3),
('技巧训练', '练习越野跑的基本技巧', '学习正确的着地方式和摆臂', 2),
('自然障碍', '跨越自然形成的障碍物', '评估风险，确保安全', 4),
('节奏控制', '保持稳定的跑步节奏', '使用心率监测，控制强度', 2),
('恢复跑', '进行轻松的恢复性越野跑', '放松心情，享受跑步过程', 1),
('间歇训练', '进行高强度间歇越野跑训练', '交替进行快跑和慢跑', 4),
('长距离跑', '挑战更长距离的越野跑', '充分准备，带好补给', 5),
('比赛准备', '为越野跑比赛进行专项训练', '制定训练计划，逐步提升', 4);

-- 寻宝目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('GPS寻宝', '使用GPS坐标找到隐藏的宝藏', '学习使用GPS设备或app', 2),
('线索解谜', '根据线索和谜题找到目标地点', '仔细分析每个线索，逻辑推理', 3),
('自然标记', '寻找自然形成的特殊标记或形状', '观察岩石、树木的特殊形状', 1),
('历史寻宝', '寻找与当地历史相关的隐藏物品', '了解当地历史背景', 4),
('团队寻宝', '与朋友组队进行寻宝活动', '分工合作，共同解决难题', 2),
('夜间寻宝', '在夜晚进行寻宝挑战', '确保安全，使用手电筒', 4),
('水下寻宝', '在浅水区寻找隐藏的物品', '注意水深和安全，可以涉水', 3),
('高空寻宝', '在高处寻找隐藏的宝藏', '注意高空安全，不要冒险', 4),
('时间限制', '在规定时间内完成寻宝任务', '合理分配时间，提高效率', 3),
('创意寻宝', '设计并隐藏自己的宝藏供他人寻找', '选择安全且有趣的隐藏地点', 5);

-- 钓鱼目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('耐心垂钓', '进行2小时的安静垂钓', '保持耐心，享受宁静时光', 1),
('鱼类识别', '识别并记录钓到的鱼类品种', '学习当地鱼类知识', 2),
('技巧练习', '练习不同的钓鱼技巧和方法', '向有经验的钓友学习', 3),
('环保钓鱼', '实践捕获后释放的环保钓鱼', '保护鱼类资源，维护生态平衡', 2),
('装备熟悉', '熟悉和维护钓鱼装备', '学习正确使用和保养钓具', 2),
('水域探索', '探索新的钓鱼水域', '了解水域特点和鱼类分布', 3),
('季节钓鱼', '根据季节调整钓鱼策略', '了解不同季节的鱼类活动规律', 4),
('夜钓体验', '尝试夜间钓鱼的独特体验', '准备照明设备，注意安全', 4),
('飞钓技术', '学习和练习飞钓技术', '需要专门的飞钓装备和技巧', 5),
('钓鱼日记', '记录每次钓鱼的详细情况', '包括天气、水温、鱼获等信息', 3);

-- 背包旅行目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('装备测试', '测试和熟悉背包旅行装备', '检查装备功能，练习使用方法', 2),
('路线规划', '规划一条1-2天的背包旅行路线', '考虑距离、难度、补给点', 3),
('野外生存', '学习基本的野外生存技能', '如搭建临时庇护所、寻找水源', 4),
('轻量化背包', '实践轻量化背包旅行理念', '精简装备，减轻负重', 3),
('导航技能', '使用地图和指南针进行导航', '学习基本的野外导航技能', 4),
('野外烹饪', '在野外准备简单的餐食', '使用便携炉具，注意防火', 3),
('天气应对', '学习应对不同天气条件', '准备相应的装备和策略', 4),
('安全意识', '培养野外安全意识和应急能力', '学习急救知识，准备急救包', 4),
('环保实践', '实践无痕山林的环保理念', '不留垃圾，保护自然环境', 2),
('经验分享', '记录并分享背包旅行经验', '帮助其他人学习和改进', 5);

-- 皮划艇目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('基础划桨', '学习和练习基本的划桨技术', '保持正确姿势，节省体力', 1),
('平衡训练', '在皮划艇上练习平衡技能', '从静水开始，逐步适应', 2),
('转向技巧', '掌握皮划艇的转向和控制', '练习不同的转向方法', 2),
('救援技能', '学习水上自救和互救技能', '了解翻船后的应对方法', 4),
('长距离划行', '完成5公里的划行距离', '合理分配体力，适时休息', 3),
('激流体验', '在安全的激流中体验刺激', '必须有专业指导和安全装备', 5),
('探索水道', '探索未知的水道和河流', '提前了解水域情况', 4),
('野生动物观察', '在划行中观察水鸟和水生动物', '保持距离，不要惊扰动物', 2),
('水上摄影', '在皮划艇上拍摄水景照片', '注意设备防水，保持平衡', 3),
('团队协作', '参与多人皮划艇活动', '学习团队配合和沟通', 3);

-- 定向越野目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('地图阅读', '学习阅读地形图和等高线', '理解地图符号和比例尺', 2),
('指南针使用', '掌握指南针的正确使用方法', '学习方位角和三角定位', 2),
('检查点寻找', '按顺序找到所有设定的检查点', '仔细核对坐标和地形特征', 3),
('时间管理', '在规定时间内完成定向任务', '合理分配时间，选择最优路线', 3),
('地形判断', '根据地形特征判断当前位置', '观察周围地形，对照地图', 4),
('路线选择', '选择最优的行进路线', '考虑地形、距离、难度等因素', 4),
('夜间定向', '在夜间进行定向越野挑战', '使用头灯，注意安全', 5),
('团队定向', '参与团队定向越野比赛', '分工合作，发挥各自优势', 3),
('精确导航', '提高导航的精确度和速度', '练习快速读图和判断', 4),
('野外求生', '结合定向技能进行野外求生训练', '学习在迷路时的应对方法', 5);

-- 野外采摘目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('可食植物识别', '学习识别3种可食用的野生植物', '确保准确识别，避免有毒植物', 3),
('季节采摘', '根据季节采摘相应的野生食材', '了解不同季节的采摘时机', 2),
('蘑菇采集', '在专业指导下采集可食用蘑菇', '必须有专业知识，避免毒蘑菇', 5),
('药用植物', '识别和采集常见的药用植物', '学习植物的药用价值和使用方法', 4),
('可持续采摘', '实践可持续的采摘方法', '不过度采摘，保护植物资源', 3),
('野菜料理', '将采摘的野菜制作成简单料理', '学习野菜的处理和烹饪方法', 4),
('种子收集', '收集野生植物的种子', '了解种子的保存和种植方法', 2),
('植物标本', '制作采摘植物的标本', '学习植物标本的制作技巧', 3),
('生态观察', '观察植物的生长环境和生态关系', '理解植物与环境的相互作用', 4),
('知识分享', '分享野外采摘的知识和经验', '教育他人安全采摘的重要性', 5);

-- 吊床休闲目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('吊床搭建', '学习正确搭建和使用吊床', '选择合适的树木，检查安全性', 1),
('自然阅读', '在吊床上阅读自然相关的书籍', '享受在自然中阅读的乐趣', 1),
('冥想放松', '在吊床上进行放松冥想', '感受微风轻拂，聆听自然声音', 2),
('观察天空', '躺在吊床上观察天空的变化', '观察云朵形状、鸟类飞行', 1),
('午睡体验', '在自然环境中享受午睡时光', '选择安全舒适的地点', 1),
('日记写作', '在吊床上写下自然体验日记', '记录感受和观察到的事物', 2),
('音乐欣赏', '在自然中欣赏轻柔的音乐', '选择与自然和谐的音乐', 2),
('摄影创作', '从吊床的角度拍摄独特照片', '尝试不同的拍摄角度', 3),
('社交分享', '邀请朋友一起享受吊床时光', '分享放松的快乐时光', 2),
('季节体验', '在不同季节体验吊床休闲', '感受四季变化的不同魅力', 3);

-- 爬山目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('登顶挑战', '成功登上山顶并拍照留念', '量力而行，注意安全', 2),
('路线探索', '探索一条新的登山路线', '提前了解路况，告知他人行程', 3),
('日出登山', '早起登山观看日出', '准备头灯，注意保暖', 3),
('摄影登山', '在登山过程中拍摄风景照片', '注意构图，记录美好瞬间', 2),
('体能挑战', '挑战个人的登山体能极限', '循序渐进，不要勉强', 4),
('植物观察', '在登山过程中观察高山植物', '了解不同海拔的植物分布', 3),
('地质学习', '观察和学习山体的地质结构', '了解岩石类型和形成过程', 4),
('野生动物', '寻找和观察山区的野生动物', '保持距离，不要喂食', 3),
('团队登山', '与朋友一起进行团队登山', '互相照应，确保安全', 2),
('技能提升', '学习登山技巧和安全知识', '掌握基本的登山技能', 4);

-- 沙滩目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('贝壳收集', '收集5种不同形状和颜色的贝壳', '只收集空贝壳，保护海洋生物', 1),
('沙滩漫步', '沿着海岸线进行长距离漫步', '注意潮汐变化，穿合适的鞋子', 1),
('日落观赏', '在沙滩上观赏壮丽的海上日落', '提前到达，选择最佳观赏位置', 1),
('沙雕创作', '用沙子创作简单的艺术作品', '发挥创意，享受创作过程', 2),
('海浪观察', '观察和记录海浪的规律', '了解潮汐和海浪的形成', 2),
('海鸟观察', '观察海边的鸟类活动', '使用望远镜，记录鸟类行为', 3),
('海滩清洁', '参与海滩环保清洁活动', '保护海洋环境，清理垃圾', 2),
('水上运动', '尝试简单的水上运动', '如冲浪板、游泳等，注意安全', 4),
('海洋摄影', '拍摄海洋和海滩的美丽照片', '利用光线和构图技巧', 3),
('潮池探索', '探索潮池中的海洋生物', '小心观察，不要破坏生态', 3);

-- 文化目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('历史探访', '参观当地的历史遗迹和古建筑', '了解历史背景，尊重文化遗产', 1),
('文化体验', '参与当地的传统文化活动', '积极参与，体验文化魅力', 2),
('艺术欣赏', '欣赏当地的传统艺术作品', '了解艺术背景和创作技法', 2),
('手工艺学习', '学习一项传统手工艺技能', '虚心请教，动手实践', 3),
('文化摄影', '拍摄反映当地文化特色的照片', '捕捉文化元素和人文风情', 3),
('语言学习', '学习当地的方言或传统用语', '与当地人交流，了解语言文化', 4),
('节庆参与', '参与当地的传统节庆活动', '了解节庆意义，感受节日氛围', 3),
('文化交流', '与当地文化传承人交流', '学习传统文化的传承和发展', 4),
('文献研究', '研究当地的文化历史文献', '深入了解文化内涵', 5),
('文化传播', '向他人介绍学到的文化知识', '成为文化传播的使者', 4);

-- 集市目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('市场探索', '逛遍整个市场，了解商品种类', '与摊主交流，了解商品来源', 1),
('美食品尝', '品尝3种不同的当地特色小吃', '注意食品卫生，适量品尝', 1),
('价格比较', '比较同类商品在不同摊位的价格', '学习讨价还价的技巧', 2),
('文化交流', '与摊主交流，了解当地文化', '尊重当地习俗，友善交流', 2),
('摄影记录', '拍摄市场的热闹场景和特色商品', '征得摊主同意后拍照', 2),
('手工艺品', '寻找和购买当地的手工艺品', '了解制作工艺和文化意义', 3),
('季节特产', '寻找当季的特色农产品', '了解农产品的种植和收获时节', 2),
('社交互动', '与其他顾客交流购物心得', '分享发现和推荐', 3),
('历史了解', '了解市场的历史和发展', '询问老摊主关于市场的故事', 4),
('环保购物', '使用环保袋，减少塑料使用', '践行绿色消费理念', 2);

-- 公园目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('植物观察', '观察并记录公园内的植物种类', '使用植物识别app辅助学习', 1),
('健身锻炼', '利用公园设施进行健身锻炼', '选择适合自己的运动强度', 1),
('野餐体验', '在公园内享受户外野餐', '准备食物和野餐垫，注意清洁', 1),
('儿童互动', '与孩子一起在公园玩耍', '享受亲子时光，注意安全', 2),
('晨练参与', '参与公园内的晨练活动', '如太极、广场舞等', 2),
('宠物遛弯', '带宠物在公园内散步', '遵守公园规定，清理宠物粪便', 2),
('艺术欣赏', '欣赏公园内的雕塑和艺术装置', '了解艺术作品的创作背景', 2),
('生态学习', '学习公园的生态系统', '观察动植物的相互关系', 3),
('志愿服务', '参与公园的志愿服务活动', '如环境清洁、植物养护', 3),
('活动组织', '在公园组织小型聚会或活动', '遵守公园规定，不影响他人', 4);

-- 地方特色目标
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
('特色美食', '品尝当地最具代表性的特色美食', '寻找地道的老店，体验正宗口味', 1),
('手工艺体验', '学习当地的传统手工艺制作', '虚心学习，感受匠人精神', 3),
('方言学习', '学习几句当地的方言用语', '与当地人交流，增进了解', 2),
('民俗参与', '参与当地的民俗活动或仪式', '尊重传统，积极参与', 3),
('特产购买', '购买当地的特色产品作为纪念', '了解产品特点和制作工艺', 2),
('老店探访', '寻找并探访当地的百年老店', '了解老店的历史和传承', 3),
('文化故事', '收集当地的文化故事和传说', '与老人交流，记录珍贵故事', 4),
('建筑欣赏', '欣赏当地特色的建筑风格', '了解建筑的历史和特点', 2),
('节庆体验', '参与当地的传统节庆活动', '感受节日的欢乐氛围', 3),
('文化传承', '学习并传承当地的文化技艺', '成为文化传承的一份子', 5);

-- 社交目标数据
INSERT INTO social_goals_data (title, description, tips, min_user_level) VALUES
('分享发现', '在社区分享今日的探索发现和感受', '用真诚的文字和照片记录体验', 1),
('邀请朋友', '邀请一位朋友参与明日的户外活动', '分享户外探索的乐趣', 1),
('经验交流', '与其他探索者交流户外经验', '学习他人的经验和技巧', 2),
('新手帮助', '帮助一位新手完成他们的首次任务', '耐心指导，分享经验', 3),
('团队组建', '组建一个户外探索小团队', '寻找志同道合的伙伴', 3),
('活动策划', '策划一次小型的户外聚会活动', '考虑安全和参与者需求', 4),
('知识分享', '分享户外相关的知识和技能', '如植物识别、摄影技巧等', 3),
('安全宣传', '向他人宣传户外安全知识', '提高大家的安全意识', 3),
('环保倡导', '倡导和实践环保的户外理念', '影响他人保护自然环境', 4),
('社区建设', '为户外社区的建设贡献力量', '积极参与社区活动和讨论', 4),
('导师角色', '成为新手的户外活动导师', '传授经验，指导新人', 5),
('文化推广', '推广当地的户外文化和传统', '让更多人了解和参与', 4),
('创新活动', '创新户外活动的形式和内容', '为社区带来新的活动体验', 5),
('国际交流', '与来自不同地区的户外爱好者交流', '分享不同地区的户外文化', 5),
('公益参与', '参与户外相关的公益活动', '如环境保护、教育推广等', 4);

-- 准备物品数据
INSERT INTO preparation_items_data (item_text, min_difficulty_level, applicable_weather) VALUES
-- 基础物品
('手机充电至少80%', 'easy', NULL),
('穿着舒适的运动鞋', 'easy', NULL),
('携带足够的饮用水', 'easy', NULL),
('随身携带纸巾和湿巾', 'easy', NULL),
('准备小食或能量棒', 'easy', NULL),
('携带垃圾袋保护环境', 'easy', NULL),
('穿着适合活动的服装', 'easy', NULL),
('携带身份证件', 'easy', NULL),
('准备少量现金', 'easy', NULL),
('告知家人出行计划', 'easy', NULL),

-- 天气相关
('涂抹防晒霜', 'easy', 'sunny'),
('佩戴遮阳帽', 'easy', 'sunny'),
('携带太阳镜', 'easy', 'sunny'),
('准备防晒衣', 'medium', 'sunny'),
('携带雨伞或雨衣', 'easy', 'rainy'),
('穿着防水鞋', 'easy', 'rainy'),
('准备防水袋保护物品', 'medium', 'rainy'),
('携带保温杯', 'easy', 'cold'),
('穿着保暖衣物', 'easy', 'cold'),
('准备暖宝宝', 'medium', 'cold'),

-- 中级装备
('携带急救包', 'medium', NULL),
('准备手电筒或头灯', 'medium', NULL),
('携带多功能工具刀', 'medium', NULL),
('准备备用电池或充电宝', 'medium', NULL),
('携带地图和指南针', 'medium', NULL),
('准备防虫喷雾', 'medium', NULL),
('携带望远镜', 'medium', NULL),
('准备相机或拍照设备', 'medium', NULL),
('携带登山杖', 'medium', NULL),
('准备防滑手套', 'medium', NULL),

-- 高级装备
('携带专业登山装备', 'hard', NULL),
('准备野外生存工具', 'hard', NULL),
('携带卫星通讯设备', 'hard', NULL),
('准备专业摄影器材', 'hard', NULL),
('携带测量仪器', 'hard', NULL),
('准备野外烹饪用具', 'hard', NULL),
('携带帐篷和睡袋', 'hard', NULL),
('准备攀岩装备', 'hard', NULL),
('携带水上运动装备', 'hard', NULL),
('准备专业导航设备', 'hard', NULL);

-- 安全提示数据
INSERT INTO safety_tips_data (tip_text, applicable_destination_type, applicable_weather) VALUES
-- 通用安全提示
('告知家人或朋友你的出行计划和预计返回时间', NULL, NULL),
('保持手机电量充足，确保能够联系外界', NULL, NULL),
('随时注意周围环境，保持警觉', NULL, NULL),
('不要独自前往偏远或危险区域', NULL, NULL),
('遵守当地的法律法规和景区规定', NULL, NULL),
('保护自然环境，不要留下垃圾', NULL, NULL),
('尊重野生动物，保持安全距离', NULL, NULL),
('如遇紧急情况立即拨打救援电话', NULL, NULL),
('准备基本的急救知识和用品', NULL, NULL),
('根据个人体能选择合适的活动强度', NULL, NULL),

-- 天气相关安全提示
('注意防晒，避免长时间暴露在强烈阳光下', NULL, 'sunny'),
('及时补充水分，预防中暑', NULL, 'sunny'),
('寻找阴凉处休息，避免过度疲劳', NULL, 'sunny'),
('注意路面湿滑，小心行走', NULL, 'rainy'),
('避免在雷雨天气进行户外活动', NULL, 'rainy'),
('准备防水装备，保护电子设备', NULL, 'rainy'),
('注意保暖，预防感冒', NULL, 'cold'),
('小心结冰路面，穿着防滑鞋', NULL, 'cold'),
('缩短户外活动时间，避免冻伤', NULL, 'cold'),

-- 地点类型相关安全提示
('注意山路崎岖，小心脚下安全', 'hiking', NULL),
('不要偏离标记路径，避免迷路', 'hiking', NULL),
('注意高原反应，量力而行', 'hiking', NULL),
('小心潮汐变化，注意涨潮时间', 'beach', NULL),
('注意海浪强度，不要过于靠近海边', 'beach', NULL),
('防止晒伤，海边紫外线较强', 'beach', NULL),
('注意水深变化，不要贸然下水', 'kayaking', NULL),
('穿着救生衣，确保水上安全', 'kayaking', NULL),
('了解水流情况，避免危险水域', 'kayaking', NULL),
('保管好个人财物，注意防盗', 'market', NULL),
('注意食品卫生，选择干净的摊位', 'market', NULL),
('遵守市场秩序，不要拥挤推搡', 'market', NULL),
('尊重文化传统，不要随意触摸文物', 'cultural', NULL),
('保持安静，不要大声喧哗', 'cultural', NULL),
('遵守参观规定，不要拍照禁止区域', 'cultural', NULL),
('注意公园开放时间，避免夜间独行', 'park', NULL),
('爱护公园设施，不要破坏植物', 'park', NULL),
('遵守公园规定，不要在禁止区域活动', 'park', NULL),
('使用专业装备，确保定向安全', 'orienteering', NULL),
('携带通讯设备，保持联系', 'orienteering', NULL),
('了解地形特点，避免危险区域', 'orienteering', NULL);