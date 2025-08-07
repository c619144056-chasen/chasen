import { supabase } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Create a service role client for data initialization (bypasses RLS)
const getServiceClient = () => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('DataService: Service role key not found. Falling back to regular client...');
    console.warn('DataService: Please configure EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY in .env file');
    return supabase;
  }
  
  console.log('DataService: Using service role client for data initialization');
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export class DataService {
  // 数据迁移服务 - 将硬编码数据迁移到数据库
  
  // 检查并初始化所有基础数据
  static async initializeAllData() {
    try {
      console.log('DataService: 开始初始化应用数据...');
      
      const results = await Promise.all([
        this.initializeDestinations(),
        this.initializeOutdoorGoals(),
        this.initializeSocialGoals(),
        this.initializePreparationItems(),
        this.initializeSafetyTips()
      ]);

      const errors = results.filter(result => result.error);
      
      if (errors.length > 0) {
        console.error('DataService: 数据初始化部分失败:', errors);
        return { success: false, errors };
      }

      console.log('DataService: 所有数据初始化完成');
      return { success: true, errors: null };
    } catch (error) {
      console.error('DataService: 数据初始化错误:', error);
      return { success: false, errors: [error] };
    }
  }

  // 初始化目的地数据
  static async initializeDestinations() {
    try {
      const client = getServiceClient();
      
      // 检查是否已有数据
      const { data: existing } = await client
        .from('destinations')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        console.log('目的地数据已存在，跳过初始化');
        return { success: true, error: null };
      }

      console.log('初始化目的地数据...');
      
      const defaultDestinations = [
        {
          name: '鄞州公园荷花池',
          distance: '步行8分钟',
          image: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          latitude: 29.8174,
          longitude: 121.5501,
          difficulty_level: 'easy',
          type: 'park'
        },
        {
          name: '象山半岛海滩',
          distance: '驾车45分钟',
          image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          latitude: 29.4774,
          longitude: 121.8693,
          difficulty_level: 'medium',
          type: 'beach'
        },
        {
          name: '四明山森林公园',
          distance: '驾车1小时',
          image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          latitude: 29.7000,
          longitude: 121.2000,
          difficulty_level: 'hard',
          type: 'mountain'
        },
        {
          name: '东钱湖风景区',
          distance: '驾车30分钟',
          image: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          latitude: 29.7833,
          longitude: 121.6167,
          difficulty_level: 'medium',
          type: 'lake'
        },
        {
          name: '天童森林公园',
          distance: '驾车25分钟',
          image: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          latitude: 29.8500,
          longitude: 121.7000,
          difficulty_level: 'medium',
          type: 'forest'
        }
      ];

      const { error } = await client
        .from('destinations')
        .insert(defaultDestinations);

      if (error) throw error;
      console.log('目的地数据初始化完成');
      return { success: true, error: null };
    } catch (error) {
      console.error('初始化目的地数据错误:', error);
      return { success: false, error };
    }
  }

  // 初始化户外目标数据
  static async initializeOutdoorGoals() {
    try {
      const client = getServiceClient();
      
      const { data: existing } = await client
        .from('outdoor_goals_data')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        console.log('户外目标数据已存在，跳过初始化');
        return { success: true, error: null };
      }

      console.log('初始化户外目标数据...');
      
      const defaultOutdoorGoals = [
        // 公园类目标
        {
          title: '自然观察挑战',
          description: '寻找并拍摄3种不同形状的叶子，观察它们的纹理和颜色差异',
          tips: '注意观察叶子的边缘、叶脉和颜色变化',
          min_user_level: 1,
          applicable_destination_type: 'park'
        },
        {
          title: '花卉摄影探索',
          description: '在公园中寻找并拍摄5种不同颜色的花朵',
          tips: '关注花朵的形状、颜色搭配和光影效果',
          min_user_level: 1,
          applicable_destination_type: 'park'
        },
        {
          title: '鸟类观察记录',
          description: '在公园中观察并记录至少3种不同的鸟类',
          tips: '保持安静，使用望远镜或手机变焦功能',
          min_user_level: 2,
          applicable_destination_type: 'park'
        },
        {
          title: '公园生态探索',
          description: '观察并记录公园中的生态系统，包括植物、动物和它们的相互关系',
          tips: '注意观察不同物种之间的互动，如蜜蜂采花、鸟类筑巢等',
          min_user_level: 3,
          applicable_destination_type: 'park'
        },
        // 山地类目标
        {
          title: '登高望远挑战',
          description: '攀登到山峰的观景点，拍摄全景照片',
          tips: '注意安全，选择合适的登山路线',
          min_user_level: 3,
          applicable_destination_type: 'mountain'
        },
        {
          title: '地质观察探索',
          description: '在山地寻找并观察不同类型的岩石和地质结构',
          tips: '了解基本地质知识，注意安全',
          min_user_level: 4,
          applicable_destination_type: 'mountain'
        },
        {
          title: '山地植被研究',
          description: '观察并记录不同海拔高度的植被变化',
          tips: '注意记录植物种类随海拔的变化规律',
          min_user_level: 5,
          applicable_destination_type: 'mountain'
        },
        // 海滩类目标
        {
          title: '海浪观察记录',
          description: '在海边观察并记录海浪的节奏和形态变化',
          tips: '注意潮汐时间，保持安全距离',
          min_user_level: 2,
          applicable_destination_type: 'beach'
        },
        {
          title: '贝壳收集整理',
          description: '在海滩上收集不同形状和颜色的贝壳',
          tips: '只收集空贝壳，保护海洋生物',
          min_user_level: 1,
          applicable_destination_type: 'beach'
        },
        {
          title: '海洋生态观察',
          description: '观察海滩上的海洋生物和潮间带生态',
          tips: '观察螃蟹、海鸟等生物的行为模式',
          min_user_level: 3,
          applicable_destination_type: 'beach'
        },
        // 湖泊类目标
        {
          title: '湖面倒影拍摄',
          description: '拍摄湖面上的倒影，捕捉对称美',
          tips: '选择无风的时刻，湖面平静如镜',
          min_user_level: 2,
          applicable_destination_type: 'lake'
        },
        {
          title: '水生生物观察',
          description: '观察湖泊中的水生植物和动物',
          tips: '注意观察鱼类、水鸟和水生植物的生态关系',
          min_user_level: 3,
          applicable_destination_type: 'lake'
        },
        // 森林类目标
        {
          title: '森林声音收集',
          description: '在森林中录制不同的自然声音',
          tips: '鸟鸣、风声、叶子摩擦声等',
          min_user_level: 2,
          applicable_destination_type: 'forest'
        },
        {
          title: '森林层次观察',
          description: '观察森林的垂直结构，从地面到树冠的不同层次',
          tips: '注意观察不同高度的植物种类和动物活动',
          min_user_level: 4,
          applicable_destination_type: 'forest'
        },
        // 通用目标
        {
          title: '自然日记记录',
          description: '详细记录今日的自然观察发现，包括天气、动植物、感受等',
          tips: '用文字和图片记录下你的发现和感受',
          min_user_level: 1,
          applicable_destination_type: null
        },
        {
          title: '环境保护行动',
          description: '在探索过程中进行环境保护行动，如清理垃圾、保护植物等',
          tips: '带走垃圾，不破坏自然环境，做负责任的探索者',
          min_user_level: 2,
          applicable_destination_type: null
        }
      ];

      const { error } = await client
        .from('outdoor_goals_data')
        .insert(defaultOutdoorGoals);

      if (error) throw error;
      console.log('户外目标数据初始化完成');
      return { success: true, error: null };
    } catch (error) {
      console.error('初始化户外目标数据错误:', error);
      return { success: false, error };
    }
  }

  // 初始化社交目标数据
  static async initializeSocialGoals() {
    try {
      const client = getServiceClient();
      
      const { data: existing } = await client
        .from('social_goals_data')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        console.log('社交目标数据已存在，跳过初始化');
        return { success: true, error: null };
      }

      console.log('初始化社交目标数据...');
      
      const defaultSocialGoals = [
        // 公园类社交目标
        {
          title: '公园友善问候',
          description: '在公园中向3位不同的游客友善问候',
          tips: '保持微笑，选择合适的时机',
          min_user_level: 1,
          applicable_destination_type: 'park'
        },
        {
          title: '儿童互动游戏',
          description: '与公园中的小朋友进行简单的互动游戏',
          tips: '征得家长同意，保持适当距离',
          min_user_level: 2,
          applicable_destination_type: 'park'
        },
        {
          title: '公园活动参与',
          description: '参与公园中的集体活动（如太极、广场舞）',
          tips: '积极参与，融入集体',
          min_user_level: 4,
          applicable_destination_type: 'park'
        },
        {
          title: '自然知识分享',
          description: '向其他游客分享你观察到的自然知识或有趣发现',
          tips: '主动与他人交流，分享你的观察心得',
          min_user_level: 3,
          applicable_destination_type: 'park'
        },
        // 山地类社交目标
        {
          title: '登山伙伴结识',
          description: '在登山过程中结识新的登山伙伴',
          tips: '互相鼓励，分享登山经验',
          min_user_level: 3,
          applicable_destination_type: 'mountain'
        },
        {
          title: '山顶合影留念',
          description: '在山顶与其他登山者合影留念',
          tips: '分享成功的喜悦，建立友谊',
          min_user_level: 2,
          applicable_destination_type: 'mountain'
        },
        {
          title: '登山安全互助',
          description: '在登山过程中主动帮助其他登山者，确保大家的安全',
          tips: '分享路线信息，互相提醒安全注意事项',
          min_user_level: 4,
          applicable_destination_type: 'mountain'
        },
        // 海滩类社交目标
        {
          title: '海滩运动参与',
          description: '参与海滩上的集体运动（如沙滩排球）',
          tips: '积极参与，享受团队合作',
          min_user_level: 3,
          applicable_destination_type: 'beach'
        },
        {
          title: '海滩摄影互助',
          description: '与其他游客互相帮助拍摄海滩照片',
          tips: '主动提供帮助，分享美好时刻',
          min_user_level: 2,
          applicable_destination_type: 'beach'
        },
        {
          title: '海洋知识交流',
          description: '与其他游客交流海洋生物和潮汐知识',
          tips: '分享你的海洋观察发现，学习他人的经验',
          min_user_level: 3,
          applicable_destination_type: 'beach'
        },
        // 湖泊类社交目标
        {
          title: '湖边垂钓交流',
          description: '与湖边的垂钓者交流钓鱼心得',
          tips: '学习钓鱼技巧，分享经验',
          min_user_level: 3,
          applicable_destination_type: 'lake'
        },
        {
          title: '湖畔休闲互动',
          description: '与湖边休闲的人们进行友好交流',
          tips: '分享湖景观察心得，交流摄影技巧',
          min_user_level: 2,
          applicable_destination_type: 'lake'
        },
        // 森林类社交目标
        {
          title: '森林徒步组队',
          description: '在森林中组织徒步小队，共同探索',
          tips: '确保安全，互相照应',
          min_user_level: 4,
          applicable_destination_type: 'forest'
        },
        {
          title: '自然导览分享',
          description: '向其他游客介绍森林中的植物和动物',
          tips: '分享你的自然知识，帮助他人更好地了解森林生态',
          min_user_level: 5,
          applicable_destination_type: 'forest'
        },
        // 通用社交目标
        {
          title: '社区动态分享',
          description: '在应用社区中分享今日的探索体验和照片',
          tips: '用心分享你的发现，激励更多人参与户外探索',
          min_user_level: 1,
          applicable_destination_type: null
        },
        {
          title: '新手指导帮助',
          description: '在社区中帮助和指导新加入的探索者',
          tips: '分享你的经验，回答新手的问题',
          min_user_level: 6,
          applicable_destination_type: null
        }
      ];

      const { error } = await client
        .from('social_goals_data')
        .insert(defaultSocialGoals);

      if (error) throw error;
      console.log('社交目标数据初始化完成');
      return { success: true, error: null };
    } catch (error) {
      console.error('初始化社交目标数据错误:', error);
      return { success: false, error };
    }
  }

  // 初始化准备物品数据
  static async initializePreparationItems() {
    try {
      const client = getServiceClient();
      
      // 检查是否已有数据
      const { data: existing } = await client
        .from('preparation_items_data')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        console.log('准备物品数据已存在，跳过初始化');
        return { success: true, error: null };
      }

      console.log('初始化准备物品数据...');
      
      const defaultPreparationItems = [
        { item_text: '手机充电至少50%', min_difficulty_level: 'easy', applicable_weather: null },
        { item_text: '穿着舒适的步行鞋', min_difficulty_level: 'easy', applicable_weather: null },
        { item_text: '带上一瓶水', min_difficulty_level: 'easy', applicable_weather: null },
        { item_text: '随身携带纸巾', min_difficulty_level: 'easy', applicable_weather: null },
        { item_text: '防晒霜', min_difficulty_level: 'easy', applicable_weather: 'sunny' },
        { item_text: '遮阳帽', min_difficulty_level: 'easy', applicable_weather: 'sunny' },
        { item_text: '雨伞', min_difficulty_level: 'easy', applicable_weather: 'rainy' },
        { item_text: '防水外套', min_difficulty_level: 'medium', applicable_weather: 'rainy' },
        { item_text: '急救包', min_difficulty_level: 'hard', applicable_weather: null },
        { item_text: '备用电池', min_difficulty_level: 'hard', applicable_weather: null }
      ];

      const { error } = await client
        .from('preparation_items_data')
        .insert(defaultPreparationItems);

      if (error) throw error;
      console.log('准备物品数据初始化完成');
      return { success: true, error: null };
    } catch (error) {
      console.error('初始化准备物品数据错误:', error);
      return { success: false, error };
    }
  }

  // 初始化安全提示数据
  static async initializeSafetyTips() {
    try {
      const client = getServiceClient();
      
      const { data: existing } = await client
        .from('safety_tips_data')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        console.log('安全提示数据已存在，跳过初始化');
        return { success: true, error: null };
      }

      console.log('初始化安全提示数据...');
      
      const defaultSafetyTips = [
        { tip_text: '告知家人你的出行计划', applicable_destination_type: null, applicable_weather: null },
        { tip_text: '保持手机电量充足', applicable_destination_type: null, applicable_weather: null },
        { tip_text: '随时注意个人物品安全', applicable_destination_type: null, applicable_weather: null },
        { tip_text: '注意路面湿滑', applicable_destination_type: null, applicable_weather: 'rainy' },
        { tip_text: '及时补充水分', applicable_destination_type: null, applicable_weather: 'hot' },
        { tip_text: '注意防晒', applicable_destination_type: 'beach', applicable_weather: 'sunny' },
        { tip_text: '注意山地安全，不要独自行动', applicable_destination_type: 'mountain', applicable_weather: null },
        { tip_text: '注意水边安全，不要靠近深水区', applicable_destination_type: 'lake', applicable_weather: null },
        { tip_text: '在森林中保持在标记路径上', applicable_destination_type: 'forest', applicable_weather: null }
      ];

      const { error } = await client
        .from('safety_tips_data')
        .insert(defaultSafetyTips);

      if (error) throw error;
      console.log('安全提示数据初始化完成');
      return { success: true, error: null };
    } catch (error) {
      console.error('初始化安全提示数据错误:', error);
      return { success: false, error };
    }
  }

  // 数据验证和修复
  static async validateAndRepairData() {
    try {
      console.log('开始数据验证和修复...');
      
      // 检查各表的数据完整性
      const checks = await Promise.all([
        this.validateDestinations(),
        this.validateGoalsData(),
        this.validatePreparationData(),
        this.validateSafetyData()
      ]);

      const issues = checks.filter(check => !check.valid);
      
      if (issues.length > 0) {
        console.warn('发现数据问题:', issues);
        // 这里可以添加自动修复逻辑
      }

      return { valid: issues.length === 0, issues };
    } catch (error) {
      console.error('数据验证错误:', error);
      return { valid: false, issues: [error] };
    }
  }

  // 验证目的地数据
  static async validateDestinations() {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name, latitude, longitude')
        .is('name', null)
        .or('latitude.is.null,longitude.is.null');

      if (error) throw error;

      return {
        valid: !data || data.length === 0,
        issues: data || [],
        table: 'destinations'
      };
    } catch (error) {
      return { valid: false, issues: [error], table: 'destinations' };
    }
  }

  // 验证目标数据
  static async validateGoalsData() {
    try {
      const [outdoorResult, socialResult] = await Promise.all([
        supabase.from('outdoor_goals_data').select('id').is('title', null),
        supabase.from('social_goals_data').select('id').is('title', null)
      ]);

      const issues = [];
      if (outdoorResult.data && outdoorResult.data.length > 0) {
        issues.push({ table: 'outdoor_goals_data', count: outdoorResult.data.length });
      }
      if (socialResult.data && socialResult.data.length > 0) {
        issues.push({ table: 'social_goals_data', count: socialResult.data.length });
      }

      return { valid: issues.length === 0, issues, table: 'goals_data' };
    } catch (error) {
      return { valid: false, issues: [error], table: 'goals_data' };
    }
  }

  // 验证准备物品数据
  static async validatePreparationData() {
    try {
      const { data, error } = await supabase
        .from('preparation_items_data')
        .select('id')
        .is('item_text', null);

      if (error) throw error;

      return {
        valid: !data || data.length === 0,
        issues: data || [],
        table: 'preparation_items_data'
      };
    } catch (error) {
      return { valid: false, issues: [error], table: 'preparation_items_data' };
    }
  }

  // 验证安全提示数据
  static async validateSafetyData() {
    try {
      const { data, error } = await supabase
        .from('safety_tips_data')
        .select('id')
        .is('tip_text', null);

      if (error) throw error;

      return {
        valid: !data || data.length === 0,
        issues: data || [],
        table: 'safety_tips_data'
      };
    } catch (error) {
      return { valid: false, issues: [error], table: 'safety_tips_data' };
    }
  }

  // 获取数据统计
  static async getDataStatistics() {
    try {
      const [
        destinationsResult,
        outdoorGoalsResult,
        socialGoalsResult,
        preparationResult,
        safetyResult
      ] = await Promise.all([
        supabase.from('destinations').select('id', { count: 'exact' }),
        supabase.from('outdoor_goals_data').select('id', { count: 'exact' }),
        supabase.from('social_goals_data').select('id', { count: 'exact' }),
        supabase.from('preparation_items_data').select('id', { count: 'exact' }),
        supabase.from('safety_tips_data').select('id', { count: 'exact' })
      ]);

      return {
        data: {
          destinations: destinationsResult.count || 0,
          outdoorGoals: outdoorGoalsResult.count || 0,
          socialGoals: socialGoalsResult.count || 0,
          preparationItems: preparationResult.count || 0,
          safetyTips: safetyResult.count || 0
        },
        error: null
      };
    } catch (error) {
      console.error('获取数据统计错误:', error);
      return { data: null, error };
    }
  }

  // 清理无效数据
  static async cleanupInvalidData() {
    try {
      console.log('开始清理无效数据...');
      
      // 清理没有名称的目的地
      await supabase
        .from('destinations')
        .delete()
        .is('name', null);

      // 清理没有标题的目标
      await supabase
        .from('outdoor_goals_data')
        .delete()
        .is('title', null);

      await supabase
        .from('social_goals_data')
        .delete()
        .is('title', null);

      // 清理空的准备物品
      await supabase
        .from('preparation_items_data')
        .delete()
        .is('item_text', null);

      // 清理空的安全提示
      await supabase
        .from('safety_tips_data')
        .delete()
        .is('tip_text', null);

      console.log('无效数据清理完成');
      return { success: true, error: null };
    } catch (error) {
      console.error('清理无效数据错误:', error);
      return { success: false, error };
    }
  }
}