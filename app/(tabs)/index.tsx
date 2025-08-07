import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Star, ChevronRight, Leaf, Mountain, Users, Bell } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { TaskService } from '@/services/taskService';
import { AchievementService } from '@/services/achievementService';
import { WeatherService } from '@/services/weatherService';
import { ProfileService } from '@/services/profileService';
import { router } from 'expo-router';
import { Target } from 'lucide-react-native';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import NotificationCenter from '@/components/NotificationCenter';

export default function HomeScreen() {
  console.log('HomeScreen: Component mounted.');
  const { user, userProfile, loading } = useAuth();
  const [todayTask, setTodayTask] = useState(null);
  const [weather, setWeather] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    console.log('HomeScreen: useEffect triggered.');

    if (user && userProfile) {
      loadTodayTask(isMounted);
      loadWeather(isMounted);
      loadUserStats(isMounted);
      // 初始化成就数据
      AchievementService.initializeDefaultAchievements().catch(error => {
        console.error('初始化成就数据错误:', error);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [user, userProfile]);

  const loadTodayTask = async (isMounted) => {
    if (!user) return;
    
    setTaskLoading(true);
    setError(null);
    
    try {
      const { data: task } = await TaskService.getTodayTask(user.id);
      if (!task) {
        // 如果没有今日任务，生成一个
        const { data: newTask } = await TaskService.generateSmartTask(
          user.id, 
          userProfile?.level || 1
        );
        if (isMounted) {
          setTodayTask(newTask);
        }
      } else {
        if (isMounted) {
          setTodayTask(task);
        }
      }
    } catch (error) {
      if (isMounted) {
        setError('加载任务失败，请重试');
      }
    } finally {
      if (isMounted) {
        setTaskLoading(false);
      }
    }
  };

  const loadWeather = async (isMounted) => {
    try {
      const { data: weatherData } = await WeatherService.getCurrentWeather();
      if (isMounted) {
        setWeather(weatherData);
      }
    } catch (error) {
      console.error('加载天气错误:', error);
    }
  };

  const loadUserStats = async (isMounted) => {
    if (!user) return;
    
    try {
      const { data: stats } = await ProfileService.getUserStats(user.id);
      if (isMounted) {
        setUserStats(stats);
      }
    } catch (error) {
      console.error('加载用户统计错误:', error);
    }
  };

  const handleTodayTaskPress = () => {
    router.push('/tasks');
  };

  const handleCommunityPress = () => {
    router.push('/community');
  };

  const retryLoadTask = () => {
    if (user && userProfile) {
      loadTodayTask(true);
    }
  };

  const inspirationalQuote = '每一步都是新的开始，自然在等待你的发现。';
  
  console.log('HomeScreen: Auth loading state:', loading);
  if (loading) {
    console.log('HomeScreen: Rendering LoadingSpinner due to auth loading.');
    return <LoadingSpinner message="正在加载用户信息..." />;
  }
  
  if (!user || !userProfile) {
    console.log('HomeScreen: User or UserProfile is null, showing login prompt');
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>请先登录以使用应用功能</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.replace('/(auth)/sign-in')}>
            <Text style={styles.loginButtonText}>前往登录</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !todayTask) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message={error} onRetry={retryLoadTask} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Image source={{ uri: userProfile.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }} style={styles.avatar} />
              <View style={styles.userText}>
                <Text style={styles.greeting}>早安，{userProfile.username}！</Text>
                <View style={styles.levelContainer}>
                  <Text style={styles.userLevel}>户外 Lv.{userProfile.level}</Text>
                  <Text style={styles.socialLevel}>社交 Lv.{userProfile.social_level}</Text>
                </View>
                <Text style={styles.userTitle}>{userProfile.title} | {userProfile.social_title}</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.notificationButton}
                onPress={() => setNotificationVisible(true)}>
                <Bell size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.streakBadge}>
                <Text style={styles.streakNumber}>{userProfile.streak}</Text>
                <Text style={styles.streakText}>连续天数</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Today's Task Preview */}
        {taskLoading ? (
          <View style={styles.card}>
            <LoadingSpinner message="正在生成今日任务..." size="small" />
          </View>
        ) : todayTask ? (
          <TouchableOpacity style={styles.card} onPress={handleTodayTaskPress}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitle}>
                <Target size={20} color="#10B981" />
                <Text style={styles.cardTitleText}>今日任务</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
            <Text style={styles.taskTitle}>{todayTask.title}</Text>
            <Text style={styles.taskDescription}>
              {todayTask.outdoor_goal_description || '探索自然，发现美好'}
            </Text>
            <View style={styles.taskMeta}>
              <View style={styles.taskMetaItem}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.taskMetaText}>{todayTask.destination_name}</Text>
              </View>
              <View style={styles.taskMetaItem}>
                <Star size={14} color="#F59E0B" />
                <Text style={styles.taskMetaText}>{todayTask.points} 积分</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {/* Weather Card */}
        {weather && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitle}>
                <MapPin size={20} color="#10B981" />
                <Text style={styles.cardTitleText}>今日天气</Text>
              </View>
            </View>
            <View style={styles.weatherContent}>
              <Text style={styles.temperature}>{weather.temperature}</Text>
              <Text style={styles.weatherCondition}>{weather.condition}</Text>
              <Text style={styles.weatherSuggestion}>{weather.suggestion}</Text>
            </View>
          </View>
        )}

        {/* Quick Stats */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>本周成就</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Leaf size={24} color="#10B981" />
              <Text style={styles.statNumber}>
                {userStats?.thisWeekTasks || userProfile.completed_tasks}
              </Text>
              <Text style={styles.statLabel}>完成任务</Text>
            </View>
            <View style={styles.statItem}>
              <Mountain size={24} color="#3B82F6" />
              <Text style={styles.statNumber}>
                {Math.floor(userProfile.total_distance)}
              </Text>
              <Text style={styles.statLabel}>探索距离(km)</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>{userProfile.points}</Text>
              <Text style={styles.statLabel}>总积分</Text>
            </View>
          </View>
        </View>

        {/* Daily Inspiration */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>今日启发</Text>
          <Text style={styles.inspirationText}>{inspirationalQuote}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>快速开始</Text>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={handleTodayTaskPress}>
            <View style={styles.actionIcon}>
              <MapPin size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>
                {todayTask?.status === 'completed' ? '查看今日任务' : '领取今日任务'}
              </Text>
              <Text style={styles.actionDescription}>
                {todayTask ? todayTask.destination_name : '获得个性化户外挑战'}
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={handleCommunityPress}>
            <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
              <Users size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>加入附近团队</Text>
              <Text style={styles.actionDescription}>寻找户外伙伴</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <NotificationCenter
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userText: {
    flex: 1,
  },
  levelContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userLevel: {
    fontSize: 14,
    color: '#D1FAE5',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  socialLevel: {
    fontSize: 14,
    color: '#D1FAE5',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  userTitle: {
    fontSize: 12,
    color: '#D1FAE5',
  },
  streakBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  streakText: {
    fontSize: 12,
    color: '#D1FAE5',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  weatherContent: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  weatherCondition: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 8,
  },
  weatherSuggestion: {
    fontSize: 14,
    color: '#10B981',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  inspirationText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomSpacing: {
    height: 20,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loginPromptText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  taskMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  taskMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  taskMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
});