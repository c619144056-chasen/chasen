import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MapPin, Clock, Star, Target } from 'lucide-react-native';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
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

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.metadata}>
            <View style={styles.metaItem}>
              <Clock size={14} color="#6B7280" />
              <Text style={styles.metaText}>{task.estimated_time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Star size={14} color="#F59E0B" />
              <Text style={styles.metaText}>{task.points}积分</Text>
            </View>
          </View>
        </View>
        <View style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(task.difficulty) }
        ]}>
          <Text style={[
            styles.difficultyText,
            { color: getDifficultyTextColor(task.difficulty) }
          ]}>
            {getDifficultyText(task.difficulty)}
          </Text>
        </View>
      </View>

      {task.destination_image && (
        <Image source={{ uri: task.destination_image }} style={styles.image} />
      )}

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={16} color="#10B981" />
            <Text style={styles.sectionTitle}>目的地</Text>
          </View>
          <Text style={styles.sectionContent}>{task.destination_name}</Text>
          {task.destination_distance && (
            <Text style={styles.distance}>{task.destination_distance}</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={16} color="#3B82F6" />
            <Text style={styles.sectionTitle}>任务目标</Text>
          </View>
          <Text style={styles.sectionContent}>
            {task.outdoor_goal_description || '探索自然，发现美好'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  metadata: {
    flexDirection: 'row',
    gap: 12,
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
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 6,
  },
  sectionContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  distance: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
});