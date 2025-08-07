import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Save } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService } from '@/services/profileService';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function EditProfileScreen() {
  const { user, userProfile, refreshProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [favoriteLocation, setFavoriteLocation] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setFavoriteLocation(userProfile.favorite_location || '');
      setBio(userProfile.bio || '');
      setAvatarUrl(userProfile.avatar_url || '');
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!user || !username.trim()) {
      Alert.alert('错误', '用户名不能为空');
      return;
    }

    setSaving(true);
    try {
      const updates = {
        username: username.trim(),
        favorite_location: favoriteLocation.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl || null,
      };

      const { error } = await ProfileService.updateProfile(user.id, updates);
      if (error) throw error;

      await refreshProfile();
      Alert.alert('成功', '个人资料已更新', [
        { text: '确定', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('更新个人资料错误:', error);
      Alert.alert('错误', '更新失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  if (!userProfile) {
    return <LoadingSpinner message="加载个人资料中..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>编辑个人资料</Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          style={[styles.saveButton, saving && styles.disabledButton]}>
          {saving ? (
            <LoadingSpinner size="small" message="" />
          ) : (
            <Save size={20} color="#10B981" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Text style={styles.sectionTitle}>头像</Text>
          <View style={styles.avatarContainer}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Camera size={32} color="#9CA3AF" />
              </View>
            )}
            <TouchableOpacity 
              style={styles.changeAvatarButton}
              onPress={() => Alert.alert('功能开发中', '头像上传功能即将上线')}>
              <Text style={styles.changeAvatarText}>更换头像</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本信息</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>用户名 *</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
              placeholder="请输入用户名"
              placeholderTextColor="#9CA3AF"
              maxLength={20}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>个人简介</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="介绍一下自己吧..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={200}
            />
            <Text style={styles.characterCount}>{bio.length}/200</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>最喜欢的地点</Text>
            <TextInput
              style={styles.textInput}
              value={favoriteLocation}
              onChangeText={setFavoriteLocation}
              placeholder="如：中央公园、西湖..."
              placeholderTextColor="#9CA3AF"
              maxLength={50}
            />
          </View>
        </View>

        {/* Account Info (Read-only) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>账户信息</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>邮箱</Text>
            <Text style={styles.readOnlyText}>{user?.email}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>等级</Text>
            <Text style={styles.readOnlyText}>
              Level {userProfile.level} {userProfile.title}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>加入时间</Text>
            <Text style={styles.readOnlyText}>
              {new Date(userProfile.join_date).toLocaleDateString()}
            </Text>
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
  saveButton: {
    padding: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },
  readOnlyText: {
    fontSize: 16,
    color: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  changeAvatarButton: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  changeAvatarText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});