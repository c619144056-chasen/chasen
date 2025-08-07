import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle, Share2, MapPin, Users, Plus, UserPlus } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { CommunityService } from '@/services/communityService';
import { GroupService, InterestGroup } from '@/services/groupService';
import { CommunityPost } from '@/types/task';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import CreatePostModal from '@/components/CreatePostModal';
import CommentModal from '@/components/CommentModal';
import CreateGroupModal from '@/components/CreateGroupModal';
import GroupChatModal from '@/components/GroupChatModal';
import { useEffect, useState } from 'react';

export default function CommunityScreen() {
  const { user } = useAuth();
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [groupChatModalVisible, setGroupChatModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<InterestGroup | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [userGroups, setUserGroups] = useState<InterestGroup[]>([]);

  const groupColors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'];

  useEffect(() => {
    loadCommunityPosts();
    if (user) {
      loadUserGroups();
    }
  }, []);

  const loadCommunityPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: postsError } = await CommunityService.getCommunityPosts(20, 0);
      if (postsError) throw postsError;
      setCommunityPosts(data || []);
    } catch (error) {
      console.error('加载社区动态错误:', error);
      setError('加载社区动态失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCommunityPosts();
    setRefreshing(false);
  };

  const loadUserGroups = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await GroupService.getUserGroups(user.id);
      if (error) throw error;
      
      const groups = data?.map(item => item.group).filter(Boolean) || [];
      setUserGroups(groups);
    } catch (error) {
      console.error('加载用户小组错误:', error);
    }
  };

  const handleCreateGroup = async (groupData: {
    name: string;
    description: string;
    category: string;
    isPrivate: boolean;
  }) => {
    if (!user) return;
    
    try {
      const { data, error } = await GroupService.createGroup(user.id, groupData);
      if (error) throw error;
      
      if (data) {
        setUserGroups(prev => [data, ...prev]);
      }
      
      Alert.alert('创建成功', '小组已创建，开始邀请朋友加入吧！');
    } catch (error) {
      console.error('创建小组错误:', error);
      throw error;
    }
  };

  const handleGroupPress = (group: InterestGroup) => {
    setSelectedGroup(group);
    setGroupChatModalVisible(true);
  };

  const handleLikePost = async (postId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await CommunityService.likePost(user.id, postId);
      if (error) throw error;
      
      // 更新本地状态
      setCommunityPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                likes_count: (data as any)?.liked 
                  ? post.likes_count + 1 
                  : post.likes_count - 1 
              }
            : post
        )
      );
    } catch (error) {
      console.error('点赞错误:', error);
      Alert.alert('错误', '点赞失败，请重试');
    }
  };

  const handleCommentPress = (post: CommunityPost) => {
    setSelectedPost(post);
    setCommentModalVisible(true);
  };

  const handleSharePost = async (postId: string) => {
    if (!user) return;
    
    try {
      const { error } = await CommunityService.sharePost(user.id, postId);
      if (error) throw error;
      
      // 更新本地状态
      setCommunityPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, shares_count: post.shares_count + 1 }
            : post
        )
      );
      
      Alert.alert('分享成功', '动态已分享');
    } catch (error) {
      console.error('分享错误:', error);
      Alert.alert('错误', '分享失败，请重试');
    }
  };

  const handleCreatePost = async (postData: {
    content: string;
    imageUrl?: string;
    location?: string;
  }) => {
    if (!user) return;
    
    try {
      const { data, error } = await CommunityService.createPost(user.id, postData);
      if (error) throw error;
      
      // 添加新动态到列表顶部
      if (data) {
        setCommunityPosts(prev => [data, ...prev]);
      }
      
      Alert.alert('发布成功', '您的动态已成功发布！');
    } catch (error) {
      console.error('发布动态错误:', error);
      throw error;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '刚刚';
    if (diffInHours < 24) return `${diffInHours}小时前`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}天前`;
    return postTime.toLocaleDateString();
  };

  const PostCard = ({ post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image 
          source={{ 
            uri: post.user_profile?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          }} 
          style={styles.userAvatar} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {post.user_profile?.username || '匿名用户'}
          </Text>
          <Text style={styles.userLevel}>
            Level {post.user_profile?.level || 1} {post.user_profile?.title || '自然新手'}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(post.created_at)}</Text>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.image_url && (
        <Image source={{ uri: post.image_url }} style={styles.postImage} />
      )}

      {post.location && (
        <View style={styles.postLocation}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.locationText}>{post.location}</Text>
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLikePost(post.id)}>
          <Heart size={18} color="#EF4444" />
          <Text style={styles.actionText}>{post.likes_count}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleCommentPress(post)}>
          <MessageCircle size={18} color="#6B7280" />
          <Text style={styles.actionText}>{post.comments_count}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleSharePost(post.id)}>
          <Share2 size={18} color="#6B7280" />
          <Text style={styles.actionText}>{post.shares_count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const GroupCard = ({ group }) => (
    <TouchableOpacity 
      style={[styles.groupCard, { borderLeftColor: groupColors[Math.floor(Math.random() * groupColors.length)] }]}
      onPress={() => handleGroupPress(group)}>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <View style={styles.groupMeta}>
          <Users size={14} color="#6B7280" />
          <Text style={styles.memberCount}>{group.member_count} 成员</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return <LoadingSpinner message="正在加载社区动态..." />;
  }

  if (error && communityPosts.length === 0) {
    return <ErrorMessage message={error} onRetry={loadCommunityPosts} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>探索社区</Text>
              <Text style={styles.headerSubtitle}>与志同道合的伙伴分享户外体验</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => setCreateGroupModalVisible(true)}>
                <UserPlus size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => setCreatePostModalVisible(true)}>
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* User Groups */}
        {userGroups.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>我的小组</Text>
            {userGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </View>
        )}

        {/* Community Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>社区动态</Text>
          {communityPosts.length > 0 ? (
            communityPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>暂无社区动态</Text>
              <Text style={styles.emptySubtext}>成为第一个分享的人吧！</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <CreatePostModal
        visible={createPostModalVisible}
        onClose={() => setCreatePostModalVisible(false)}
        onPost={handleCreatePost}
      />

      <CreateGroupModal
        visible={createGroupModalVisible}
        onClose={() => setCreateGroupModalVisible(false)}
        onCreateGroup={handleCreateGroup}
      />

      {selectedGroup && (
        <GroupChatModal
          visible={groupChatModalVisible}
          onClose={() => {
            setGroupChatModalVisible(false);
            setSelectedGroup(null);
          }}
          group={selectedGroup}
        />
      )}

      <CommentModal
        visible={commentModalVisible}
        onClose={() => {
          setCommentModalVisible(false);
          setSelectedPost(null);
        }}
        postId={selectedPost?.id || ''}
        postAuthor={selectedPost?.user_profile?.username || ''}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  userLevel: {
    fontSize: 12,
    color: '#6B7280',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postContent: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  bottomSpacing: {
    height: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});