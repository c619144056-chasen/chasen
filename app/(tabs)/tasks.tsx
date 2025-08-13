import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Target, Users, Clock, Star, Gift, CircleCheck as CheckCircle, Play } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { TaskService } from '@/services/taskService';
import { AchievementService } from '@/services/achievementService';
import { Task } from '@/types/task';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import TaskCompletionModal from '@/components/TaskCompletionModal';
import { useEffect } from 'react';

export default function TasksScreen() {
  const { user, userProfile, refreshProfile } = useAuth();
  const [todayTask, setTodayTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (user && userProfile) {
      loadTodayTask();
    }
  }, [user, userProfile]);

  const loadTodayTask = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data: task, error: taskError } = await TaskService.getTodayTask(user.id);
      
      if (taskError) throw taskError;
      
      if (!task) {
        // 生成新任务
        const { data: newTask, error: generateError } = await TaskService.generateSmartTask(
          user.id, 
          userProfile?.level || 1
        );
        if (generateError) throw generateError;
        setTodayTask(newTask);
      } else {
        setTodayTask(task);
      }
    } catch (error) {
      console.error('加载任务错误:', error);
      setError('加载任务失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTask = () => {
    if (!todayTask) return;
    
    if (todayTask.status === 'available') {
      // 开始任务
      startTask();
    } else if (todayTask.status === 'in_progress') {
      // 完成任务
      setCompletionModalVisible(true);
    }
  };

  const startTask = async () => {
    if (!todayTask) return;
    
    try {
      const { error } = await TaskService.startTask(todayTask.id);
      if (error) throw error;
      
      setTodayTask(prev => prev ? { ...prev, status: 'in_progress' } : null);
      Alert.alert('任务开始', '任务已开始，完成后记得上传照片哦！');
    } catch (error) {
      console.error('开始任务错误:', error);
      Alert.alert('错误', '开始任务失败，请重试');
    }
  };

  const handleCompleteTask = async (completionData: {
    photos: string[];
    notes: string;
    rating: number;
    outdoorCompleted?: boolean;
    socialCompleted?: boolean;
    outdoorPointsEarned?: number;
    socialPointsEarned?: number;
  }) => {
    if (!todayTask || !user) return;
    
    setCompleting(true);
    
    try {
      const { error } = await TaskService.completeTask(user.id, todayTask.id, completionData);
      
      if (error) throw error;
      
      // 刷新用户档案以更新积分等信息
      await refreshProfile();
      
      // 检查并解锁成就
      AchievementService.checkAndUnlockAchievements(user.id).catch(error => {
        console.error('检查成就错误:', error);
      });
      
      // 更新任务状态
      setTodayTask(prev => prev ? { ...prev, status: 'completed' } : null);
      
      Alert.alert(
        '任务完成！',
        `恭喜您完成今日挑战！\n获得 ${todayTask.points} 积分\n明日任务将为您解锁新的探索区域。`,
        [{ text: '太棒了！', onPress: () => {} }]
      );
    } catch (error) {
      console.error('完成任务错误:', error);
      Alert.alert('错误', '完成任务失败，请重试');
    } finally {
      setCompleting(false);
      setCompletionModalVisible(false);
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '初级';
      case 'medium': return '中级';
      case 'hard': return '高级';
      default: return '初级';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#D1FAE5';
      case 'medium': return '#FEF3C7';
      case 'hard': return '#FEE2E2';
      default: return '#D1FAE5';
    }
  };

  const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#065F46';
      case 'medium': return '#92400E';
      case 'hard': return '#991B1B';
      default: return '#065F46';
    }
  };

  const getTaskButtonText = () => {
    if (!todayTask) return '加载中...';
    
    switch (todayTask.status) {
      case 'available':
        return '开始任务';
      case 'in_progress':
        return '完成任务';
      case 'completed':
        return '今日任务已完成';
      default:
        return '查看任务';
    }
  };

  const getTaskButtonIcon = () => {
    if (!todayTask) return Gift;
    
    switch (todayTask.status) {
      case 'available':
        return Play;
      case 'in_progress':
        return CheckCircle;
      case 'completed':
        return CheckCircle;
      default:
        return Gift;
    }
  };

  if (loading) {
    return <LoadingSpinner message="正在加载今日任务..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadTodayTask} />;
  }

  if (!todayTask) {
    return <ErrorMessage message="暂无可用任务" onRetry={loadTodayTask} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
          <Text style={styles.headerTitle}>今日任务</Text>
          <Text style={styles.headerSubtitle}>每一天都是新的探索机会</Text>
        </LinearGradient>

        {/* Daily Task Card */}
        <View style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <View>
              <Text style={styles.taskTitle}>{todayTask.title}</Text>
              <View style={styles.taskMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.metaText}>{todayTask.estimated_time}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Star size={16} color="#F59E0B" />
                  <Text style={styles.metaText}>{todayTask.points} 积分</Text>
                </View>
              </View>
            </View>
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(todayTask.difficulty) }
            ]}>
              <Text style={[
                styles.difficultyText,
                { color: getDifficultyTextColor(todayTask.difficulty) }
              ]}>
                {getDifficultyText(todayTask.difficulty)}
              </Text>
            </View>
          </View>

          {todayTask.destination_image && (
            <Image source={{ uri: todayTask.destination_image }} style={styles.taskImage} />
          )}

          <View style={styles.taskContent}>
            <View style={styles.taskSection}>
              <View style={styles.taskSectionHeader}>
                <MapPin size={18} color="#10B981" />
                <Text style={styles.taskSectionTitle}>目的地</Text>
              </View>
              <Text style={styles.taskSectionContent}>{todayTask.destination_name}</Text>
            </View>

            <View style={styles.taskSection}>
              <View style={styles.taskSectionHeader}>
                <Target size={18} color="#3B82F6" />
                <Text style={styles.taskSectionTitle}>挑战内容</Text>
              </View>
              {todayTask.outdoor_goal_title ? (
                <View style={styles.outdoorGoalContent}>
                  <Text style={styles.outdoorGoalTitle}>{todayTask.outdoor_goal_title}</Text>
                  <Text style={styles.taskSectionContent}>
                    {todayTask.outdoor_goal_description}
                  </Text>
                  {todayTask.outdoor_goal_tips && (
                    <Text style={styles.taskTips}>
                      💡 {todayTask.outdoor_goal_tips}
                    </Text>
                  )}
                </View>
              ) : (
                <Text style={styles.taskSectionContent}>
                  探索自然，发现美好
                </Text>
              )}
            </View>

            <View style={styles.taskSection}>
              <View style={styles.taskSectionHeader}>
                <Users size={18} color="#F59E0B" />
                <Text style={styles.taskSectionTitle}>社交目标</Text>
              </View>
              {todayTask.social_goal_title ? (
                <View style={styles.socialGoalContent}>
                  <Text style={styles.socialGoalTitle}>{todayTask.social_goal_title}</Text>
                  <Text style={styles.taskSectionContent}>
                    {todayTask.social_goal_description}
                  </Text>
                  {todayTask.social_goal_tips && (
                    <Text style={styles.taskTips}>
                      💡 {todayTask.social_goal_tips}
                    </Text>
                  )}
                </View>
              ) : (
                <Text style={styles.taskSectionContent}>
                  与他人分享你的发现
                </Text>
              )}
            </View>
          </View>

          {todayTask.status !== 'completed' ? (
            <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptTask}>
              {React.createElement(getTaskButtonIcon(), { size: 20, color: "#FFFFFF" })}
              <Text style={styles.acceptButtonText}>
                {getTaskButtonText()}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.completedButton}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.completedButtonText}>今日任务已完成</Text>
            </View>
          )}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>新手小贴士</Text>
          <Text style={styles.tipsContent}>
            🌱 不要担心完美完成任务，重点是开始行动
            {'\n'}📸 用照片记录你的发现，它们都是成长的证明
            {'\n'}👥 遇到困难时，社区伙伴随时为你提供帮助
            {'\n'}⏰ 任务没有严格的时间限制，按自己的节奏进行
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <TaskCompletionModal
        visible={completionModalVisible}
        onClose={() => setCompletionModalVisible(false)}
        onComplete={handleCompleteTask}
        task={todayTask}
      />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1FAE5',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  taskImage: {
    width: '100%',
    height: 200,
  },
  taskContent: {
    padding: 20,
  },
  taskSection: {
    marginBottom: 16,
  },
  taskSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  socialLevelBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  socialLevelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#92400E',
  },
  taskSectionContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  outdoorGoalContent: {
    marginBottom: 8,
  },
  outdoorGoalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 6,
  },
  socialGoalContent: {
    marginBottom: 8,
  },
  socialGoalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 6,
  },
  taskTips: {
    fontSize: 13,
    color: '#10B981',
    fontStyle: 'italic',
    marginTop: 6,
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  completedButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#10B981',
  },
  tipsCard: {
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
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  tipsContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 20,
  },
});