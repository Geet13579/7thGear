// universal/addComment.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ActivityIndicator,
  Platform,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../../universal/text";
import { colors } from "../../../constants/Colors";

interface AddCommentProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
  userProfile?: string | null;
  userInitials?: string;
  backgroundColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  inputRef?: React.RefObject<TextInput>;
  loading?: boolean;
  keyboardHeight?: number;
  replyDetails: {
    isAReply: boolean;
    username: string;
    parent_id: string;
  };
  setReplyDetails: (replyDetails: {
    isAReply: boolean;
    username: string;
    parent_id: string;
  }) => void;
}

const AddComment: React.FC<AddCommentProps> = ({
  onSubmit,
  placeholder = "Add a comment...",
  userProfile = null,
  userInitials = "U",
  backgroundColor = "#6366F1",
  value,
  onChangeText,
  inputRef,
  loading,
  keyboardHeight = 0,
  replyDetails,
  setReplyDetails,
}) => {
  const handleSubmit = (): void => {
    if (value.trim()) {
      onSubmit(value);
    }
  };

  const cancelReply = () => {
    onChangeText("");
    setReplyDetails({
      isAReply: false,
      username: "",
      parent_id: "",
    });
  };

  return (
    <View>
      {replyDetails.isAReply && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>
            Replying to {replyDetails.username}
          </Text>
          <TouchableOpacity onPress={cancelReply}>
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          styles.container,
          { marginBottom: Platform.OS === "android" ? keyboardHeight : 0 },
        ]}
      >
        <View style={styles.profileContainer}>
          <View style={[styles.profileCircle, { backgroundColor }]}>
            <CustomText style={styles.initials}>{userInitials}</CustomText>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            value={value}
            onChangeText={onChangeText}
            multiline
            maxLength={500}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.sendButton,
            (!value.trim() || loading) && styles.sendButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!value.trim() || loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Ionicons
              name="send"
              size={20}
              color={value.trim() ? "#EF4444" : "#CBD5E1"}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 12,
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  profileContainer: {
    width: 40,
    height: 40,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    color: "#1E293B",
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 4,
    justifyContent: "flex-end",
  },
  replyText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AddComment;
