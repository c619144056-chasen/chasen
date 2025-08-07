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
import { X, Star, Camera, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { TaskService } from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface TaskCompletionModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (data: {
    photos: string[];
    notes: string;
    rating: number;
  }) => Promise<void>;
  task: any;
}

export default function TaskCompletionModal({
  visible,
  onClose,
  onComplete,
  task
}: TaskCompletionModalProps) {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(5);
  const [completing, setCompleting] = useState(false);
  const [selectingPhoto, setSelectingPhoto] = useState(false);
  const [outdoorCompleted, setOutdoorCompleted] = useState(true);
  const [socialCompleted, setSocialCompleted] = useState(true);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const handleAddPhoto = async () => {
    console.log('TaskCompletionModal: handleAddPhoto called');
    
    // 直接尝试打开相册，不使用Alert选择
    await pickImageFromLibrary();
  };

  const handleTakePhoto = async () => {
    console.log('TaskCompletionModal: handleTakePhoto called');
    
    await takePhoto();
  };

  const pickImageFromLibrary = async () => {
    console.log('TaskCompletionModal: pickImageFromLibrary called');
    setSelectingPhoto(true);
    setPhotoError(null);
    
    try {
      console.log('TaskCompletionModal: Requesting media library permissions...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('TaskCompletionModal: Permission status:', status);
      
      if (status !== 'granted') {
        console.log('TaskCompletionModal: Permission denied');
        setPhotoError('需要访问相册权限才能选择照片');
        return;
      }

      console.log('TaskCompletionModal: Launching image library...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      console.log('TaskCompletionModal: Image picker result:', result);
      
      if (!result.canceled && result.assets[0]) {
        console.log('TaskCompletionModal: Image selected:', result.assets[0].uri);
        setPhotos(prev => [...prev, result.assets[0].uri]);
        setPhotoError(null);
      } else {
        console.log('TaskCompletionModal: Image selection canceled or failed');
      }
    } catch (error) {
      console.error('TaskCompletionModal: pickImageFromLibrary error:', error);
      setPhotoError('选择照片失败，请重试');
    } finally {
      console.log('TaskCompletionModal: pickImageFromLibrary finished');
      setSelectingPhoto(false);
    }
  };

  const takePhoto = async () => {
    console.log('TaskCompletionModal: takePhoto called');
    setSelectingPhoto(true);
    setPhotoError(null);
    
    try {
      console.log('TaskCompletionModal: Requesting camera permissions...');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log('TaskCompletionModal: Camera permission status:', status);
      
      if (status !== 'granted') {
        console.log('TaskCompletionModal: Camera permission denied');
        setPhotoError('需要相机权限才能拍照');
        return;
      }

      console.log('TaskCompletionModal: Launching camera...');
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('TaskCompletionModal: Camera result:', result);
      
      if (!result.canceled && result.assets[0]) {
        console.log('TaskCompletionModal: Photo taken:', result.assets[0].uri);
        setPhotos(prev => [...prev, result.assets[0].uri]);
        setPhotoError(null);
      } else {
        console.log('TaskCompletionModal: Photo capture canceled or failed');
      }
    } catch (error) {
      console.error('TaskCompletionModal: takePhoto error:', error);
      setPhotoError('拍照失败，请重试');
    } finally {
      console.log('TaskCompletionModal: takePhoto finished');
      setSelectingPhoto(false);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleComplete = async () => {
    // 计算分别获得的积分
    const outdoorPoints = outdoorCompleted ? Math.floor((task?.points || 50) * 0.6) : 0;
    const socialPoints = socialCompleted ? Math.floor((task?.points || 50) * 0.4) : 0;
    
    setCompleting(true);
    try {
      await onComplete({
        photos,
        notes,
        rating,
      });
      
      // 重置表单
      setPhotos([]);
      setNotes('');
      setRating(5);
      setOutdoorCompleted(true);
      setSocialCompleted(true);
      setPhotoError(null);
      onClose();
    } catch (error) {
      console.error('完成任务错误:', error);
      Alert.alert('错误', '完成任务失败，请重试');
    } finally {
      setCompleting(false);
    }
  };

  const renderStarRating = () => {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>任务体验评分</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}>
              <Star
                size={32}
                color={star <= rating ? '#F59E0B' : '#E5E7EB'}
                fill={star <= rating ? '#F59E0B' : 'transparent'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
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
            <Text style={styles.title}>完成任务</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.taskTitle}>{task?.title}</Text>
            
            {/* 照片上传 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Camera size={16} color="#10B981" /> 任务完成照片
              </Text>
              <Text style={styles.sectionDescription}>
                上传照片展示任务完成情况（可选）
              </Text>
              
              {photoError && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{photoError}</Text>
                </View>
              )}
              
              {photos.length > 0 && (
                <ScrollView horizontal style={styles.photosContainer} showsHorizontalScrollIndicator={false}>
                  {photos.map((photo, index) => (
                    <View key={index} style={styles.photoItem}>
                      <Image source={{ uri: photo }} style={styles.photoPreview} />
                      <TouchableOpacity
                        style={styles.removePhotoButton}
                        onPress={() => removePhoto(index)}>
                        <Trash2 size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )}
              
              <TouchableOpacity 
                style={[styles.photoUploadButton, selectingPhoto && styles.disabledButton]}
                onPress={handleAddPhoto}
                disabled={selectingPhoto}>
                {selectingPhoto ? (
                  <LoadingSpinner size="small" message="" />
                ) : (
                  <>
                    <Camera size={24} color="#6B7280" />
                    <Text style={styles.photoUploadText}>
                      {photos.length > 0 ? '添加更多照片' : '添加照片'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.photoUploadButton, selectingPhoto && styles.disabledButton]}
                onPress={handleTakePhoto}
                disabled={selectingPhoto}>
                {selectingPhoto ? (
                  <LoadingSpinner size="small" message="" />
                ) : (
                  <>
                    <Camera size={24} color="#6B7280" />
                    <Text style={styles.photoUploadText}>拍照</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* 评分 */}
            <View style={styles.section}>
              {renderStarRating()}
            </View>

            {/* 任务完成状态 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>任务完成情况</Text>
              
              <View style={styles.completionItem}>
                <TouchableOpacity
                  style={styles.completionToggle}
                  onPress={() => setOutdoorCompleted(!outdoorCompleted)}>
                  <View style={[
                    styles.checkbox,
                    outdoorCompleted && styles.checkedBox
                  ]}>
                    {outdoorCompleted && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.completionContent}>
                    <Text style={styles.completionTitle}>户外挑战内容</Text>
                    <Text style={styles.completionDescription}>
                      {task?.outdoor_goal_description || '探索自然，发现美好'}
                    </Text>
                    <Text style={styles.pointsInfo}>
                      +{Math.floor((task?.points || 50) * 0.6)} 户外积分
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.completionItem}>
                <TouchableOpacity
                  style={styles.completionToggle}
                  onPress={() => setSocialCompleted(!socialCompleted)}>
                  <View style={[
                    styles.checkbox,
                    socialCompleted && styles.checkedBox
                  ]}>
                    {socialCompleted && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.completionContent}>
                    <Text style={styles.completionTitle}>社交目标</Text>
                    <Text style={styles.completionDescription}>
                      {task?.social_goal_description || '与社区分享你的发现'}
                    </Text>
                    <Text style={styles.pointsInfo}>
                      +{Math.floor((task?.points || 50) * 0.4)} 社交积分
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* 心得笔记 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>心得笔记（可选）</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="分享您的探索心得和感受..."
                placeholderTextColor="#9CA3AF"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.completeButton, 
              completing && styles.disabledButton
            ]}
            onPress={handleComplete}
            disabled={completing}>
            {completing ? (
              <LoadingSpinner size="small" message="" />
            ) : (
              <Text style={styles.completeButtonText}>完成任务</Text>
            )}
          </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
  },
  completeButton: {
    backgroundColor: '#10B981',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.6,
  },
  completionItem: {
    marginBottom: 16,
  },
  completionToggle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completionContent: {
    flex: 1,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  completionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  pointsInfo: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  photoUploadButton: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  photoUploadText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  photosContainer: {
    marginBottom: 16,
  },
  photoItem: {
    position: 'relative',
    marginRight: 12,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
  },
});