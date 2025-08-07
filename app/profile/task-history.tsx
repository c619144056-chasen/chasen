import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Clock, Star, Calendar, Target, TrendingUp } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { TaskService } from '@/services/taskService';
import { Task } from '@/types/task';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function TaskHistoryScreen() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadTaskHistory();
      loadTaskStats();
    }
  }, [user]);

  const loadTaskHistory = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: taskError } = await TaskService.getTaskHistory(user.id, 50);
      if (taskError) throw taskError;
      setTasks(data || []);
    } catch (error) {
      console.error('加载任务历史错误:', error);
      setError('加载任务历史失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const loadTaskStats = async () => {
    if (!user) return;
    
    try {
      const { data, error: statsError } = await TaskService.getTaskStats(user.id);
      if (statsError) throw statsError;
      setStats(data);
    } catch (error) {
      console.error('加载任务统计错误:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadTaskHistory(), loadTaskStats()]);
    setRefreshing(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '初级';
      case 'medium': return '中级';
      case 'hard': return '高级';
      default: return '未知';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '进行中';
      case 'failed': return '未完成';
      default: return '可用';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#3B82F6';
      case 'failed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const TaskCard = ({ task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={styles.taskMeta}>
            <View style={styles.metaItem}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.metaText}>{task.destination_name}</Text>
            </View>
            <View style={styles.metaItem}>
              <Calendar size={14} color="#6B7280" />
              <Text style={styles.metaText}>{formatDate(task.created_at)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.taskBadges}>
          <View style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(task.difficulty) }
          ]}>
            <Text style={styles.badgeText}>{getDifficultyText(task.difficulty)}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(task.status) }
          ]}>
            <Text style={styles.badgeText}>{getStatusText(task.status)}</Text>
          </View>
        </View>
      </View>

      {task.destination_image && (
        <Image source={{ uri: task.destination_image }} style={styles.taskImage} />
      )}

      <View style={styles.taskFooter}>
        <View style={styles.taskReward}>
          <Star size={16} color="#F59E0B" />
          <Text style={styles.rewardText}>{task.points} 积分</Text>
        </View>
        <View style={styles.taskDuration}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.durationText}>{task.estimated_time}</Text>
        </View>
      </View>

      {task.task_completions && task.task_completions.length > 0 && (
        <View style={styles.completionInfo}>
          <Text style={styles.completionText}>
            完成时间: {formatDate(task.task_completions[0].completed_at)}
          </Text>
          {task.task_completions[0].rating && (
            <View style={styles.rating}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{task.task_completions[0].rating}/5</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

  const StatsCard = ({ icon: Icon, title, value, color }) => (
    <View style={styles.statsCard}>
      <Icon size={24} color={color} />
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="加载任务历史中..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadTaskHistory} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>任务历史</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
        {/* Stats Overview */}
        {stats && (
          <View style={styles.statsContainer}>
            <StatsCard
              icon={Target}
              title="总任务"
              value={stats.total}
              color="#10B981"
            />
            <StatsCard
              icon={TrendingUp}
              title="完成率"
              value={`${Math.round((stats.completed / stats.total) * 100)}%`}
              color="#3B82F6"
            />
            <StatsCard
              icon={Star}
              title="总积分"
              value={stats.totalPoints}
              color="#F59E0B"
            />
          </View>
        )}

        {/* Difficulty Distribution */}
        {stats && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>难度分布</Text>
            <View style={styles.difficultyStats}>
              <View style={styles.difficultyItem}>
                <View style={[styles.difficultyDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.difficultyLabel}>初级: {stats.byDifficulty.easy}</Text>
              </View>
              <View style={styles.difficultyItem}>
                <View style={[styles.difficultyDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.difficultyLabel}>中级: {stats.byDifficulty.medium}</Text>
              </View>
              <View style={styles.difficultyItem}>
                <View style={[styles.difficultyDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.difficultyLabel}>高级: {stats.byDifficulty.hard}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Task History */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>历史记录</Text>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Target size={48} color="#E5E7EB" />
              <Text style={styles.emptyText}>暂无任务历史</Text>
              <Text style={styles.emptySubtext}>完成第一个任务开始你的探索之旅</Text>
            </View>
          )}
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statsCard: {
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
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  difficultyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  difficultyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  difficultyLabel: {
    fontSize: 14,
    color: '#374151',
  },
  taskCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskInfo: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
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
    fontSize: 12,
    color: '#6B7280',
  },
  taskBadges: {
    gap: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  taskImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  taskDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  completionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  completionText: {
    fontSize: 12,
    color: '#6B7280',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});