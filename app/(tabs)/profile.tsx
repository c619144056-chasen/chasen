import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, ChevronRight, MapPin, Calendar, Target, ChartBar as BarChart3 } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/services/authService';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, userProfile, loading, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [updating, setUpdating] = useState(false);

  const updateUserSettings = async (key: string, value: boolean) => {
    if (!user || !userProfile) return;
    
    setUpdating(true);
    try {
      const updates = {};
      if (key === 'notifications') {
        updates['notifications_enabled'] = value;
      } else if (key === 'location') {
        updates['location_enabled'] = value;
      }
      
      const { error } = await AuthService.updateUserProfile(user.id, updates);
      if (error) throw error;
      
    } catch (error) {
      console.error('更新设置错误:', error);
      Alert.alert('错误', '更新设置失败，请重试');
      // 恢复原状态
      if (key === 'notifications') {
        setNotificationsEnabled(!value);
      } else if (key === 'location') {
        setLocationEnabled(!value);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    updateUserSettings('notifications', value);
  };

  const handleLocationToggle = (value: boolean) => {
    setLocationEnabled(value);
    updateUserSettings('location', value);
  };

  const menuItems = [
    {
      id: 1,
      title: '编辑个人资料',
      icon: Edit,
      color: '#10B981',
      onPress: () => router.push('/profile/edit'),
    },
    {
      id: 2,
      title: '成长轨迹',
      icon: BarChart3,
      color: '#8B5CF6',
      onPress: () => router.push('/profile/growth'),
    },
    {
      id: 3,
      title: '任务历史',
      icon: Target,
      color: '#F59E0B',
      onPress: () => router.push('/profile/task-history'),
    },
    {
      id: 4,
      title: '设置',
      icon: Settings,
      color: '#6B7280',
      onPress: () => router.push('/profile/settings'),
    },
    {
      id: 5,
      title: '帮助与反馈',
      icon: HelpCircle,
      color: '#EF4444',
      onPress: () => router.push('/profile/help'),
    },
    {
      id: 6,
      title: '隐私与安全',
      icon: Shield,
      color: '#6B7280',
      onPress: () => router.push('/profile/privacy'),
    },
  ];

  const handleSignOut = () => {
    Alert.alert(
      '退出登录',
      '确定要退出当前账户吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '确定', 
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('ProfileScreen: Starting sign out process');
              await signOut();
              console.log('ProfileScreen: Sign out completed, navigating to sign-in');
              // 强制导航到登录页面作为备用方案
              setTimeout(() => {
                router.replace('/(auth)/sign-in');
              }, 100);
            } catch (error) {
              console.error('退出登录错误:', error);
              Alert.alert('错误', '退出登录失败，请重试');
            }
          }
        },
      ]
    );
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  const MenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
      <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
        <item.icon size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.menuTitle}>{item.title}</Text>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingSpinner message="正在加载用户信息..." />;
  }

  if (!user || !userProfile) {
    return <ErrorMessage message="请先登录以查看个人资料" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ 
                uri: userProfile.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
              }} 
              style={styles.avatar} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userProfile.username}</Text>
              <Text style={styles.userLevel}>Level {userProfile.level} {userProfile.title}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
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
            <MapPin size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>{Math.floor(userProfile.total_distance)} km</Text>
            <Text style={styles.statLabel}>探索距离</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{formatJoinDate(userProfile.join_date)}</Text>
            <Text style={styles.statLabel}>加入时间</Text>
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>快速设置</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#10B981" />
              <Text style={styles.settingTitle}>推送通知</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              disabled={updating}
              trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
              thumbColor={notificationsEnabled ? '#10B981' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MapPin size={20} color="#3B82F6" />
              <Text style={styles.settingTitle}>位置服务</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={handleLocationToggle}
              disabled={updating}
              trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
              thumbColor={locationEnabled ? '#3B82F6' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Favorite Location */}
        {userProfile.favorite_location && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>最喜欢的地点</Text>
            <View style={styles.favoriteLocation}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
                }}
                style={styles.locationImage}
              />
              <Text style={styles.locationName}>{userProfile.favorite_location}</Text>
              <Text style={styles.locationDescription}>
                最常探索的户外空间，充满回忆的自然角落
              </Text>
            </View>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>更多功能</Text>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleSignOut}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>

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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    color: '#D1FAE5',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 14,
  },
  socialLevel: {
    fontSize: 14,
    color: '#D1FAE5',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 14,
    color: '#D1FAE5',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#D1FAE5',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  favoriteLocation: {
    alignItems: 'center',
  },
  locationImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 20,
  },
});