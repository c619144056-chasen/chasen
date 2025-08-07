import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, MapPin, Clock, Target, Palette } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/services/profileService';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SettingsScreen() {
  const { user, userProfile } = useAuth();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await ProfileService.getUserPreferences(user.id);
      if (error) throw error;
      setPreferences(data);
    } catch (error) {
      console.error('加载偏好设置错误:', error);
      Alert.alert('错误', '加载设置失败');
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (key: string, value: any) => {
    if (!user || !preferences) return;
    
    setUpdating(true);
    try {
      const updatedPreferences = { ...preferences, [key]: value };
      const { error } = await ProfileService.updateUserPreferences(user.id, updatedPreferences);
      if (error) throw error;
      
      setPreferences(updatedPreferences);
    } catch (error) {
      console.error('更新偏好设置错误:', error);
      Alert.alert('错误', '更新设置失败');
    } finally {
      setUpdating(false);
    }
  };

  const difficultyOptions = [
    { value: 'easy', label: '初级', description: '轻松的户外活动' },
    { value: 'medium', label: '中级', description: '适中的挑战难度' },
    { value: 'hard', label: '高级', description: '具有挑战性的任务' },
  ];

  const activityTypes = [
    { value: 'walking', label: '步行探索', icon: '🚶' },
    { value: 'photography', label: '自然摄影', icon: '📸' },
    { value: 'meditation', label: '户外冥想', icon: '🧘' },
    { value: 'birdwatching', label: '观鸟', icon: '🦅' },
    { value: 'stargazing', label: '观星', icon: '🔭' },
    { value: 'cycling', label: '骑行', icon: '🚴' },
    { value: 'trail_running', label: '越野跑', icon: '🏃' },
    { value: 'geocaching', label: '寻宝', icon: '🗺️' },
    { value: 'fishing', label: '钓鱼', icon: '🎣' },
    { value: 'backpacking', label: '背包旅行', icon: '🎒' },
    { value: 'kayaking', label: '皮划艇', icon: '🛶' },
    { value: 'orienteering', label: '定向越野', icon: '🧭' },
    { value: 'foraging', label: '野外采摘', icon: '🍄' },
    { value: 'hammocking', label: '吊床休闲', icon: '🏕️' },
    { value: 'hiking', label: '爬山', icon: '⛰️' },
    { value: 'beach', label: '沙滩', icon: '🏖️' },
    { value: 'cultural', label: '文化', icon: '🏛️' },
    { value: 'market', label: '集市', icon: '🛒' },
    { value: 'park', label: '公园', icon: '🌳' },
    { value: 'local_specialty', label: '地方特色', icon: '🏮' },
  ];

  const reminderTimes = [
    { value: '08:00', label: '早上 8:00' },
    { value: '09:00', label: '早上 9:00' },
    { value: '10:00', label: '早上 10:00' },
    { value: '18:00', label: '晚上 6:00' },
    { value: '19:00', label: '晚上 7:00' },
    { value: '20:00', label: '晚上 8:00' },
  ];

  if (loading) {
    return <LoadingSpinner message="加载设置中..." />;
  }

  if (!preferences) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>设置</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>加载设置失败</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>设置</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>通知设置</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>推送通知</Text>
              <Text style={styles.settingDescription}>接收任务提醒和成就通知</Text>
            </View>
            <Switch
              value={preferences.notifications_enabled}
              onValueChange={(value) => updatePreference('notifications_enabled', value)}
              disabled={updating}
              trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
              thumbColor={preferences.notifications_enabled ? '#10B981' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>位置服务</Text>
              <Text style={styles.settingDescription}>用于推荐附近的探索地点</Text>
            </View>
            <Switch
              value={preferences.location_enabled}
              onValueChange={(value) => updatePreference('location_enabled', value)}
              disabled={updating}
              trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
              thumbColor={preferences.location_enabled ? '#3B82F6' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Task Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>任务偏好</Text>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.groupTitle}>偏好难度</Text>
            {difficultyOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionItem,
                  preferences.difficulty_preference === option.value && styles.selectedOption
                ]}
                onPress={() => updatePreference('difficulty_preference', option.value)}
                disabled={updating}>
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    preferences.difficulty_preference === option.value && styles.selectedOptionText
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.optionDescription,
                    preferences.difficulty_preference === option.value && styles.selectedOptionText
                  ]}>
                    {option.description}
                  </Text>
                </View>
                {preferences.difficulty_preference === option.value && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.groupTitle}>感兴趣的活动类型</Text>
            <View style={styles.activityGrid}>
              {activityTypes.map((activity) => (
                <TouchableOpacity
                  key={activity.value}
                  style={[
                    styles.activityItem,
                    preferences.activity_types?.includes(activity.value) && styles.selectedActivity
                  ]}
                  onPress={() => {
                    const currentTypes = preferences.activity_types || [];
                    const newTypes = currentTypes.includes(activity.value)
                      ? currentTypes.filter(type => type !== activity.value)
                      : [...currentTypes, activity.value];
                    updatePreference('activity_types', newTypes);
                  }}
                  disabled={updating}>
                  <Text style={styles.activityIcon}>{activity.icon}</Text>
                  <Text style={[
                    styles.activityLabel,
                    preferences.activity_types?.includes(activity.value) && styles.selectedActivityText
                  ]}>
                    {activity.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Reminder Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>提醒时间</Text>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.groupTitle}>每日任务提醒</Text>
            {reminderTimes.map((time) => (
              <TouchableOpacity
                key={time.value}
                style={[
                  styles.optionItem,
                  preferences.reminder_time === time.value && styles.selectedOption
                ]}
                onPress={() => updatePreference('reminder_time', time.value)}
                disabled={updating}>
                <Text style={[
                  styles.optionTitle,
                  preferences.reminder_time === time.value && styles.selectedOptionText
                ]}>
                  {time.label}
                </Text>
                {preferences.reminder_time === time.value && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
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
  section: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingGroup: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedOptionText: {
    color: '#10B981',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedActivity: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  activityIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  activityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  selectedActivityText: {
    color: '#10B981',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
  },
  bottomSpacing: {
    height: 20,
  },
});