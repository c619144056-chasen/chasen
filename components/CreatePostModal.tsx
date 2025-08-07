import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { X, MapPin, Image as ImageIcon, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { CommunityService } from '../services/communityService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onPost: (data: {
    content: string;
    imageUrl?: string;
    location?: string;
  }) => Promise<void>;
}

export default function CreatePostModal({
  visible,
  onClose,
  onPost
}: CreatePostModalProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [posting, setPosting] = useState(false);
  const [selectingImage, setSelectingImage] = useState(false);

  const handleAddImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('权限不足', '需要访问相册权限才能选择照片');
        return;
      }

      Alert.alert(
        '选择照片',
        '请选择照片来源',
        [
          { text: '取消', style: 'cancel' },
          { text: '相册', onPress: () => pickImageFromLibrary() },
          { text: '拍照', onPress: () => takePhoto() }
        ]
      );
    } catch (error) {
      console.error('请求权限错误:', error);
      Alert.alert('错误', '无法访问相机或相册');
    }
  };

  const pickImageFromLibrary = async () => {
    setSelectingImage(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // 直接使用本地URI
        setImages(prev => [...prev, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('选择照片错误:', error);
      Alert.alert('错误', '选择照片失败');
    } finally {
      setSelectingImage(false);
    }
  };

  const takePhoto = async () => {
    setSelectingImage(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('权限不足', '需要相机权限才能拍照');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // 直接使用本地URI
        setImages(prev => [...prev, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('拍照错误:', error);
      Alert.alert('错误', '拍照失败');
    } finally {
      setSelectingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('提示', '请输入动态内容');
      return;
    }

    setPosting(true);
    try {
      await onPost({
        content: content.trim(),
        imageUrl: images[0] || undefined, // 目前只支持一张图片
        location: location.trim() || undefined
      });
      
      // 重置表单
      setContent('');
      setImages([]);
      setLocation('');
      onClose();
    } catch (error) {
      console.error('发布动态错误:', error);
      Alert.alert('错误', '发布动态失败，请重试');
      // 即使失败也关闭模态框，让用户可以重新尝试
      onClose();
    } finally {
      setPosting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.title}>发布动态</Text>
            <TouchableOpacity
              onPress={handlePost}
              disabled={posting || !content.trim()}
              style={[
                styles.postButton,
                (!content.trim() || posting) && styles.disabledButton
              ]}>
              {posting ? (
                <LoadingSpinner size="small" message="" />
              ) : (
                <Text style={styles.postText}>发布</Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* 内容输入 */}
            <TextInput
              style={styles.contentInput}
              placeholder="分享您的户外探索体验..."
              placeholderTextColor="#9CA3AF"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={500}
            />
            
            <Text style={styles.characterCount}>
              {content.length}/500
            </Text>

            {/* 图片上传 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <ImageIcon size={16} color="#10B981" /> 添加图片
              </Text>
              
              {images.length > 0 && (
                <ScrollView horizontal style={styles.imagesContainer} showsHorizontalScrollIndicator={false}>
                  {images.map((image, index) => (
                    <View key={index} style={styles.imageItem}>
                      <Image source={{ uri: image }} style={styles.imagePreview} />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}>
                        <Trash2 size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )}
              
              <TouchableOpacity 
                style={[styles.imageUploadButton, selectingImage && styles.disabledButton]}
                onPress={handleAddImage}
                disabled={selectingImage}>
                {selectingImage ? (
                  <LoadingSpinner size="small" message="" />
                ) : (
                  <>
                    <ImageIcon size={24} color="#6B7280" />
                    <Text style={styles.imageUploadText}>
                      {images.length > 0 ? '添加更多图片' : '添加图片让动态更精彩'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* 位置信息 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <MapPin size={16} color="#10B981" /> 位置信息
              </Text>
              <TextInput
                style={styles.locationInput}
                placeholder="添加位置信息（可选）"
                placeholderTextColor="#9CA3AF"
                value={location}
                onChangeText={setLocation}
                maxLength={100}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cancelButton: {
    padding: 4,
  },
  cancelText: {
    fontSize: 16,
    color: '#6B7280',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  postButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  contentInput: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  locationInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  imageUploadButton: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  imageUploadText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  imagesContainer: {
    marginBottom: 16,
  },
  imageItem: {
    position: 'relative',
    marginRight: 12,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
});