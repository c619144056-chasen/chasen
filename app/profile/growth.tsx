import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, Target, Star, Calendar, Award } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/services/profileService';
import { TaskService } from '@/services/taskService';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function GrowthScreen() {
  const { user, userProfile } = useAuth();
  const [growthData, setGrowthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadGrowthData();
    }
  }, [user]);

  const loadGrowthData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [statsResult, tasksResult] = await Promise.all([
        ProfileService.getUserStats(user.id),
        TaskService.getTaskHistory(user.id, 100)
      ]);

      if (statsResult.error) throw statsResult.error;
      if (tasksResult.error) throw tasksResult.error;

      const stats = statsResult.data;
      const tasks = tasksResult.data || [];

      // 处理月度进度数据
      const monthlyData = generateMonthlyProgressData(tasks);
      
      // 处理难度分布数据
      const difficultyData = generateDifficultyDistributionData(tasks);
      
      // 处理等级进度数据
      const levelProgressData = generateLevelProgressData(userProfile);

      setGrowthData({
        monthlyProgress: monthlyData,
        difficultyDistribution: difficultyData,
        levelProgress: levelProgressData,
        stats
      });
    } catch (error) {
      console.error('加载成长数据错误:', error);
      setError('加载成长数据失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGrowthData();
    setRefreshing(false);
  };

  const generateMonthlyProgressData = (tasks: any[]) => {
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const monthTasks = completedTasks.filter(task => {
        const taskDate = new Date(task.completed_at);
        return taskDate >= month && taskDate < nextMonth;
      });

      months.push({
        month: month.toLocaleDateString('zh-CN', { month: 'short' }),
        tasks: monthTasks.length,
        points: monthTasks.reduce((sum, task) => sum + (task.points || 0), 0)
      });
    }

    return {
      tasks: {
        labels: months.map(m => m.month),
        datasets: [{
          data: months.map(m => m.tasks),
          color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
          strokeWidth: 3
        }]
      },
      points: {
        labels: months.map(m => m.month),
        datasets: [{
          data: months.map(m => m.points),
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          strokeWidth: 3
        }]
      }
    };
  };

  const generateDifficultyDistributionData = (tasks: any[]) => {
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const difficulties = { easy: 0, medium: 0, hard: 0 };
    
    completedTasks.forEach(task => {
      if (difficulties[task.difficulty] !== undefined) {
        difficulties[task.difficulty]++;
      }
    });

    return [
      {
        name: '初级',
        count: difficulties.easy,
        color: '#10B981',
        legendFontColor: '#374151',
        legendFontSize: 12,
      },
      {
        name: '中级',
        count: difficulties.medium,
        color: '#F59E0B',
        legendFontColor: '#374151',
        legendFontSize: 12,
      },
      {
        name: '高级',
        count: difficulties.hard,
        color: '#EF4444',
        legendFontColor: '#374151',
        legendFontSize: 12,
      },
    ];
  };

  const generateLevelProgressData = (profile: any) => {
    if (!profile) return null;

    const currentLevel = profile.level;
    const currentPoints = profile.points;
    const nextLevelPoints = calculateNextLevelPoints(currentLevel);
    const currentLevelPoints = calculateCurrentLevelPoints(currentLevel);
    
    const progressInCurrentLevel = currentPoints - currentLevelPoints;
    const pointsNeededForCurrentLevel = nextLevelPoints - currentLevelPoints;
    const progressPercentage = Math.round((progressInCurrentLevel / pointsNeededForCurrentLevel) * 100);

    return {
      currentLevel,
      nextLevel: currentLevel + 1,
      currentPoints,
      nextLevelPoints,
      progressPercentage,
      pointsToNext: nextLevelPoints - currentPoints,
      title: profile.title
    };
  };

  const calculateNextLevelPoints = (level: number) => {
    // 等级积分计算公式
    if (level >= 20) return level * 1800 + 2000;
    if (level >= 15) return level * 1200 + 1500;
    if (level >= 10) return level * 800 + 1000;
    if (level >= 5) return level * 400 + 500;
    return level * 200 + 100;
  };

  const calculateCurrentLevelPoints = (level: number) => {
    if (level <= 1) return 0;
    return calculateNextLevelPoints(level - 1);
  };

  if (loading) {
    return <LoadingSpinner message="正在加载成长数据..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadGrowthData} />;
  }

  if (!growthData) {
    return <ErrorMessage message="暂无成长数据" onRetry={loadGrowthData} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>成长轨迹</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        {/* 等级进度卡片 */}
        {growthData.levelProgress && (
          <View style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Award size={24} color="#10B981" />
              <Text style={styles.levelTitle}>等级进度</Text>
            </View>
            
            <View style={styles.levelInfo}>
              <Text style={styles.currentLevel}>
                Level {growthData.levelProgress.currentLevel}
              </Text>
              <Text style={styles.levelTitle}>{growthData.levelProgress.title}</Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${growthData.levelProgress.progressPercentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {growthData.levelProgress.progressPercentage}% 到下一级
              </Text>
            </View>

            <View style={styles.levelStats}>
              <View style={styles.levelStat}>
                <Text style={styles.levelStatNumber}>
                  {growthData.levelProgress.currentPoints}
                </Text>
                <Text style={styles.levelStatLabel}>当前积分</Text>
              </View>
              <View style={styles.levelStat}>
                <Text style={styles.levelStatNumber}>
                  {growthData.levelProgress.pointsToNext}
                </Text>
                <Text style={styles.levelStatLabel}>升级还需</Text>
              </View>
              <View style={styles.levelStat}>
                <Text style={styles.levelStatNumber}>
                  {growthData.levelProgress.nextLevel}
                </Text>
                <Text style={styles.levelStatLabel}>下一等级</Text>
              </View>
            </View>
          </View>
        )}

        {/* 月度任务完成趋势 */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>月度任务完成趋势</Text>
          <View style={styles.chartPlaceholder}>
            <TrendingUp size={48} color="#10B981" />
            <Text style={styles.chartPlaceholderText}>图表功能即将上线</Text>
          </View>
        </View>

        {/* 月度积分获得趋势 */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>月度积分获得趋势</Text>
          <View style={styles.chartPlaceholder}>
            <Star size={48} color="#3B82F6" />
            <Text style={styles.chartPlaceholderText}>图表功能即将上线</Text>
          </View>
        </View>

        {/* 任务难度分布 */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>任务难度分布</Text>
          <View style={styles.difficultyStats}>
            {growthData.difficultyDistribution.map((item, index) => (
              <View key={index} style={styles.difficultyItem}>
                <View style={[styles.difficultyDot, { backgroundColor: item.color }]} />
                <Text style={styles.difficultyLabel}>{item.name}: {item.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 成长里程碑 */}
        <View style={styles.milestonesCard}>
          <View style={styles.milestonesHeader}>
            <Target size={20} color="#F59E0B" />
            <Text style={styles.milestonesTitle}>成长里程碑</Text>
          </View>
          
          <View style={styles.milestonesList}>
            <MilestoneItem
              icon="🎯"
              title="首次任务"
              description="完成了第一个户外探索任务"
              achieved={userProfile?.completed_tasks > 0}
            />
            <MilestoneItem
              icon="🔥"
              title="连续一周"
              description="连续7天完成户外活动"
              achieved={userProfile?.streak >= 7}
            />
            <MilestoneItem
              icon="🏆"
              title="任务达人"
              description="完成了10个户外任务"
              achieved={userProfile?.completed_tasks >= 10}
            />
            <MilestoneItem
              icon="⭐"
              title="积分收集者"
              description="累计获得1000积分"
              achieved={userProfile?.points >= 1000}
            />
            <MilestoneItem
              icon="👑"
              title="探索专家"
              description="完成了50个户外任务"
              achieved={userProfile?.completed_tasks >= 50}
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const MilestoneItem = ({ icon, title, description, achieved }) => (
  <View style={[styles.milestoneItem, achieved && styles.achievedMilestone]}>
    <Text style={styles.milestoneIcon}>{icon}</Text>
    <View style={styles.milestoneContent}>
      <Text style={[styles.milestoneTitle, achieved && styles.achievedText]}>
        {title}
      </Text>
      <Text style={[styles.milestoneDescription, achieved && styles.achievedDescription]}>
        {description}
      </Text>
    </View>
    {achieved && (
      <View style={styles.achievedBadge}>
        <Text style={styles.achievedBadgeText}>✓</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  levelInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentLevel: {
    fontSize: 32,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  levelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  levelStat: {
    alignItems: 'center',
  },
  levelStatNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  levelStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },
  difficultyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  difficultyItem: {
    alignItems: 'center',
  },
  difficultyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  difficultyLabel: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  milestonesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  milestonesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  milestonesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  milestonesList: {
    gap: 12,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  achievedMilestone: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  milestoneIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  milestoneDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  achievedText: {
    color: '#10B981',
  },
  achievedDescription: {
    color: '#059669',
  },
  achievedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});