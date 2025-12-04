// universal/addComment.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../universal/text';

interface AddCommentProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
  userProfile?: string | null;
  userInitials?: string;
  backgroundColor?: string;
}

const AddComment: React.FC<AddCommentProps> = ({ 
  onSubmit, 
  placeholder = "Add a comment...",
  userProfile = null,
  userInitials = "U",
  backgroundColor = "#6366F1"
}) => {
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (): void => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={[styles.profileCircle, { backgroundColor }]}>
          <CustomText style={styles.initials}>{userInitials}</CustomText>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={comment}
          onChangeText={setComment}
          multiline
          maxLength={500}
        />
      </View>

      <TouchableOpacity 
        style={[styles.sendButton, !comment.trim() && styles.sendButtonDisabled]}
        onPress={handleSubmit}
        disabled={!comment.trim()}
      >
        <Ionicons 
          name="send" 
          size={20} 
          color={comment.trim() ? "#EF4444" : "#CBD5E1"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
    
  },
  profileContainer: {
    width: 40,
    height: 40,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    color: '#1E293B',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default AddComment;