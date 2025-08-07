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
} from 'react-native';
import { X, Users } from 'lucide-react-native';
import LoadingSpinner from './LoadingSpinner';

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateGroup: (data: {
    name: string;
    description: string;
    category: string;
    isPrivate: boolean;
  }) => Promise<void>;
}

export default function CreateGroupModal({
  visible,
  onClose,
  onCreateGroup
}: CreateGroupModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [isPrivate, setIsPrivate] = useState(false);
  const [creating, setCreating] = useState(false);

  const categories = [
    { value: 'general', label: '综合讨论' },
    { value: 'photography', label: '摄影交流' },
    { value: 'hiking', label: '徒步登山' },
    { value: 'cycling', label: '骑行运动' },
    { value: 'nature', label: '自然观察' },
    { value: 'culture', label: '文化探索' },
    { value: 'food', label: '美食发现' },
    { value: 'travel', label: '旅行分享' },
  ];

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('提示', '请输入小组名称');
      return;
    }

    if (!description.trim()) {
      Alert.alert('提示', '请输入小组描述');
      return;
    }

    setCreating(true);
    try {
      await onCreateGroup({
        name: name.trim(),
        description: description.trim(),
        category,
        isPrivate
      });
      
      // 重置表单
      setName('');
      setDescription('');
      setCategory('general');
      setIsPrivate(false);
      onClose();
    } catch (error) {
      console.error('创建小组错误:', error);
      Alert.alert('错误', '创建小组失败，请重试');
      // 即使失败也关闭模态框，让用户可以重新尝试
      onClose();
    } finally {
      setCreating(false);
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
            <Text style={styles.title}>创建小组</Text>
            <TouchableOpacity
              onPress={handleCreate}
              disabled={creating || !name.trim() || !description.trim()}
              style={[
                styles.createButton,
                (!name.trim() || !description.trim() || creating) && styles.disabledButton
              ]}>
              {creating ? (
                <LoadingSpinner size="small" message="" />
              ) : (
                <Text style={styles.createText}>创建</Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* 小组名称 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>小组名称 *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="为你的小组起个好名字"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                maxLength={50}
              />
              <Text style={styles.characterCount}>{name.length}/50</Text>
            </View>

            {/* 小组描述 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>小组描述 *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="介绍一下这个小组的主题和目标..."
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={200}
              />
              <Text style={styles.characterCount}>{description.length}/200</Text>
            </View>

            {/* 小组分类 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>小组分类</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[
                      styles.categoryItem,
                      category === cat.value && styles.selectedCategory
                    ]}
                    onPress={() => setCategory(cat.value)}>
                    <Text style={[
                      styles.categoryText,
                      category === cat.value && styles.selectedCategoryText
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* 隐私设置 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>隐私设置</Text>
              <TouchableOpacity
                style={[styles.privacyOption, !isPrivate && styles.selectedPrivacy]}
                onPress={() => setIsPrivate(false)}>
                <View style={styles.privacyContent}>
                  <Text style={styles.privacyTitle}>公开小组</Text>
                  <Text style={styles.privacyDescription}>任何人都可以找到并加入这个小组</Text>
                </View>
                {!isPrivate && <View style={styles.selectedIndicator} />}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.privacyOption, isPrivate && styles.selectedPrivacy]}
                onPress={() => setIsPrivate(true)}>
                <View style={styles.privacyContent}>
                  <Text style={styles.privacyTitle}>私密小组</Text>
                  <Text style={styles.privacyDescription}>只有受邀请的用户才能加入</Text>
                </View>
                {isPrivate && <View style={styles.selectedIndicator} />}
              </TouchableOpacity>
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
  createButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createText: {
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
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
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedCategory: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  privacyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  selectedPrivacy: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
});