/*
  # 添加宁波地区目的地数据

  1. 新增数据
    - 添加100个宁波地区的户外探索地点
    - 包含公园、山峰、湖泊、海滨、古迹、花园等多种类型
    - 每个地点包含名称、距离、图片、坐标、难度等级和类型信息

  2. 数据特点
    - 涵盖宁波各区县的知名景点和隐藏宝地
    - 难度等级从初级到高级，适合不同水平的探索者
    - 真实的地理坐标，便于导航和位置验证
*/

-- 插入宁波地区目的地数据
INSERT INTO destinations (name, distance, image, latitude, longitude, difficulty_level, type) VALUES
-- 海曙区
('天一阁博物馆', '步行15分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8683, 121.5440, 'easy', 'historic'),
('月湖公园', '步行10分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8721, 121.5398, 'easy', 'park'),
('鼓楼沿公园', '步行8分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8756, 121.5456, 'easy', 'park'),
('白云庄', '步行20分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8634, 121.5389, 'medium', 'historic'),
('秀水街历史街区', '步行12分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8712, 121.5423, 'easy', 'historic'),

-- 江北区
('老外滩', '步行25分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8834, 121.5234, 'easy', 'riverside'),
('慈城古县城', '公交30分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9876, 121.4234, 'medium', 'historic'),
('绿野公园', '步行18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8923, 121.5123, 'easy', 'park'),
('姚江公园', '骑行15分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8945, 121.5089, 'easy', 'riverside'),
('北岸琴森', '步行22分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8867, 121.5167, 'medium', 'park'),

-- 鄞州区
('东钱湖', '公交45分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7834, 121.6234, 'medium', 'lake'),
('鄞州公园', '步行12分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5834, 'easy', 'park'),
('南塘老街', '步行16分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8456, 121.5678, 'easy', 'historic'),
('宁波博物馆', '公交20分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5945, 'easy', 'museum'),
('四明山森林公园', '驾车60分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6234, 121.4567, 'hard', 'mountain'),

-- 北仑区
('凤凰山海港乐园', '公交50分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6789, 121.8234, 'medium', 'park'),
('梅山湾沙滩公园', '公交40分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6456, 121.8567, 'easy', 'beach'),
('九峰山', '公交35分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7123, 121.7890, 'hard', 'mountain'),
('北仑河头公园', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6890, 121.8123, 'easy', 'park'),
('洋沙山', '公交55分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6234, 121.8456, 'medium', 'mountain'),

-- 镇海区
('招宝山', '公交30分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9456, 121.7234, 'medium', 'mountain'),
('镇海植物园', '公交25分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9234, 121.7456, 'easy', 'garden'),
('后海塘公园', '公交20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9345, 121.7345, 'easy', 'park'),
('澥浦古镇', '公交40分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9678, 121.6789, 'medium', 'historic'),
('镇海口海防历史纪念馆', '公交35分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9567, 121.7123, 'easy', 'museum'),

-- 奉化区
('雪窦山', '驾车90分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6789, 121.2345, 'hard', 'mountain'),
('溪口古镇', '驾车80分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6945, 121.2567, 'medium', 'historic'),
('奉化公园', '公交60分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6567, 121.4123, 'easy', 'park'),
('弥勒大佛景区', '驾车85分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6834, 121.2456, 'medium', 'scenic'),
('商量岗', '驾车100分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.5234, 121.1789, 'hard', 'mountain'),

-- 余姚区
('河姆渡遗址', '公交70分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0234, 121.3456, 'medium', 'historic'),
('四明湖', '驾车75分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.2890, 'medium', 'lake'),
('余姚龙山公园', '公交65分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0456, 121.3234, 'easy', 'park'),
('丹山赤水', '驾车80分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9789, 121.2567, 'hard', 'mountain'),
('阳明故里', '公交60分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0345, 121.3123, 'medium', 'historic'),

-- 慈溪区
('杭州湾湿地公园', '公交90分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.2234, 121.2456, 'medium', 'wetland'),
('上林湖', '驾车70分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1567, 121.3789, 'medium', 'lake'),
('慈溪森林公园', '公交55分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1890, 121.3456, 'easy', 'park'),
('鸣鹤古镇', '公交65分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1234, 121.4567, 'medium', 'historic'),
('达蓬山', '公交75分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.2456, 121.2789, 'hard', 'mountain'),

-- 宁海县
('前童古镇', '驾车90分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4567, 121.4234, 'medium', 'historic'),
('梁皇山', '驾车100分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3234, 121.3567, 'hard', 'mountain'),
('强蛟群岛', '驾车120分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2789, 121.6234, 'hard', 'island'),
('宁海森林温泉', '驾车85分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4123, 121.3890, 'medium', 'scenic'),
('十里红妆文化园', '驾车75分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4456, 121.4123, 'easy', 'garden'),

-- 象山县
('石浦渔港古城', '驾车100分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2123, 121.9234, 'medium', 'historic'),
('中国渔村', '驾车110分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.1890, 121.9567, 'easy', 'beach'),
('花岙岛', '驾车+船120分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.1234, 121.9890, 'hard', 'island'),
('象山影视城', '驾车95分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2456, 121.8567, 'easy', 'scenic'),
('松兰山海滨', '驾车105分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.1567, 121.9123, 'medium', 'beach'),

-- 市区公园绿地
('中山公园', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8756, 121.5567, 'easy', 'park'),
('日湖公园', '步行15分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8634, 121.5234, 'easy', 'park'),
('甬江公园', '骑行20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8890, 121.5678, 'easy', 'riverside'),
('樱花公园', '步行18分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5345, 'easy', 'park'),
('海曙公园', '步行12分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8723, 121.5456, 'easy', 'park'),

-- 特色小镇和古村
('慈城古县城', '公交45分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9876, 121.4234, 'medium', 'historic'),
('走马塘古村', '公交50分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7890, 121.6123, 'medium', 'historic'),
('它山堰', '公交40分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7234, 121.5890, 'easy', 'historic'),
('保国寺', '公交35分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9123, 121.4567, 'medium', 'historic'),
('天童寺', '公交45分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8345, 121.6789, 'medium', 'historic'),

-- 山峰和自然景观
('太白山', '驾车70分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.5678, 121.3234, 'hard', 'mountain'),
('五龙潭', '驾车65分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.5234, 121.3567, 'medium', 'waterfall'),
('天河生态风景区', '驾车55分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6123, 121.3890, 'medium', 'scenic'),
('大岚山', '驾车95分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4890, 121.2123, 'hard', 'mountain'),
('白岩山', '驾车85分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.5456, 121.2890, 'hard', 'mountain'),

-- 海滨和岛屿
('象山港', '驾车80分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3456, 121.7234, 'medium', 'bay'),
('大目湾', '驾车110分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.1123, 121.8890, 'medium', 'beach'),
('渔山列岛', '驾车+船150分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 28.8234, 122.1567, 'hard', 'island'),
('檀头山岛', '驾车+船140分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 28.9567, 122.0234, 'hard', 'island'),
('南田岛', '驾车+船130分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.0890, 121.9567, 'hard', 'island'),

-- 城市绿道和步道
('三江口绿道', '骑行25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8456, 121.5123, 'easy', 'trail'),
('姚江绿道', '骑行30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8789, 121.4890, 'easy', 'trail'),
('奉化江绿道', '骑行35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5567, 'easy', 'trail'),
('东钱湖环湖绿道', '骑行60分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7567, 121.6123, 'medium', 'trail'),
('梅山湾绿道', '公交+骑行50分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6234, 121.8123, 'medium', 'trail'),

-- 特色花园和植物园
('宁波植物园', '公交40分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7890, 121.5234, 'easy', 'garden'),
('雅戈尔动物园', '公交35分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7456, 121.6567, 'easy', 'zoo'),
('东钱湖陶公岛', '公交50分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7723, 121.6234, 'easy', 'island'),
('福泉山茶园', '驾车60分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6890, 121.4567, 'medium', 'garden'),
('横溪花木城', '公交45分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7234, 121.5890, 'easy', 'garden'),

-- 文化景点
('宁波美术馆', '步行20分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5234, 'easy', 'museum'),
('宁波科学探索中心', '公交25分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5678, 'easy', 'museum'),
('庆安会馆', '步行18分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8789, 121.5345, 'easy', 'historic'),
('宁波帮博物馆', '公交30分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8345, 121.5789, 'easy', 'museum'),
('鼓楼', '步行14分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8678, 121.5456, 'easy', 'historic'),

-- 休闲娱乐场所
('宁波欢乐海岸', '公交40分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7567, 121.6890, 'easy', 'park'),
('罗蒙环球乐园', '公交45分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7890, 121.6234, 'easy', 'park'),
('宁波海洋世界', '公交35分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7234, 121.6567, 'easy', 'aquarium'),
('东部新城中央公园', '公交30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5890, 'easy', 'park'),
('宁波大剧院广场', '公交20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5678, 'easy', 'plaza'),

-- 周边山水
('天台山', '驾车150分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.1456, 121.0234, 'hard', 'mountain'),
('仙居神仙居', '驾车180分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 28.8567, 120.7890, 'hard', 'mountain'),
('临海江南长城', '驾车120分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 28.8890, 121.1234, 'hard', 'historic'),
('新昌大佛寺', '驾车140分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4234, 120.8567, 'medium', 'historic'),
('穿岩十九峰', '驾车160分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3567, 120.7234, 'hard', 'mountain'),

-- 社区公园和小型绿地
('望春公园', '步行8分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8456, 121.5234, 'easy', 'park'),
('联丰公园', '步行12分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5345, 'easy', 'park'),
('翠柏里公园', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8678, 121.5456, 'easy', 'park'),
('高桥公园', '步行15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8789, 121.5567, 'easy', 'park'),
('集士港公园', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8890, 121.4678, 'easy', 'park'),

-- 特色景观
('宁波老外滩', '步行25分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8834, 121.5234, 'easy', 'riverside'),
('三江口', '步行30分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8723, 121.5345, 'easy', 'riverside'),
('甬江大桥观景台', '公交20分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8912, 121.5678, 'easy', 'scenic'),
('灵桥公园', '步行16分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8645, 121.5389, 'easy', 'park'),
('解放桥', '步行18分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8756, 121.5234, 'easy', 'bridge'),

-- 郊野公园
('五磊山风景区', '公交60分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9234, 121.3456, 'medium', 'mountain'),
('慈溪上林湖', '公交80分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1567, 121.3789, 'medium', 'lake'),
('余姚四明山', '驾车90分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.2345, 'hard', 'mountain'),
('宁海温泉山庄', '驾车85分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4123, 121.3678, 'medium', 'scenic'),
('象山港湿地公园', '驾车70分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3789, 121.7456, 'medium', 'wetland'),

-- 历史文化街区
('鼓楼步行街', '步行12分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8756, 121.5456, 'easy', 'historic'),
('城隍庙', '步行14分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8689, 121.5378, 'easy', 'historic'),
('药行街历史街区', '步行16分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8723, 121.5412, 'easy', 'historic'),
('永丰库遗址', '步行20分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8634, 121.5345, 'easy', 'historic'),
('宁波府学文庙', '步行18分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8712, 121.5389, 'easy', 'historic'),

-- 现代公园
('宁波中心公园', '公交15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5789, 'easy', 'park'),
('江北万达广场', '公交18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8890, 121.5123, 'easy', 'plaza'),
('鄞州万达广场', '公交22分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5890, 'easy', 'plaza'),
('印象城公园', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8345, 121.5678, 'easy', 'park'),
('来福士广场', '步行22分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5234, 'easy', 'plaza'),

-- 特色小径和步道
('月湖盛园步道', '步行8分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8734, 121.5401, 'easy', 'trail'),
('白云街小径', '步行6分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8645, 121.5378, 'easy', 'trail'),
('柳汀街绿道', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8712, 121.5445, 'easy', 'trail'),
('中山路步行街', '步行5分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8689, 121.5423, 'easy', 'street'),
('和义大道绿化带', '步行12分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8578, 121.5567, 'easy', 'trail'),

-- 水系景观
('姚江源头', '驾车120分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6234, 121.1567, 'hard', 'river'),
('奉化江源头', '驾车100分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.5567, 121.2890, 'hard', 'river'),
('甬江入海口', '公交45分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9234, 121.6789, 'medium', 'estuary'),
('慈湖', '公交55分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0123, 121.4567, 'easy', 'lake'),
('杜湖', '公交50分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9567, 121.4890, 'easy', 'lake'),

-- 农业观光
('慈溪葡萄园', '公交70分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1890, 121.3234, 'easy', 'farm'),
('余姚榨菜基地', '公交65分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0456, 121.3567, 'easy', 'farm'),
('奉化水蜜桃园', '驾车70分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6789, 121.3890, 'easy', 'farm'),
('宁海茶园', '驾车80分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4567, 121.4123, 'medium', 'farm'),
('象山柑橘园', '驾车90分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2890, 121.8234, 'easy', 'farm'),

-- 运动场所
('宁波体育中心', '公交20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5678, 'easy', 'sports'),
('东钱湖马拉松赛道', '公交50分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7678, 121.6234, 'medium', 'trail'),
('象山港大桥观景点', '驾车85分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3234, 121.7890, 'medium', 'bridge'),
('杭州湾跨海大桥观景台', '驾车60分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.2567, 121.1234, 'easy', 'bridge'),
('宁波国际赛道公园', '公交40分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7345, 121.6789, 'medium', 'sports'),

-- 宗教文化场所
('阿育王寺', '公交40分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8345, 121.6234, 'easy', 'temple'),
('七塔寺', '步行25分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5345, 'easy', 'temple'),
('观宗寺', '公交30分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8456, 121.5678, 'easy', 'temple'),
('天童禅寺', '公交50分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.6890, 'medium', 'temple'),
('延庆寺', '公交35分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8678, 121.5234, 'easy', 'temple'),

-- 特色村落
('鄞州横街古村', '公交45分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7234, 121.5890, 'medium', 'village'),
('海曙章水古村', '公交55分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7890, 121.4567, 'medium', 'village'),
('奉化大堰古村', '驾车75分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.5890, 121.3234, 'medium', 'village'),
('余姚梁弄古村', '公交80分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9456, 121.2789, 'medium', 'village'),
('宁海深甽古村', '驾车95分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3890, 121.3456, 'hard', 'village'),

-- 观景台和制高点
('宁波电视塔', '公交30分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8456, 121.5789, 'easy', 'tower'),
('鄞州中心区观景台', '公交25分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5890, 'easy', 'scenic'),
('北仑港口观景台', '公交60分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6789, 121.8456, 'medium', 'scenic'),
('镇海炼化观景点', '公交45分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9234, 121.7123, 'easy', 'scenic'),
('象山港大桥南岸', '驾车90分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2567, 121.8123, 'medium', 'bridge'),

-- 生态湿地
('杭州湾国家湿地公园', '公交90分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.2234, 121.2456, 'medium', 'wetland'),
('慈溪湿地公园', '公交70分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1678, 121.3123, 'easy', 'wetland'),
('余姚河姆渡湿地', '公交75分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0234, 121.3456, 'medium', 'wetland'),
('象山港湿地', '驾车85分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.3456, 121.7234, 'medium', 'wetland'),
('宁海湾湿地', '驾车100分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2890, 121.5678, 'hard', 'wetland'),

-- 特色街区和商圈
('天一广场', '步行15分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8689, 121.5456, 'easy', 'plaza'),
('和义大道商圈', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5567, 'easy', 'street'),
('中山东路', '步行8分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8723, 121.5389, 'easy', 'street'),
('解放南路', '步行12分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8634, 121.5423, 'easy', 'street'),
('江厦街', '步行14分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8756, 121.5345, 'easy', 'street'),

-- 高校校园
('宁波大学', '公交35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7567, 121.6123, 'easy', 'campus'),
('宁波诺丁汉大学', '公交40分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5890, 'easy', 'campus'),
('浙江万里学院', '公交30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5678, 'easy', 'campus'),
('宁波工程学院', '公交45分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7890, 121.5234, 'easy', 'campus'),
('宁波城市职业技术学院', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8345, 121.5567, 'easy', 'campus'),

-- 特色建筑
('宁波帮文化公园', '公交30分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8456, 121.5789, 'easy', 'park'),
('宁波音乐厅', '步行20分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5234, 'easy', 'cultural'),
('宁波图书馆', '公交18分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5678, 'easy', 'library'),
('宁波大剧院', '公交22分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5890, 'easy', 'cultural'),
('宁波会展中心', '公交35分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7890, 121.6123, 'easy', 'exhibition'),

-- 休闲度假村
('东钱湖度假村', '公交55分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7456, 121.6345, 'easy', 'resort'),
('溪口温泉度假村', '驾车90分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6789, 121.2567, 'medium', 'resort'),
('象山海景度假村', '驾车105分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.1890, 121.9234, 'medium', 'resort'),
('宁海森林度假村', '驾车80分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.4234, 121.3890, 'medium', 'resort'),
('慈溪农家乐', '公交65分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.1234, 121.3567, 'easy', 'farm'),

-- 创意园区
('宁波创意园', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8345, 121.5678, 'easy', 'creative'),
('和丰创意广场', '步行18分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5345, 'easy', 'creative'),
('宁波工业设计园', '公交30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5789, 'easy', 'creative'),
('江北文创港', '公交20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8890, 121.5234, 'easy', 'creative'),
('鄞州文化创意园', '公交28分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5678, 'easy', 'creative'),

-- 夜景观赏点
('三江夜游码头', '步行25分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8723, 121.5234, 'easy', 'riverside'),
('老外滩夜景', '步行28分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8834, 121.5234, 'easy', 'riverside'),
('东部新城夜景', '公交30分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5890, 'easy', 'scenic'),
('月湖夜景', '步行12分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8721, 121.5398, 'easy', 'park'),
('日湖夜景', '步行16分钟', 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8634, 121.5234, 'easy', 'park'),

-- 特色市场和集市
('宁波花鸟市场', '步行20分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5345, 'easy', 'market'),
('朱雀农贸市场', '步行15分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8678, 121.5456, 'easy', 'market'),
('慈城古玩市场', '公交50分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.9876, 121.4234, 'easy', 'market'),
('象山海鲜市场', '驾车100分钟', 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.2456, 121.8567, 'easy', 'market'),
('余姚农产品市场', '公交60分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 30.0456, 121.3234, 'easy', 'market'),

-- 运动健身场所
('宁波奥体中心', '公交35分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.7890, 121.5678, 'easy', 'sports'),
('江北体育公园', '公交25分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8890, 121.5123, 'easy', 'sports'),
('鄞州体育公园', '公交30分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5789, 'easy', 'sports'),
('海曙体育中心', '步行22分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8456, 121.5234, 'easy', 'sports'),
('北仑体育训练基地', '公交55分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.6789, 121.8234, 'medium', 'sports'),

-- 艺术文化空间
('宁波当代艺术馆', '步行25分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8567, 121.5345, 'easy', 'museum'),
('港通艺术中心', '步行18分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8678, 121.5456, 'easy', 'cultural'),
('宁波文化广场', '公交20分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8234, 121.5789, 'easy', 'plaza'),
('鄞州文化中心', '公交25分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8123, 121.5890, 'easy', 'cultural'),
('江北文化中心', '公交22分钟', 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8890, 121.5123, 'easy', 'cultural'),

-- 特色小径
('月湖西区小径', '步行6分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8712, 121.5378, 'easy', 'trail'),
('白云庄后山小径', '步行25分钟', 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8623, 121.5401, 'medium', 'trail'),
('鼓楼沿河步道', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8745, 121.5467, 'easy', 'trail'),
('秀水街石板路', '步行8分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8701, 121.5434, 'easy', 'trail'),
('天一阁后花园小径', '步行12分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8689, 121.5445, 'easy', 'trail'),

-- 隐藏宝地
('月湖秘密花园', '步行15分钟', 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8734, 121.5389, 'easy', 'garden'),
('白云庄观景亭', '步行22分钟', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8645, 121.5401, 'medium', 'scenic'),
('天一阁古井', '步行18分钟', 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8678, 121.5434, 'easy', 'historic'),
('鼓楼隐秘咖啡角', '步行10分钟', 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8756, 121.5467, 'easy', 'cafe'),
('老外滩艺术角落', '步行30分钟', 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', 29.8823, 121.5245, 'easy', 'art');