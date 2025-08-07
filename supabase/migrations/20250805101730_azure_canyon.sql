/*
  # 宁波地区专属活动数据

  1. 数据清理
    - 清空所有现有的活动相关数据
    
  2. 重新生成数据
    - 200个宁波真实目的地 (每种活动类型10个)
    - 200个对应的户外目标
    - 15个社交目标
    - 40个准备物品
    - 30个安全提示
    
  3. 活动类型覆盖
    - 步行探索、自然摄影、户外冥想、观鸟、观星
    - 骑行、越野跑、寻宝、钓鱼、背包旅行
    - 皮划艇、定向越野、野外采摘、吊床休闲、爬山
    - 沙滩、文化、集市、公园、地方特色
*/

-- 清空现有数据
TRUNCATE TABLE daily_tasks CASCADE;
TRUNCATE TABLE destinations CASCADE;
TRUNCATE TABLE outdoor_goals_data CASCADE;
TRUNCATE TABLE social_goals_data CASCADE;
TRUNCATE TABLE preparation_items_data CASCADE;
TRUNCATE TABLE safety_tips_data CASCADE;

-- 宁波地区目的地数据
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
-- 步行探索 (walking)
('月湖公园环湖步道', '步行5分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8683, 121.5440, 'easy', 'walking'),
('天一阁古建筑群', '步行8分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8750, 121.5500, 'easy', 'walking'),
('三江口滨江步道', '步行12分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8600, 121.5300, 'easy', 'walking'),
('鼓楼沿步行街', '步行6分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8720, 121.5480, 'easy', 'walking'),
('老外滩历史街区', '步行10分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8650, 121.5350, 'easy', 'walking'),
('中山公园绿道', '步行7分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8700, 121.5420, 'easy', 'walking'),
('姚江大堤步行道', '步行15分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8800, 121.5200, 'easy', 'walking'),
('日湖公园环湖径', '步行8分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8650, 121.5380, 'easy', 'walking'),
('甬江大桥观景台', '步行20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8500, 121.5100, 'medium', 'walking'),
('东钱湖环湖步道', '公交30分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'medium', 'walking'),

-- 自然摄影 (photography)
('东钱湖十里四香', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7750, 121.6150, 'easy', 'photography'),
('九峰山樱花谷', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'medium', 'photography'),
('天童寺古银杏', '公交50分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'medium', 'photography'),
('阿育王寺竹林', '公交40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7300, 121.4700, 'easy', 'photography'),
('慈城古县城', '公交60分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9800, 121.4200, 'easy', 'photography'),
('保国寺古建筑群', '公交55分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'medium', 'photography'),
('雪窦山瀑布群', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'photography'),
('四明山森林公园', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'photography'),
('梁祝文化公园', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8200, 121.6800, 'easy', 'photography'),
('鄞州公园荷花池', '公交20分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8100, 121.5800, 'easy', 'photography'),

-- 户外冥想 (meditation)
('天童禅寺静修区', '公交50分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'easy', 'meditation'),
('阿育王寺竹林深处', '公交40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7300, 121.4700, 'easy', 'meditation'),
('东钱湖湖心亭', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'meditation'),
('九峰山山顶平台', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'medium', 'meditation'),
('月湖公园湖心岛', '步行5分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8683, 121.5440, 'easy', 'meditation'),
('保国寺后山清泉', '公交55分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'medium', 'meditation'),
('四明山森林氧吧', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'meditation'),
('雪窦山妙高台', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'meditation'),
('中山公园凉亭', '步行7分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8700, 121.5420, 'easy', 'meditation'),
('日湖公园静心角', '步行8分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8650, 121.5380, 'easy', 'meditation'),

-- 观鸟 (birdwatching)
('东钱湖湿地公园', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'birdwatching'),
('杭州湾湿地观鸟区', '自驾45分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1500, 121.2000, 'medium', 'birdwatching'),
('四明山鸟类保护区', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'birdwatching'),
('姚江湿地候鸟栖息地', '公交25分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8800, 121.5200, 'easy', 'birdwatching'),
('慈湖观鸟台', '公交50分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.4500, 'easy', 'birdwatching'),
('奉化溪口鸟类观测点', '公交80分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6900, 121.4000, 'medium', 'birdwatching'),
('象山港红树林', '自驾90分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4800, 121.8500, 'hard', 'birdwatching'),
('余姚河姆渡湿地', '公交70分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'medium', 'birdwatching'),
('镇海九龙湖观鸟点', '公交40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'easy', 'birdwatching'),
('北仑春晓湿地', '公交60分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'medium', 'birdwatching'),

-- 观星 (stargazing)
('九峰山天文观测台', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'medium', 'stargazing'),
('达蓬山山顶观星点', '自驾50分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.8200, 'medium', 'stargazing'),
('四明山森林观星区', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'hard', 'stargazing'),
('象山半岛海边观星', '自驾90分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4500, 121.8800, 'hard', 'stargazing'),
('东钱湖湖心观星台', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'stargazing'),
('雪窦山妙高台夜观', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'stargazing'),
('慈城古城墙观星', '公交60分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9800, 121.4200, 'medium', 'stargazing'),
('北仑春晓海滨观星', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'medium', 'stargazing'),
('镇海九龙湖山顶', '公交40分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'stargazing'),
('奉化溪口山间空地', '公交80分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6900, 121.4000, 'medium', 'stargazing'),

-- 骑行 (cycling)
('东钱湖环湖自行车道', '公交30分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'cycling'),
('姚江绿道骑行径', '公交20分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8800, 121.5200, 'easy', 'cycling'),
('三江口滨江骑行道', '步行12分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8600, 121.5300, 'easy', 'cycling'),
('奉化江堤骑行路', '公交40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7500, 121.4200, 'medium', 'cycling'),
('慈城古镇骑行游', '公交60分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9800, 121.4200, 'easy', 'cycling'),
('象山港大桥骑行', '自驾80分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.5000, 121.8000, 'hard', 'cycling'),
('余姚四明山骑行道', '公交70分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0000, 121.2500, 'hard', 'cycling'),
('北仑滨海骑行线', '公交50分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'medium', 'cycling'),
('鄞州中心区绿道', '公交15分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8100, 121.5800, 'easy', 'cycling'),
('镇海九龙湖环湖道', '公交40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'cycling'),

-- 越野跑 (trail_running)
('九峰山越野跑道', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'hard', 'trail_running'),
('四明山森林跑道', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'hard', 'trail_running'),
('达蓬山登山跑道', '自驾50分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.8200, 'hard', 'trail_running'),
('东钱湖山地跑道', '公交35分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'medium', 'trail_running'),
('天童山森林径', '公交50分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'medium', 'trail_running'),
('雪窦山古道跑', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'trail_running'),
('保国寺后山小径', '公交55分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'medium', 'trail_running'),
('镇海九龙湖山径', '公交40分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'trail_running'),
('余姚河姆渡田野跑', '公交70分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'easy', 'trail_running'),
('北仑春晓海岸跑', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'medium', 'trail_running'),

-- 寻宝 (geocaching)
('天一阁古籍寻宝', '步行8分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8750, 121.5500, 'easy', 'geocaching'),
('月湖公园历史寻宝', '步行5分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8683, 121.5440, 'easy', 'geocaching'),
('慈城古县城寻宝', '公交60分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9800, 121.4200, 'medium', 'geocaching'),
('老外滩建筑寻宝', '步行10分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8650, 121.5350, 'easy', 'geocaching'),
('东钱湖古迹寻宝', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'medium', 'geocaching'),
('保国寺文物寻宝', '公交55分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'medium', 'geocaching'),
('河姆渡遗址寻宝', '公交70分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'hard', 'geocaching'),
('天童寺古建寻宝', '公交50分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'medium', 'geocaching'),
('雪窦山古道寻宝', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'geocaching'),
('象山渔村文化寻宝', '自驾90分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4800, 121.8500, 'medium', 'geocaching'),

-- 钓鱼 (fishing)
('东钱湖垂钓区', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'fishing'),
('姚江钓鱼台', '公交25分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8800, 121.5200, 'easy', 'fishing'),
('慈湖垂钓中心', '公交50分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.4500, 'easy', 'fishing'),
('奉化江钓鱼点', '公交40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7500, 121.4200, 'easy', 'fishing'),
('象山港海钓区', '自驾90分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4800, 121.8500, 'hard', 'fishing'),
('镇海九龙湖钓台', '公交40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'easy', 'fishing'),
('余姚河姆渡水库', '公交70分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'medium', 'fishing'),
('北仑春晓海钓点', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'medium', 'fishing'),
('四明山溪流钓点', '自驾60分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'fishing'),
('日湖公园钓鱼区', '步行8分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8650, 121.5380, 'easy', 'fishing'),

-- 背包旅行 (backpacking)
('四明山野营基地', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'hard', 'backpacking'),
('雪窦山露营区', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'backpacking'),
('象山半岛海边露营', '自驾90分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4500, 121.8800, 'hard', 'backpacking'),
('东钱湖山间小屋', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'medium', 'backpacking'),
('天童山后山营地', '公交50分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'medium', 'backpacking'),
('达蓬山户外基地', '自驾50分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.8200, 'medium', 'backpacking'),
('余姚四明山小木屋', '公交70分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0000, 121.2500, 'hard', 'backpacking'),
('奉化溪口山间驿站', '公交80分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6900, 121.4000, 'medium', 'backpacking'),
('北仑春晓海边帐篷区', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'medium', 'backpacking'),
('镇海九龙湖露营地', '公交40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'backpacking'),

-- 皮划艇 (kayaking)
('东钱湖皮划艇基地', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'medium', 'kayaking'),
('姚江皮划艇体验区', '公交25分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8800, 121.5200, 'easy', 'kayaking'),
('奉化江划艇俱乐部', '公交40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7500, 121.4200, 'medium', 'kayaking'),
('象山港海上皮划艇', '自驾90分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4800, 121.8500, 'hard', 'kayaking'),
('慈湖皮划艇训练场', '公交50分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.4500, 'easy', 'kayaking'),
('镇海九龙湖划艇区', '公交40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'kayaking'),
('北仑春晓海湾划艇', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'hard', 'kayaking'),
('余姚河姆渡水道', '公交70分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'medium', 'kayaking'),
('四明湖皮划艇中心', '自驾60分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'kayaking'),
('甬江入海口划艇', '公交30分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8400, 121.5600, 'medium', 'kayaking'),

-- 定向越野 (orienteering)
('九峰山定向越野场', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'hard', 'orienteering'),
('四明山森林定向区', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'hard', 'orienteering'),
('东钱湖定向公园', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'medium', 'orienteering'),
('达蓬山定向基地', '自驾50分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.8200, 'hard', 'orienteering'),
('天童山定向训练场', '公交50分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'medium', 'orienteering'),
('保国寺山林定向', '公交55分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'medium', 'orienteering'),
('雪窦山古道定向', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'orienteering'),
('镇海九龙湖定向点', '公交40分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'orienteering'),
('余姚河姆渡田野定向', '公交70分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'medium', 'orienteering'),
('北仑春晓海岸定向', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'hard', 'orienteering'),

-- 野外采摘 (foraging)
('四明山野果采摘区', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'foraging'),
('东钱湖山野菜园', '公交35分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'foraging'),
('九峰山蘑菇森林', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'medium', 'foraging'),
('天童山药材采集区', '公交50分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'hard', 'foraging'),
('雪窦山野生茶园', '公交90分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'foraging'),
('余姚河姆渡野菜地', '公交70分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'easy', 'foraging'),
('奉化溪口竹笋林', '公交80分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6900, 121.4000, 'medium', 'foraging'),
('保国寺山野花园', '公交55分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'easy', 'foraging'),
('镇海九龙湖山野', '公交40分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'foraging'),
('北仑春晓海边野菜', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'easy', 'foraging'),

-- 吊床休闲 (hammocking)
('东钱湖林间空地', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'hammocking'),
('九峰山山谷休憩点', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'medium', 'hammocking'),
('四明山森林吊床区', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'hammocking'),
('天童寺后山树林', '公交50分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'easy', 'hammocking'),
('月湖公园湖边树荫', '步行5分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8683, 121.5440, 'easy', 'hammocking'),
('雪窦山溪边平台', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'medium', 'hammocking'),
('保国寺竹林深处', '公交55分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'easy', 'hammocking'),
('象山半岛海边椰林', '自驾90分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4500, 121.8800, 'easy', 'hammocking'),
('镇海九龙湖湖边', '公交40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'easy', 'hammocking'),
('中山公园古树下', '步行7分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8700, 121.5420, 'easy', 'hammocking'),

-- 爬山 (hiking)
('九峰山主峰', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'hard', 'hiking'),
('达蓬山登山径', '自驾50分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9500, 121.8200, 'hard', 'hiking'),
('雪窦山千丈岩', '公交90分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'hard', 'hiking'),
('四明山主峰', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'hard', 'hiking'),
('天童山登山道', '公交50分钟', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'medium', 'hiking'),
('阿育王山', '公交40分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7300, 121.4700, 'medium', 'hiking'),
('镇海九龙山', '公交40分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'medium', 'hiking'),
('余姚龙山', '公交70分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0000, 121.2500, 'hard', 'hiking'),
('北仑春晓山', '公交60分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'medium', 'hiking'),
('奉化商量岗', '公交80分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6900, 121.4000, 'hard', 'hiking'),

-- 沙滩 (beach)
('象山松兰山海滩', '自驾90分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4500, 121.8800, 'easy', 'beach'),
('象山石浦渔港海滩', '自驾100分钟', 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2000, 121.9500, 'easy', 'beach'),
('北仑春晓海滩', '公交60分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9000, 121.8000, 'easy', 'beach'),
('象山黄金海岸', '自驾85分钟', 'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4800, 121.8500, 'easy', 'beach'),
('象山檀头山海滩', '自驾95分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3500, 121.9000, 'medium', 'beach'),
('宁海强蛟海滩', '自驾70分钟', 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3800, 121.7500, 'easy', 'beach'),
('象山大目湾海滩', '自驾110分钟', 'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.1500, 121.9800, 'medium', 'beach'),
('北仑梅山海滩', '公交70分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8500, 121.8500, 'easy', 'beach'),
('象山鹤浦海滩', '自驾105分钟', 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2500, 121.9200, 'medium', 'beach'),
('宁海桑洲海滩', '自驾80分钟', 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3000, 121.7000, 'easy', 'beach'),

-- 文化 (cultural)
('天一阁博物馆', '步行8分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8750, 121.5500, 'easy', 'cultural'),
('慈城古县城', '公交60分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9800, 121.4200, 'easy', 'cultural'),
('河姆渡遗址博物馆', '公交70分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'medium', 'cultural'),
('宁波博物馆', '公交20分钟', 'https://images.pexels.com/photos/1054989/pexels-photo-1054989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8100, 121.5800, 'easy', 'cultural'),
('老外滩历史建筑群', '步行10分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8650, 121.5350, 'easy', 'cultural'),
('保国寺古建筑', '公交55分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7400, 121.4600, 'medium', 'cultural'),
('天童禅寺', '公交50分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7100, 121.4500, 'easy', 'cultural'),
('阿育王寺', '公交40分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7300, 121.4700, 'easy', 'cultural'),
('雪窦寺弥勒大佛', '公交90分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6800, 121.1500, 'medium', 'cultural'),
('宁海前童古镇', '自驾60分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3500, 121.4000, 'medium', 'cultural'),

-- 集市 (market)
('城隍庙小商品市场', '步行15分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8700, 121.5500, 'easy', 'market'),
('和义大道夜市', '公交10分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8600, 121.5400, 'easy', 'market'),
('鼓楼沿古玩市场', '步行6分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8720, 121.5480, 'easy', 'market'),
('慈城古镇集市', '公交60分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9800, 121.4200, 'easy', 'market'),
('余姚河姆渡农贸市场', '公交70分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'easy', 'market'),
('奉化溪口特产市场', '公交80分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6900, 121.4000, 'easy', 'market'),
('象山石浦海鲜市场', '自驾100分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2000, 121.9500, 'medium', 'market'),
('宁海前童古镇集市', '自驾60分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3500, 121.4000, 'easy', 'market'),
('镇海骆驼农贸市场', '公交30分钟', 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9300, 121.6500, 'easy', 'market'),
('北仑新碶夜市', '公交50分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9100, 121.7800, 'easy', 'market'),

-- 公园 (park)
('月湖公园', '步行5分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8683, 121.5440, 'easy', 'park'),
('中山公园', '步行7分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8700, 121.5420, 'easy', 'park'),
('日湖公园', '步行8分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8650, 121.5380, 'easy', 'park'),
('鄞州公园', '公交20分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8100, 121.5800, 'easy', 'park'),
('东钱湖湿地公园', '公交35分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7800, 121.6200, 'easy', 'park'),
('梁祝文化公园', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8200, 121.6800, 'easy', 'park'),
('九峰山森林公园', '公交45分钟', 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7200, 121.4800, 'medium', 'park'),
('四明山森林公园', '自驾60分钟', 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6500, 121.2000, 'medium', 'park'),
('镇海九龙湖公园', '公交40分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9200, 121.7200, 'easy', 'park'),
('北仑中河公园', '公交45分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9100, 121.7500, 'easy', 'park'),

-- 地方特色 (local_specialty)
('缸鸭狗汤圆店', '步行10分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8700, 121.5450, 'easy', 'local_specialty'),
('状元楼酒店', '步行12分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8680, 121.5420, 'easy', 'local_specialty'),
('奉化千层饼老店', '公交80分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6900, 121.4000, 'easy', 'local_specialty'),
('余姚榨菜博物馆', '公交70分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0300, 121.1800, 'easy', 'local_specialty'),
('象山海鲜大排档', '自驾90分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4800, 121.8500, 'easy', 'local_specialty'),
('慈城年糕工坊', '公交60分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9800, 121.4200, 'easy', 'local_specialty'),
('宁海望海茶庄', '自驾70分钟', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3800, 121.7500, 'easy', 'local_specialty'),
('北仑港式茶餐厅', '公交50分钟', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9100, 121.7800, 'easy', 'local_specialty'),
('镇海蛟川走马塘', '公交35分钟', 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9400, 121.6800, 'easy', 'local_specialty'),
('鄞州雅戈尔动物园', '公交25分钟', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8200, 121.6500, 'easy', 'local_specialty');

-- 户外目标数据 (200个，每种活动类型10个)
INSERT INTO outdoor_goals_data (title, description, tips, min_user_level) VALUES
-- 步行探索目标
('月湖环湖漫步', '沿着月湖完整走一圈，感受湖光山色和历史文化氛围', '选择清晨或傍晚时分，光线最美，游人较少', 1),
('天一阁文化探索', '参观天一阁，了解中国古代藏书文化，拍摄古建筑细节', '提前了解开放时间，尊重文物保护规定', 1),
('三江口观景漫步', '在三江汇流处漫步，观察甬江、姚江、奉化江的交汇景象', '注意安全，不要靠近水边护栏', 1),
('老外滩历史寻踪', '沿着老外滩步行，寻找历史建筑和文化遗迹', '了解每栋建筑的历史背景，拍照记录', 2),
('鼓楼沿文化街漫游', '在鼓楼沿步行街感受宁波传统商业文化', '品尝当地小吃，观察传统建筑风格', 1),
('中山公园晨练观察', '在中山公园观察晨练人群，体验当地生活节奏', '早起参与，感受宁波人的生活方式', 1),
('姚江大堤风光徒步', '沿着姚江大堤步行，欣赏江景和城市天际线', '选择天气晴朗的日子，带上相机', 2),
('日湖公园生态观察', '在日湖公园观察水鸟和植物生态', '保持安静，不要惊扰野生动物', 1),
('甬江大桥观景体验', '登上甬江大桥观景台，俯瞰宁波全景', '注意安全，选择视野开阔的时间段', 3),
('东钱湖环湖健步走', '完成东钱湖环湖步道的一段，感受湖光山色', '准备充足的水和防晒用品', 2),

-- 自然摄影目标
('东钱湖四季摄影', '在东钱湖拍摄反映当前季节特色的5张照片', '关注光影变化，捕捉湖水倒影', 1),
('九峰山樱花摄影', '在九峰山樱花谷拍摄樱花盛开的美景', '选择樱花季节，注意构图和背景', 2),
('天童寺古建摄影', '拍摄天童寺的古建筑细节和整体布局', '尊重宗教场所，避免使用闪光灯', 2),
('阿育王寺竹林光影', '在阿育王寺竹林中拍摄光影交错的画面', '选择阳光透过竹叶的时刻', 3),
('慈城古建筑群摄影', '拍摄慈城古县城的传统建筑和街巷风貌', '注意保护文物，展现古城韵味', 2),
('保国寺建筑艺术', '拍摄保国寺独特的建筑结构和雕刻艺术', '了解建筑历史，突出艺术特色', 3),
('雪窦山瀑布摄影', '拍摄雪窦山瀑布的壮观景象', '注意安全，使用三脚架稳定拍摄', 4),
('四明山森林微距', '在四明山森林中进行微距摄影，拍摄植物和昆虫', '携带微距镜头或手机微距功能', 3),
('梁祝公园人文摄影', '在梁祝文化公园拍摄文化景观和游客互动', '尊重他人隐私，征得同意后拍摄', 2),
('鄞州公园荷花摄影', '在鄞州公园荷花池拍摄荷花的不同姿态', '选择荷花盛开的季节，清晨拍摄最佳', 2),

-- 户外冥想目标
('天童禅寺静心冥想', '在天童禅寺的静修区进行30分钟冥想', '保持安静，尊重宗教环境', 1),
('阿育王寺竹林冥想', '在竹林深处找一个安静角落，进行自然冥想', '选择人少的时间，带上坐垫', 1),
('东钱湖湖心冥想', '在东钱湖湖心亭进行水边冥想', '感受湖水的宁静，专注呼吸', 2),
('九峰山山顶冥想', '在九峰山山顶平台进行高山冥想', '选择天气晴朗的日子，注意保暖', 3),
('月湖湖心岛冥想', '在月湖湖心岛进行湖心冥想', '感受城市中的宁静绿洲', 1),
('保国寺后山冥想', '在保国寺后山清泉边进行自然冥想', '聆听流水声，放松身心', 2),
('四明山森林冥想', '在四明山森林氧吧进行森林浴冥想', '深呼吸，感受负离子的清新', 2),
('雪窦山妙高台冥想', '在雪窦山妙高台进行高山禅修', '体验佛教文化与自然的融合', 4),
('中山公园晨间冥想', '在中山公园凉亭进行晨间冥想', '配合晨练人群的节奏，感受生活气息', 1),
('日湖公园静心冥想', '在日湖公园静心角进行湖边冥想', '观察水面波纹，平静内心', 1),

-- 观鸟目标
('东钱湖湿地观鸟', '在东钱湖湿地公园观察并记录5种不同的鸟类', '携带望远镜，保持安静距离', 1),
('杭州湾候鸟观察', '在杭州湾湿地观察迁徙候鸟，了解鸟类习性', '选择候鸟迁徙季节，早晨观察最佳', 3),
('四明山鸟类调查', '在四明山鸟类保护区进行鸟类种类调查', '记录鸟类名称、数量和行为特征', 3),
('姚江湿地鸟类摄影', '在姚江湿地拍摄鸟类生活照片', '使用长焦镜头，不要惊扰鸟类', 2),
('慈湖水鸟观察', '在慈湖观鸟台观察水鸟的觅食和栖息行为', '了解不同水鸟的生活习性', 2),
('奉化溪口山鸟寻踪', '在奉化溪口山区寻找和观察山地鸟类', '注意听鸟鸣声，学会通过声音识别鸟类', 3),
('象山港红树林鸟类', '在象山港红树林观察特有的湿地鸟类', '了解红树林生态系统', 4),
('余姚河姆渡鸟类普查', '在余姚河姆渡湿地进行鸟类种类普查', '制作观鸟记录表，科学记录', 3),
('镇海九龙湖鸟类摄影', '在镇海九龙湖拍摄鸟类生态照片', '选择合适的拍摄角度和时机', 2),
('北仑春晓海鸟观察', '在北仑春晓观察海鸟的飞行和觅食', '了解海鸟与陆鸟的区别', 2),

-- 观星目标
('九峰山星空摄影', '在九峰山天文观测台拍摄星空照片', '选择无月夜晚，使用三脚架长曝光', 3),
('达蓬山星座识别', '在达蓬山山顶识别并记录5个星座', '下载星图APP，学习星座知识', 2),
('四明山银河观测', '在四明山观测银河，了解银河系结构', '选择夏季晴朗夜晚，远离光污染', 4),
('象山海边观星', '在象山半岛海边观察海上星空', '感受海天一色的壮观景象', 3),
('东钱湖月相观察', '在东钱湖观察月相变化，记录月亮形状', '连续观察几个晚上，了解月相周期', 1),
('雪窦山流星观测', '在雪窦山妙高台观测流星雨', '查询流星雨时间，准备观测设备', 4),
('慈城古城夜空', '在慈城古县城观察古建筑与星空的结合', '拍摄古建筑剪影与星空的对比', 3),
('北仑海边星轨', '在北仑春晓海滨拍摄星轨照片', '使用长时间曝光技术', 4),
('镇海九龙湖观星', '在镇海九龙湖山顶进行星空观测', '选择视野开阔的位置', 2),
('奉化溪口夜观', '在奉化溪口山间观察夜空中的亮星', '学习识别主要的亮星和星座', 2),

-- 骑行目标
('东钱湖环湖骑行', '完成东钱湖环湖自行车道的完整骑行', '控制骑行速度，欣赏沿途风景', 2),
('姚江绿道探索', '沿着姚江绿道骑行，探索沿江风光', '注意交通安全，遵守骑行规则', 1),
('三江口骑行摄影', '在三江口滨江骑行道边骑边拍', '准备好相机，记录骑行沿途美景', 2),
('奉化江堤骑行挑战', '完成奉化江堤骑行路的长距离骑行', '准备充足的水和能量补给', 3),
('慈城古镇文化骑行', '骑行游览慈城古镇，体验古城文化', '慢速骑行，细细品味古镇韵味', 2),
('象山港大桥骑行', '挑战象山港大桥的骑行路线', '注意风力影响，确保安全', 4),
('余姚四明山山地骑行', '在余姚四明山进行山地自行车骑行', '检查车况，准备山地骑行装备', 4),
('北仑滨海骑行', '沿着北仑滨海线进行海景骑行', '感受海风，欣赏海岸线风光', 3),
('鄞州绿道休闲骑行', '在鄞州中心区绿道进行休闲骑行', '享受城市绿道的便利和美景', 1),
('镇海九龙湖骑行', '环绕镇海九龙湖进行环湖骑行', '观察湖光山色，体验自然之美', 2),

-- 越野跑目标
('九峰山登山跑', '完成九峰山越野跑道的登山跑挑战', '控制配速，注意安全，循序渐进', 4),
('四明山森林越野', '在四明山森林跑道进行越野跑训练', '穿着专业跑鞋，注意路面状况', 4),
('达蓬山山地跑', '挑战达蓬山登山跑道的陡峭路段', '做好热身，准备充足的水分补给', 4),
('东钱湖山地越野', '在东钱湖山地跑道进行越野跑体验', '享受山地跑的乐趣，挑战自我', 3),
('天童山森林跑', '在天童山森林径进行自然越野跑', '感受森林氧吧，呼吸新鲜空气', 3),
('雪窦山古道跑', '沿着雪窦山古道进行历史文化越野跑', '了解古道历史，边跑边学习', 4),
('保国寺山径探索跑', '在保国寺后山小径进行探索性越野跑', '发现隐藏的山径和景点', 3),
('镇海九龙湖山地跑', '在镇海九龙湖山径进行山地越野跑', '挑战不同难度的山地路段', 3),
('余姚田野越野跑', '在余姚河姆渡田野进行乡村越野跑', '体验田园风光，感受乡村气息', 2),
('北仑海岸越野跑', '在北仑春晓海岸进行海边越野跑', '感受海风，挑战沙地跑步', 3),

-- 寻宝目标
('天一阁文化寻宝', '在天一阁寻找5个历史文化相关的"宝藏"线索', '了解藏书文化，寻找历史故事', 2),
('月湖历史遗迹寻宝', '在月湖公园寻找历史遗迹和文化标识', '学习宁波历史，发现隐藏的故事', 1),
('慈城古县城探宝', '在慈城古县城寻找古代建筑和文物线索', '了解古代县城文化，寻找历史印记', 3),
('老外滩建筑寻宝', '在老外滩寻找不同时期的建筑风格', '对比中西建筑特色，发现历史变迁', 2),
('东钱湖古迹探索', '在东钱湖寻找古代文人留下的诗词石刻', '了解文人墨客与东钱湖的故事', 3),
('保国寺文物寻宝', '在保国寺寻找古代佛教文物和艺术品', '学习佛教文化，欣赏古代艺术', 3),
('河姆渡文明寻宝', '在河姆渡遗址寻找史前文明的痕迹', '了解河姆渡文化，感受历史厚重', 4),
('天童寺禅宗寻宝', '在天童寺寻找禅宗文化的精神宝藏', '体验禅宗文化，寻找内心平静', 3),
('雪窦山佛教寻宝', '在雪窦山寻找佛教文化的历史遗迹', '了解弥勒文化，感受佛教智慧', 4),
('象山渔村文化寻宝', '在象山渔村寻找海洋文化的传统元素', '了解渔民生活，体验海洋文化', 3),

-- 钓鱼目标
('东钱湖休闲垂钓', '在东钱湖垂钓区进行休闲钓鱼体验', '准备钓具，了解当地鱼类', 1),
('姚江野钓体验', '在姚江钓鱼台进行野外钓鱼', '选择合适的钓点，注意安全', 2),
('慈湖钓鱼技巧学习', '在慈湖垂钓中心学习钓鱼技巧', '向当地钓友请教，提高钓技', 2),
('奉化江溪钓体验', '在奉化江进行溪流钓鱼', '了解溪流钓鱼的特点和技巧', 3),
('象山港海钓挑战', '在象山港进行海钓体验', '学习海钓技巧，体验海钓乐趣', 4),
('镇海九龙湖钓鱼', '在镇海九龙湖进行湖钓', '享受湖光山色中的钓鱼乐趣', 2),
('余姚水库钓鱼', '在余姚河姆渡水库进行水库钓鱼', '了解水库钓鱼的特点', 3),
('北仑海钓体验', '在北仑春晓进行海边钓鱼', '体验海钓的刺激和挑战', 3),
('四明山溪流钓', '在四明山溪流进行山溪钓鱼', '享受山间溪流的清澈和宁静', 3),
('日湖公园钓鱼', '在日湖公园钓鱼区进行城市钓鱼', '体验城市中的钓鱼乐趣', 1),

-- 背包旅行目标
('四明山野营体验', '在四明山野营基地进行一日野营', '准备齐全的野营装备，注意环保', 4),
('雪窦山徒步露营', '在雪窦山露营区进行徒步露营', '体验山地露营的乐趣和挑战', 4),
('象山海边露营', '在象山半岛进行海边露营体验', '感受海风海浪，观察海上日出', 4),
('东钱湖山间过夜', '在东钱湖山间小屋体验山间过夜', '享受湖光山色，体验简朴生活', 3),
('天童山后山探险', '在天童山后山进行探险式徒步', '发现隐藏的山径和景点', 3),
('达蓬山户外挑战', '在达蓬山户外基地进行综合户外挑战', '测试户外生存技能', 4),
('余姚四明山小木屋', '在余姚四明山小木屋体验山居生活', '感受山间的宁静和自然', 3),
('奉化溪口山间驿站', '在奉化溪口山间驿站体验古道文化', '了解古代驿站文化', 3),
('北仑海边帐篷', '在北仑春晓海边搭建帐篷过夜', '体验海边露营的独特魅力', 4),
('镇海九龙湖野营', '在镇海九龙湖进行湖边野营', '享受湖光山色中的野营体验', 3),

-- 皮划艇目标
('东钱湖皮划艇入门', '在东钱湖皮划艇基地学习皮划艇基础技巧', '掌握基本划桨技术和安全知识', 2),
('姚江皮划艇漂流', '在姚江进行皮划艇漂流体验', '感受江水流动，享受漂流乐趣', 2),
('奉化江划艇探索', '在奉化江进行皮划艇探索之旅', '发现江边的自然景观', 3),
('象山港海上皮划艇', '在象山港进行海上皮划艇挑战', '体验海上划艇的刺激和挑战', 4),
('慈湖皮划艇训练', '在慈湖进行皮划艇技能训练', '提高划艇技术，增强水上运动能力', 2),
('镇海九龙湖划艇', '在镇海九龙湖进行环湖皮划艇', '享受湖光山色中的划艇体验', 3),
('北仑海湾皮划艇', '在北仑春晓海湾进行皮划艇探险', '探索海湾的隐秘角落', 4),
('余姚河道皮划艇', '在余姚河姆渡水道进行皮划艇', '体验古老河道的历史韵味', 3),
('四明湖皮划艇', '在四明湖进行皮划艇休闲体验', '在山间湖泊中享受划艇乐趣', 3),
('甬江入海口划艇', '在甬江入海口进行皮划艇体验', '感受江海交汇的壮观景象', 3),

-- 定向越野目标
('九峰山定向挑战', '在九峰山定向越野场完成定向挑战', '使用地图和指南针，找到所有检查点', 4),
('四明山森林定向', '在四明山森林定向区进行森林定向', '在森林中练习导航技能', 4),
('东钱湖定向寻宝', '在东钱湖定向公园进行定向寻宝', '结合定向技能和寻宝乐趣', 3),
('达蓬山定向竞赛', '在达蓬山定向基地参加定向竞赛', '挑战速度和准确性', 4),
('天童山定向训练', '在天童山定向训练场进行技能训练', '提高地图阅读和导航能力', 3),
('保国寺山林导航', '在保国寺山林进行导航技能练习', '在复杂地形中练习定向技能', 3),
('雪窦山古道定向', '沿着雪窦山古道进行历史定向', '结合历史文化和定向技能', 4),
('镇海九龙湖定向', '在镇海九龙湖进行湖山定向', '在湖光山色中练习定向技能', 3),
('余姚田野定向', '在余姚河姆渡田野进行乡村定向', '体验田园风光中的定向乐趣', 2),
('北仑海岸定向', '在北仑春晓海岸进行海岸定向', '在海岸线上练习定向导航', 4),

-- 野外采摘目标
('四明山野果采摘', '在四明山采摘当季野果，了解野生植物', '确认植物安全性，适量采摘', 2),
('东钱湖野菜识别', '在东钱湖山区识别和采摘可食用野菜', '学习野菜知识，注意环保采摘', 2),
('九峰山蘑菇寻找', '在九峰山森林寻找和识别野生蘑菇', '学习蘑菇识别知识，注意安全', 3),
('天童山药材认知', '在天童山认识和了解野生药材植物', '学习中药材知识，不随意采摘', 3),
('雪窦山野茶采摘', '在雪窦山寻找和品尝野生茶叶', '了解茶文化，体验采茶乐趣', 4),
('余姚野菜采摘', '在余姚河姆渡采摘当地特色野菜', '了解当地饮食文化', 2),
('奉化竹笋挖掘', '在奉化溪口体验竹笋挖掘', '学习竹笋挖掘技巧，体验农家乐趣', 3),
('保国寺山花采集', '在保国寺山区采集可用于制作花茶的山花', '了解花茶制作，适量采集', 2),
('镇海山野探索', '在镇海九龙湖山野探索可食用植物', '增长野外生存知识', 3),
('北仑海边植物', '在北仑春晓海边认识海滨植物', '了解海滨生态，观察植物适应性', 2),

-- 吊床休闲目标
('东钱湖林间休憩', '在东钱湖林间空地架设吊床，享受湖光山色', '选择安全的树木，带上舒适的吊床', 1),
('九峰山山谷放松', '在九峰山山谷休憩点进行吊床休闲', '感受山谷的宁静，放松身心', 2),
('四明山森林浴', '在四明山森林吊床区进行森林浴体验', '深呼吸森林空气，享受自然疗愈', 2),
('天童寺后山静修', '在天童寺后山树林进行吊床静修', '结合禅修文化，达到身心平静', 2),
('月湖湖边小憩', '在月湖公园湖边树荫下进行吊床休息', '观察湖面波光，享受城市绿洲', 1),
('雪窦山溪边休憩', '在雪窦山溪边平台进行吊床休闲', '聆听溪水声，感受山间清凉', 3),
('保国寺竹林冥想', '在保国寺竹林深处进行吊床冥想', '感受竹林的清幽，达到内心平静', 2),
('象山海边吊床', '在象山半岛海边椰林进行吊床休闲', '听海浪声，感受海风轻拂', 2),
('镇海湖边放松', '在镇海九龙湖湖边进行吊床放松', '观察湖光山色，享受宁静时光', 1),
('中山公园树荫休憩', '在中山公园古树下进行吊床休息', '在城市中心享受自然休憩', 1),

-- 爬山目标
('九峰山登顶挑战', '攀登九峰山主峰，挑战宁波市区最高峰', '准备登山装备，注意安全，循序渐进', 4),
('达蓬山探险登山', '完成达蓬山登山径的全程攀登', '体验山地攀登的乐趣和挑战', 4),
('雪窦山千丈岩攀登', '攀登雪窦山千丈岩，观赏壮观瀑布', '注意湿滑路面，准备防滑装备', 4),
('四明山主峰征服', '征服四明山主峰，体验高山风光', '准备充足补给，注意天气变化', 4),
('天童山登山修行', '攀登天童山，结合登山与禅修体验', '体验登山修行的身心锻炼', 3),
('阿育王山朝圣登山', '攀登阿育王山，体验佛教朝圣之旅', '了解佛教文化，感受朝圣意义', 3),
('镇海九龙山攀登', '攀登镇海九龙山，俯瞰镇海全景', '选择天气晴朗的日子，带上相机', 3),
('余姚龙山登顶', '攀登余姚龙山，挑战个人登山极限', '做好体能准备，确保安全', 4),
('北仑春晓山登山', '攀登北仑春晓山，观赏海山风光', '体验海边山峰的独特景色', 3),
('奉化商量岗攀登', '攀登奉化商量岗，体验高海拔登山', '准备高海拔登山装备', 4),

-- 沙滩目标
('象山松兰山海滩漫步', '在象山松兰山海滩进行日出漫步', '早起观赏海上日出，感受海滩宁静', 1),
('石浦渔港海滩探索', '在象山石浦渔港海滩探索渔村文化', '了解渔民生活，体验海洋文化', 2),
('北仑春晓海滩休闲', '在北仑春晓海滩进行海边休闲活动', '享受海风海浪，放松身心', 1),
('象山黄金海岸摄影', '在象山黄金海岸进行海景摄影', '捕捉海浪、沙滩和天空的美景', 2),
('檀头山海滩探险', '在象山檀头山海滩进行海岸探险', '探索海岸地貌，发现海洋生物', 3),
('宁海强蛟海滩观潮', '在宁海强蛟海滩观察潮汐变化', '了解潮汐规律，观察海洋现象', 2),
('大目湾海滩日落', '在象山大目湾海滩观赏海上日落', '选择最佳观赏位置，拍摄日落美景', 2),
('梅山海滩贝壳收集', '在北仑梅山海滩收集不同种类的贝壳', '了解海洋生物，保护海洋环境', 1),
('鹤浦海滩海钓', '在象山鹤浦海滩进行海边钓鱼', '体验海钓乐趣，了解海洋鱼类', 3),
('桑洲海滩生态观察', '在宁海桑洲海滩观察海洋生态', '记录海洋生物和海岸植物', 2),

-- 文化目标
('天一阁藏书文化探索', '深入了解天一阁的藏书文化和历史价值', '学习古代藏书文化，感受书香传承', 2),
('慈城古县城历史游', '全面游览慈城古县城，了解古代县城文化', '了解古代行政文化，感受历史厚重', 2),
('河姆渡史前文明', '在河姆渡遗址了解7000年前的史前文明', '学习史前文化，感受文明起源', 3),
('宁波博物馆文化之旅', '在宁波博物馆进行系统的文化学习', '了解宁波历史文化，增长见识', 2),
('老外滩建筑文化', '研究老外滩的中西建筑文化融合', '对比不同建筑风格，了解历史变迁', 2),
('保国寺建筑艺术', '欣赏保国寺的古代建筑艺术', '学习古代建筑技艺，感受工匠精神', 3),
('天童禅寺禅文化', '在天童禅寺体验禅宗文化', '了解禅宗思想，体验禅修生活', 3),
('阿育王寺佛教文化', '在阿育王寺学习佛教文化知识', '了解佛教历史，感受宗教文化', 2),
('雪窦寺弥勒文化', '在雪窦寺了解弥勒佛文化', '学习弥勒文化，感受佛教智慧', 3),
('前童古镇民俗文化', '在宁海前童古镇体验传统民俗文化', '了解江南古镇文化，体验传统生活', 3),

-- 集市目标
('城隍庙市场寻宝', '在城隍庙小商品市场寻找特色商品', '发现有趣的小商品，体验市井文化', 1),
('和义大道夜市美食', '在和义大道夜市品尝宁波特色小吃', '尝试不同口味，了解宁波饮食文化', 1),
('鼓楼沿古玩淘宝', '在鼓楼沿古玩市场淘宝寻宝', '学习古玩知识，发现有价值的物品', 2),
('慈城古镇集市体验', '在慈城古镇集市体验传统集市文化', '了解古代商业文化，感受传统氛围', 2),
('河姆渡农贸市场', '在余姚河姆渡农贸市场体验乡村集市', '了解当地农产品，体验乡村生活', 1),
('奉化溪口特产购买', '在奉化溪口特产市场购买当地特产', '了解奉化特产，品尝地方美味', 1),
('象山石浦海鲜市场', '在象山石浦海鲜市场体验海鲜文化', '了解海鲜种类，学习挑选技巧', 2),
('前童古镇手工艺', '在宁海前童古镇集市寻找传统手工艺品', '了解传统手工艺，支持非遗传承', 3),
('镇海骆驼农贸体验', '在镇海骆驼农贸市场体验当地生活', '观察当地人的生活方式', 1),
('北仑新碶夜市', '在北仑新碶夜市体验港城夜生活', '感受港城文化，品尝特色美食', 1),

-- 公园目标
('月湖公园历史文化', '在月湖公园了解宁波历史文化', '学习月湖的历史故事和文化内涵', 1),
('中山公园晨练体验', '在中山公园参与晨练活动', '体验当地人的健身文化', 1),
('日湖公园生态观察', '在日湖公园观察城市生态环境', '记录公园内的植物和动物', 1),
('鄞州公园休闲体验', '在鄞州公园进行休闲娱乐活动', '享受现代化公园的设施和环境', 1),
('东钱湖湿地生态', '在东钱湖湿地公园学习湿地生态知识', '了解湿地的生态价值和保护意义', 2),
('梁祝文化公园爱情文化', '在梁祝文化公园了解梁祝爱情文化', '学习梁祝传说，感受爱情文化', 2),
('九峰山森林公园徒步', '在九峰山森林公园进行森林徒步', '享受森林氧吧，锻炼身体', 2),
('四明山森林公园探索', '在四明山森林公园进行自然探索', '发现森林的奥秘，学习生态知识', 3),
('镇海九龙湖公园划船', '在镇海九龙湖公园体验划船乐趣', '享受湖上泛舟的悠闲时光', 2),
('北仑中河公园健身', '在北仑中河公园进行户外健身', '利用公园设施进行体能锻炼', 1),

-- 地方特色目标
('缸鸭狗汤圆品尝', '品尝宁波著名的缸鸭狗汤圆', '了解汤圆制作工艺，感受宁波味道', 1),
('状元楼宁波菜体验', '在状元楼品尝正宗宁波菜', '了解宁波菜的特色和文化', 1),
('奉化千层饼制作', '学习奉化千层饼的制作工艺', '体验传统糕点制作，了解地方特色', 2),
('余姚榨菜文化', '在余姚了解榨菜的制作和文化', '学习榨菜制作工艺，品尝正宗榨菜', 2),
('象山海鲜美食', '在象山品尝新鲜的海鲜美食', '了解海鲜烹饪方法，体验海洋美食文化', 2),
('慈城年糕制作', '学习慈城年糕的传统制作方法', '体验年糕制作工艺，了解节庆文化', 2),
('宁海望海茶品茶', '在宁海望海茶庄品尝当地名茶', '学习茶文化，体验茶艺', 2),
('北仑港式茶餐', '在北仑体验港式茶餐厅文化', '了解港城文化融合，品尝港式美食', 1),
('镇海走马塘古村', '探访镇海蛟川走马塘古村落', '了解古村落文化，感受乡村韵味', 3),
('雅戈尔动物园', '在鄞州雅戈尔动物园了解动物保护', '学习动物知识，增强保护意识', 1);

-- 社交目标数据
INSERT INTO social_goals_data (title, description, tips, min_user_level) VALUES
('分享今日发现', '将今天的探索发现分享到社区，让更多人了解宁波之美', '用心拍摄，真诚分享，传播正能量', 1),
('邀请朋友同行', '邀请一位朋友参加明天的户外活动', '分享户外乐趣，增进友谊', 1),
('社区互动交流', '在社区中与其他探索者交流心得体验', '积极互动，学习他人经验', 1),
('本地文化推广', '向外地朋友介绍宁波的特色文化和景点', '做宁波文化的传播者', 2),
('户外安全提醒', '在社区分享户外安全知识和注意事项', '帮助新手安全探索', 2),
('环保意识传播', '在活动中践行环保理念，并影响他人', '保护环境，从我做起', 2),
('新手指导帮助', '帮助一位新用户完成他们的首次户外任务', '耐心指导，分享经验', 3),
('组织小型聚会', '组织或参加一次小型的户外聚会活动', '增进社区凝聚力', 3),
('文化知识分享', '分享关于宁波历史文化的有趣知识', '传承文化，教育他人', 2),
('摄影技巧交流', '在社区分享户外摄影的技巧和心得', '提高大家的摄影水平', 3),
('季节活动推荐', '根据当前季节推荐适合的户外活动', '帮助他人选择合适的活动', 2),
('安全经验分享', '分享户外活动中的安全经验和教训', '提高社区整体安全意识', 3),
('美食文化交流', '分享宁波特色美食的品尝体验', '传播宁波美食文化', 1),
('交通攻略分享', '分享前往各个景点的交通攻略', '帮助他人更好地规划行程', 2),
('心得感悟分享', '分享户外探索带来的心得感悟和成长', '传递正能量，激励他人', 2);

-- 准备物品数据
INSERT INTO preparation_items_data (item_text, min_difficulty_level, applicable_weather) VALUES
-- 基础物品
('手机充电至少80%', 'easy', NULL),
('穿着舒适的运动鞋', 'easy', NULL),
('携带500ml饮用水', 'easy', NULL),
('随身携带纸巾湿巾', 'easy', NULL),
('准备少量现金和交通卡', 'easy', NULL),
('携带身份证件', 'easy', NULL),
('准备垃圾袋保护环境', 'easy', NULL),
('携带手机充电宝', 'medium', NULL),
('准备简单的急救包', 'medium', NULL),
('携带多功能工具刀', 'hard', NULL),

-- 天气相关物品
('涂抹防晒霜SPF30+', 'easy', 'sunny'),
('携带遮阳帽或太阳镜', 'easy', 'sunny'),
('准备1L以上饮用水', 'medium', 'sunny'),
('携带防晒衣或薄外套', 'easy', 'sunny'),
('准备雨伞或雨衣', 'easy', 'rainy'),
('穿着防滑鞋', 'easy', 'rainy'),
('携带防水袋保护手机', 'easy', 'rainy'),
('准备保温杯装热水', 'easy', 'cold'),
('穿着保暖外套', 'easy', 'cold'),
('携带暖宝宝', 'easy', 'cold'),

-- 活动专用物品
('携带望远镜', 'easy', NULL),
('准备相机或拍照设备', 'easy', NULL),
('携带登山杖', 'medium', NULL),
('准备头灯或手电筒', 'medium', NULL),
('携带坐垫或野餐垫', 'easy', NULL),
('准备钓鱼装备', 'medium', NULL),
('携带游泳装备', 'easy', NULL),
('准备野营装备', 'hard', NULL),
('携带自行车头盔', 'medium', NULL),
('准备皮划艇救生衣', 'hard', NULL),

-- 季节性物品
('携带防蚊液', 'easy', 'summer'),
('准备冰袋降温', 'easy', 'hot'),
('携带保温毯', 'medium', 'cold'),
('准备防风外套', 'easy', 'windy'),
('携带护膝护具', 'medium', NULL),
('准备能量棒或零食', 'medium', NULL),
('携带湿纸巾', 'easy', NULL),
('准备塑料袋防水', 'easy', 'rainy'),
('携带小型医药包', 'hard', NULL),
('准备备用衣物', 'hard', NULL);

-- 安全提示数据
INSERT INTO safety_tips_data (tip_text, applicable_destination_type, applicable_weather) VALUES
-- 通用安全提示
('告知家人或朋友你的出行计划和预计返回时间', NULL, NULL),
('保持手机电量充足，确保能够及时联系', NULL, NULL),
('随时注意个人物品安全，不要携带贵重物品', NULL, NULL),
('遵守景区规定，不要进入禁止区域', NULL, NULL),
('保护环境，不乱扔垃圾，不破坏植被', NULL, NULL),
('如遇紧急情况，立即拨打110或120求助', NULL, NULL),
('不要独自前往偏僻或危险区域', NULL, NULL),
('注意天气变化，如遇恶劣天气及时撤离', NULL, NULL),

-- 天气相关安全提示
('雨天路面湿滑，注意防滑，减慢行走速度', NULL, 'rainy'),
('炎热天气注意防暑降温，及时补充水分', NULL, 'sunny'),
('大风天气注意稳定身体，避免在高处活动', NULL, 'windy'),
('雾天能见度低，注意交通安全，减速慢行', NULL, 'foggy'),

-- 地点类型相关安全提示
('登山时注意脚下路况，穿着防滑鞋', 'hiking', NULL),
('海边活动注意潮汐变化，不要游泳到深水区', 'beach', NULL),
('在文化场所保持安静，尊重文物和他人', 'cultural', NULL),
('在集市中注意财物安全，避免拥挤', 'market', NULL),
('公园活动注意保护花草，不要攀爬设施', 'park', NULL),
('水上活动必须穿着救生衣，注意水域安全', 'kayaking', NULL),
('野外采摘要确认植物安全性，不食用不明植物', 'foraging', NULL),
('定向越野要携带地图和指南针，不要偏离路线', 'orienteering', NULL),
('钓鱼时注意用钩安全，不要在禁钓区域钓鱼', 'fishing', NULL),
('骑行时佩戴头盔，遵守交通规则', 'cycling', NULL),
('越野跑注意路面状况，避免在湿滑路面快跑', 'trail_running', NULL),
('观鸟时保持安静距离，不要惊扰野生动物', 'birdwatching', NULL),
('观星活动选择安全地点，注意夜间行走安全', 'stargazing', NULL),
('野营时选择安全营地，注意防火防盗', 'backpacking', NULL),
('吊床休闲要选择结实的树木，检查吊床安全性', 'hammocking', NULL),
('摄影时注意保护设备，不要为拍照冒险', 'photography', NULL),
('冥想时选择安全舒适的环境，注意保暖', 'meditation', NULL),
('步行探索注意交通安全，选择安全的步行路线', 'walking', NULL),
('寻宝活动不要破坏环境，尊重私人财产', 'geocaching', NULL),
('地方特色体验要了解当地习俗，尊重文化差异', 'local_specialty', NULL);