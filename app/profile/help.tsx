import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MessageCircle, Mail, Phone, ExternalLink, CircleHelp as HelpCircle, Book, Users } from 'lucide-react-native';

export default function HelpScreen() {
  const handleContactSupport = () => {
    Alert.alert(
      '联系客服',
      '请选择联系方式',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '发送邮件', 
          onPress: () => Linking.openURL('mailto:support@naturejourney.com?subject=用户反馈')
        },
        { 
          text: '在线客服', 
          onPress: () => Alert.alert('提示', '在线客服功能即将上线')
        },
      ]
    );
  };

  const handleOpenFAQ = () => {
    Alert.alert('提示', 'FAQ页面即将上线');
  };

  const handleJoinCommunity = () => {
    Alert.alert('提示', '社区论坛功能即将上线');
  };

  const faqItems = [
    {
      question: '如何开始我的第一个任务？',
      answer: '在首页点击"领取今日任务"，系统会为您生成个性化的户外探索任务。完成任务后记得上传照片获得积分！'
    },
    {
      question: '任务完成后如何获得积分？',
      answer: '完成任务时需要上传至少一张照片作为完成证明，并可以添加心得笔记和评分。提交后系统会自动发放积分。'
    },
    {
      question: '如何解锁更多成就？',
      answer: '成就会根据您的活动自动解锁，包括完成任务数量、连续天数、社区互动等。查看成就页面了解解锁条件。'
    },
    {
      question: '可以修改任务难度吗？',
      answer: '可以在设置中调整偏好难度，系统会根据您的等级和偏好生成合适的任务。'
    },
    {
      question: '如何在社区分享我的探索体验？',
      answer: '在社区页面点击"+"按钮发布动态，可以添加照片、文字和位置信息分享您的户外体验。'
    },
    {
      question: '忘记完成任务怎么办？',
      answer: '没关系！任务没有严格的时间限制，您可以按自己的节奏完成。明天会生成新的任务。'
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: '在线客服',
      description: '工作日 9:00-18:00',
      color: '#10B981',
      onPress: () => Alert.alert('提示', '在线客服功能即将上线')
    },
    {
      icon: Mail,
      title: '邮件支持',
      description: 'support@naturejourney.com',
      color: '#3B82F6',
      onPress: () => Linking.openURL('mailto:support@naturejourney.com?subject=用户反馈')
    },
    {
      icon: Users,
      title: '社区论坛',
      description: '与其他用户交流',
      color: '#F59E0B',
      onPress: handleJoinCommunity
    }
  ];

  const FAQItem = ({ item, index }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
    </View>
  );

  const ContactOption = ({ option }) => (
    <TouchableOpacity style={styles.contactOption} onPress={option.onPress}>
      <View style={[styles.contactIcon, { backgroundColor: option.color }]}>
        <option.icon size={24} color="#FFFFFF" />
      </View>
      <View style={styles.contactContent}>
        <Text style={styles.contactTitle}>{option.title}</Text>
        <Text style={styles.contactDescription}>{option.description}</Text>
      </View>
      <ExternalLink size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>帮助与反馈</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>快速帮助</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={handleOpenFAQ}>
              <Book size={24} color="#10B981" />
              <Text style={styles.quickActionText}>使用指南</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={handleContactSupport}>
              <MessageCircle size={24} color="#3B82F6" />
              <Text style={styles.quickActionText}>联系客服</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={handleJoinCommunity}>
              <Users size={24} color="#F59E0B" />
              <Text style={styles.quickActionText}>社区帮助</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>常见问题</Text>
          {faqItems.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </View>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>联系我们</Text>
          {contactOptions.map((option, index) => (
            <ContactOption key={index} option={option} />
          ))}
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>应用信息</Text>
          <View style={styles.appInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>版本号</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>更新时间</Text>
              <Text style={styles.infoValue}>2024年12月</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>开发团队</Text>
              <Text style={styles.infoValue}>自然启程团队</Text>
            </View>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>意见反馈</Text>
          <Text style={styles.feedbackText}>
            您的反馈对我们非常重要！如果您有任何建议或遇到问题，请通过以上方式联系我们。我们会认真对待每一条反馈，持续改进产品体验。
          </Text>
          <TouchableOpacity style={styles.feedbackButton} onPress={handleContactSupport}>
            <MessageCircle size={20} color="#FFFFFF" />
            <Text style={styles.feedbackButtonText}>发送反馈</Text>
          </TouchableOpacity>
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
  },
  quickActionText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  faqItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  appInfo: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#374151',
  },
  infoValue: {
    fontSize: 16,
    color: '#6B7280',
  },
  feedbackText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});