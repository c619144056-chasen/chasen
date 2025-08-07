import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Trophy,
  Star,
  Target,
  Users,
  Leaf,
  Mountain,
  Camera,
  Heart,
  Award,
  Lock,
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { AchievementService } from '@/services/achievementService';
import { Achievement, UserAchievement } from '@/types/task';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useEffect, useState } from 'react';

export default function AchievementsScreen() {
  const { userProfile, loading: authLoading } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      loadAchievements();
    }
  }, [userProfile]);

  const loadAchievements = async () => {
    if (!userProfile) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [allAchievementsResult, userAchievementsResult] = await Promise.all([
        AchievementService.getAllAchievements(),
        AchievementService.getUserAchievements(userProfile.id)
      ]);
      
      if (allAchievementsResult.error) throw allAchievementsResult.error;
      if (userAchievementsResult.error) throw userAchievementsResult.error;
      
      setAchievements(allAchievementsResult.data || []);
      setUserAchievements(userAchievementsResult.data || []);
    } catch (error) {
      console.error('加载成就错误:', error);
      setError('加载成就失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'leaf': Leaf,
      'star': Star,
      'camera': Camera,
      'users': Users,
      'mountain': Mountain,
      'heart': Heart,
      'award': Award,
      'trophy': Trophy,
      'target': Target,
    };
    return iconMap[iconName] || Trophy;
  };

  const isAchievementUnlocked = (achievementId: string) => {
    return userAchievements.some(ua => ua.achievement_id === achievementId);
  };

  const getAchievementUnlockDate = (achievementId: string) => {
    const userAchievement = userAchievements.find(ua => ua.achievement_id === achievementId);
    return userAchievement ? new Date(userAchievement.unlocked_at).toLocaleDateString() : null;
  };

  const getProgress = (achievement: Achievement) => {
    if (!userProfile) return { current: 0, total: 1 };
    
    // 根据成就条件计算进度
    switch (achievement.title) {
      case '初次探索':
        return { current: Math.min(userProfile.completed_tasks, 1), total: 1 };
      case '连续一周':
        return { current: Math.min(userProfile.streak, 7), total: 7 };
      case '新手上路':
        return { current: Math.min(userProfile.completed_tasks, 5), total: 5 };
      case '任务达人':
        return { current: Math.min(userProfile.completed_tasks, 10), total: 10 };
      case '积分收集者':
        return { current: Math.min(userProfile.points, 1000), total: 1000 };
      case '摄影入门':
        return { current: Math.min(Math.floor(userProfile.completed_tasks / 3), 10), total: 10 };
      case '社交达人':
        return { current: Math.min(Math.floor(userProfile.completed_tasks / 2), 20), total: 20 };
      case '活跃探索者':
        return { current: Math.min(userProfile.completed_tasks, 25), total: 25 };
      case '探索专家':
        return { current: Math.min(userProfile.completed_tasks, 50), total: 50 };
      case '传奇探索者':
        return { current: Math.min(userProfile.completed_tasks, 100), total: 100 };
      case '坚持不懈':
        return { current: Math.min(userProfile.streak, 30), total: 30 };
      case '三天坚持':
        return { current: Math.min(userProfile.streak, 3), total: 3 };
      default:
        // 对于其他成就，尝试从解锁条件推断进度
        if (achievement.unlock_condition?.includes('complete_')) {
          const match = achievement.unlock_condition.match(/complete_(\d+)_tasks/);
          if (match) {
            const target = parseInt(match[1]);
            return { current: Math.min(userProfile.completed_tasks, target), total: target };
          }
        }
        if (achievement.unlock_condition?.includes('streak_')) {
          const match = achievement.unlock_condition.match(/streak_(\d+)_days/);
          if (match) {
            const target = parseInt(match[1]);
            return { current: Math.min(userProfile.streak, target), total: target };
          }
        }
        if (achievement.unlock_condition?.includes('earn_')) {
          const match = achievement.unlock_condition.match(/earn_(\d+)_points/);
          if (match) {
            const target = parseInt(match[1]);
            return { current: Math.min(userProfile.points, target), total: target };
          }
        }
        return { current: 0, total: 1 };
    }
  };

  const calculateNextLevelPoints = (currentLevel: number) => {
    return currentLevel * 100 + 100; // 简单的等级计算公式
  };

  const levelBenefits = [
    '解锁更多挑战区域',
    '获得专属称号和徽章',
    '优先参与特殊活动',
    '成为新手导师资格',
  ];

  const AchievementCard = ({ achievement }) => {
    const IconComponent = getIconComponent(achievement.icon_name);
    const unlocked = isAchievementUnlocked(achievement.id);
    const unlockDate = getAchievementUnlockDate(achievement.id);
    const progress = getProgress(achievement);
    
    return (
      <TouchableOpacity
        style={[
          styles.achievementCard,
          unlocked ? styles.unlockedCard : styles.lockedCard,
        ]}>
        <View
          style={[
            styles.iconContainer,
            { 
              backgroundColor: unlocked ? achievement.color : '#E5E7EB',
              borderWidth: unlocked ? 0 : 2,
              borderColor: unlocked ? 'transparent' : '#D1D5DB'
            },
          ]}>
          <IconComponent 
            size={24} 
            color={unlocked ? "#FFFFFF" : "#9CA3AF"} 
          />
          {unlocked && (
            <View style={styles.unlockedBadge}>
              <Text style={styles.unlockedBadgeText}>✓</Text>
            </View>
          )}
        </View>
        
        <View style={styles.achievementContent}>
          <Text
            style={[
              styles.achievementTitle,
              unlocked ? styles.unlockedTitle : styles.lockedText,
            ]}>
            {achievement.title}
          </Text>
          <Text
            style={[
              styles.achievementDescription,
              unlocked ? styles.unlockedDescription : styles.lockedText,
            ]}>
            {achievement.description}
          </Text>
          
          {unlocked ? (
            <View style={styles.unlockedMeta}>
              <View style={styles.pointsBadge}>
                <Star size={12} color="#F59E0B" />
                <Text style={styles.pointsText}>+{achievement.points}</Text>
              </View>
              <Text style={styles.unlockedDate}>已于 {unlockDate} 解锁</Text>
            </View>
          ) : (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(progress.current / progress.total) * 100}%`,
                      backgroundColor: achievement.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {progress.current}/{progress.total}
              </Text>
            </View>
          )}
        </View>
        
        {unlocked && (
          <View style={styles.glowEffect} />
        )}
      </TouchableOpacity>
    );
  };

  if (authLoading || loading) {
    return <LoadingSpinner message="正在加载成就信息..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadAchievements} />;
  }

  if (!userProfile) {
    return <ErrorMessage message="请先登录以查看成就" />;
  }

  const nextLevelPoints = calculateNextLevelPoints(userProfile.level);
  const unlockedCount = userAchievements.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelText}>Level {userProfile.level}</Text>
              <Text style={styles.titleText}>{userProfile.title}</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Trophy size={20} color="#FFFFFF" />
              <Text style={styles.pointsText}>{userProfile.points}</Text>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>
              距离下一级别: {nextLevelPoints - userProfile.points} 积分
            </Text>
            <View style={styles.levelProgressBar}>
              <View
                style={[
                  styles.levelProgressFill,
                  {
                    width: `${(userProfile.points / nextLevelPoints) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Target size={24} color="#10B981" />
            <Text style={styles.statNumber}>{userProfile.completed_tasks}</Text>
            <Text style={styles.statLabel}>完成任务</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{userProfile.streak}</Text>
            <Text style={styles.statLabel}>连续天数</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>{unlockedCount}</Text>
            <Text style={styles.statLabel}>获得徽章</Text>
          </View>
        </View>

        {/* Level Benefits */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>等级特权</Text>
          {levelBenefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitDot} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>成就徽章</Text>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelInfo: {
    flex: 1,
  },
  levelText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 16,
    color: '#D1FAE5',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressSection: {
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 14,
    color: '#D1FAE5',
    marginBottom: 8,
  },
  levelProgressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#374151',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lockedCard: {
    opacity: 0.7,
    backgroundColor: '#F9FAFB',
  },
  unlockedCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  unlockedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  unlockedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  unlockedTitle: {
    color: '#10B981',
    fontWeight: '700',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  unlockedDescription: {
    color: '#374151',
  },
  lockedText: {
    color: '#9CA3AF',
  },
  unlockedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  unlockedDate: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    minWidth: 40,
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    zIndex: -1,
  },
  bottomSpacing: {
    height: 20,
  },
});