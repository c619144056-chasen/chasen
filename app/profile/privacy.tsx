import React, { useState } from 'react';
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
import { ArrowLeft, Shield, Eye, EyeOff, Lock, Trash2, Download } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function PrivacyScreen() {
  const { user, signOut } = useAuth();
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [activitySharing, setActivitySharing] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  const handleDeleteAccount = () => {
    Alert.alert(
      '删除账户',
      '此操作将永久删除您的账户和所有数据，且无法恢复。确定要继续吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定删除',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              '最后确认',
              '请再次确认您要删除账户。这将删除您的所有任务记录、成就、社区动态等数据。',
              [
                { text: '取消', style: 'cancel' },
                {
                  text: '确定删除',
                  style: 'destructive',
                  onPress: () => {
                    // 这里应该调用删除账户的API
                    Alert.alert('提示', '账户删除功能即将上线');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      '导出数据',
      '我们将为您准备一份包含所有个人数据的文件，并通过邮件发送给您。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定导出',
          onPress: () => {
            Alert.alert('提示', '数据导出功能即将上线');
          }
        }
      ]
    );
  };

  const privacySettings = [
    {
      title: '个人资料可见性',
      description: '其他用户是否可以查看您的个人资料',
      value: profileVisibility,
      onValueChange: setProfileVisibility,
      icon: profileVisibility ? Eye : EyeOff,
    },
    {
      title: '位置信息分享',
      description: '在动态中分享位置信息',
      value: locationSharing,
      onValueChange: setLocationSharing,
      icon: Shield,
    },
    {
      title: '活动数据分享',
      description: '允许在排行榜中显示您的活动数据',
      value: activitySharing,
      onValueChange: setActivitySharing,
      icon: Shield,
    },
    {
      title: '数据收集',
      description: '允许收集使用数据以改进服务',
      value: dataCollection,
      onValueChange: setDataCollection,
      icon: Shield,
    },
  ];

  const privacyPolicySections = [
    {
      title: '信息收集',
      content: '我们收集您主动提供的信息（如用户名、邮箱）和使用应用时自动收集的信息（如任务完成记录、位置数据）。'
    },
    {
      title: '信息使用',
      content: '我们使用收集的信息来提供服务、改进用户体验、发送通知和生成个性化推荐。'
    },
    {
      title: '信息分享',
      content: '我们不会向第三方出售您的个人信息。仅在法律要求或获得您同意的情况下分享信息。'
    },
    {
      title: '数据安全',
      content: '我们采用行业标准的安全措施保护您的数据，包括加密传输和存储。'
    },
    {
      title: '您的权利',
      content: '您有权访问、更正、删除您的个人信息，也可以随时撤回同意或导出数据。'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>隐私与安全</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>隐私设置</Text>
          {privacySettings.map((setting, index) => (
            <View key={index} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <setting.icon size={20} color="#6B7280" />
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
              </View>
              <Switch
                value={setting.value}
                onValueChange={setting.onValueChange}
                trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
                thumbColor={setting.value ? '#10B981' : '#9CA3AF'}
              />
            </View>
          ))}
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>数据管理</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleExportData}>
            <View style={styles.actionLeft}>
              <Download size={20} color="#3B82F6" />
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>导出我的数据</Text>
                <Text style={styles.actionDescription}>下载您的所有个人数据</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleDeleteAccount}>
            <View style={styles.actionLeft}>
              <Trash2 size={20} color="#EF4444" />
              <View style={styles.actionContent}>
                <Text style={[styles.actionTitle, { color: '#EF4444' }]}>删除账户</Text>
                <Text style={styles.actionDescription}>永久删除账户和所有数据</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Privacy Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>隐私政策</Text>
          {privacyPolicySections.map((section, index) => (
            <View key={index} style={styles.policySection}>
              <Text style={styles.policyTitle}>{section.title}</Text>
              <Text style={styles.policyContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        {/* Security Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>安全建议</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Lock size={16} color="#10B981" />
              <Text style={styles.tipText}>定期更新密码，使用强密码</Text>
            </View>
            <View style={styles.tipItem}>
              <Shield size={16} color="#10B981" />
              <Text style={styles.tipText}>不要在公共场所分享敏感信息</Text>
            </View>
            <View style={styles.tipItem}>
              <Eye size={16} color="#10B981" />
              <Text style={styles.tipText}>定期检查隐私设置</Text>
            </View>
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
    flex: 1,
    marginRight: 16,
  },
  settingContent: {
    marginLeft: 12,
    flex: 1,
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
  actionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContent: {
    marginLeft: 12,
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
  policySection: {
    marginBottom: 16,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  policyContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});