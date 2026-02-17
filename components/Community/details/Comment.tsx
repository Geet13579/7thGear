import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { colors } from "../../../constants/Colors";
import CustomText from "../../../universal/lightText";
import { postRequest } from "../../../api/commonQuery";
import { USER_LIKE_A_COMMENT } from "../../../constants/apiEndpoints";

interface UpperSectionProps {
  heading: string;
  subHeading: string;
  location?: string; // Optional location parameter
  subHeadingColor?: string;
  style?: ViewStyle;
  timegap?: string;
  like_count?: number;
  is_liked?: boolean;
  replies?: any[];
  bg?: string;
  profile?: string;
  icon?: boolean;
  setComments: (comments: any) => void;
  event_id: string;
  post_id: string;
  comment_id: string;
  onReply: (username: string) => void;
}

const Comment: React.FC<UpperSectionProps> = ({
  heading,
  subHeading,
  location,
  style,
  bg,
  profile,
  icon,
  subHeadingColor,
  timegap,
  like_count,
  is_liked,
  replies,
  setComments,
  event_id,
  post_id,
  comment_id,
  onReply,
}) => {
  const styles = StyleSheet.create({
    upperSection: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      ...style,
      backgroundColor: icon ? "#F7FAFE" : "transparent",
      borderRadius: 12,
      flex: 1,
      flexGrow: 1,
      width: "100%",
    },
    iconItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    almostFullBadge: {
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    badgeText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
    titleName: {
      fontSize: 14,
      fontWeight: "600",
      color: "#222",
    },
    subLabel: {
      fontSize: 12,
      color: subHeadingColor || colors.textSecondary,
      fontWeight: "400",
    },
    iconRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      marginTop: 0,
    },
    iconWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginRight: 8,
    },
  });

  const [loading, setLoading] = useState(false);

  const likeAComment = async () => {
    try {
      setLoading(true);
      const res = await postRequest<{ status: boolean }>(USER_LIKE_A_COMMENT, {
        post_id,
        event_id,
        comment_id,
      });
      if (res.status) {
        setComments((prev) =>
          prev.map((item) =>
            item.id === comment_id
              ? {
                  ...item,
                  is_liked: !item.is_liked,
                  like_count: Boolean(item.is_liked)
                    ? Number(item.like_count) - 1
                    : Number(item.like_count) + 1,
                }
              : item,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.upperSection}>
      <View style={styles.almostFullBadge}>
        {!icon ? (
          <CustomText style={styles.badgeText}>{profile}</CustomText>
        ) : (
          <Image
            source={{ uri: profile }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        )}
      </View>

      <View style={{ flex: 1, flexShrink: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <CustomText style={styles.titleName}>{heading}</CustomText>
          <Text
            style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}
          >
            {timegap}
          </Text>
        </View>

        <View style={[styles.iconRow, { flexWrap: "wrap" }]}>
          {subHeading && (
            <View style={[styles.iconWrapper, { flex: 1, flexShrink: 1 }]}>
              {/* <EvilIcons name="user" size={18} color={colors.textSecondary} /> */}
              <CustomText
                style={[styles.subLabel, { flexWrap: "wrap", flexShrink: 1 }]}
              >
                {subHeading}
              </CustomText>
            </View>
          )}
          {location && (
            <CustomText style={styles.subLabel}> {location}</CustomText>
          )}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            gap: 4,
          }}
        >
          <TouchableOpacity
            style={[styles.iconItem, loading && { opacity: 0.5 }]}
            onPress={likeAComment}
            activeOpacity={0.8}
            disabled={loading}
          >
            <FontAwesome
              name={is_liked ? "heart" : "heart-o"}
              size={16}
              color={is_liked ? colors.primary : colors.text}
            />
            <CustomText style={{ fontSize: 12, color: colors.textSecondary }}>
              {like_count} {like_count === 1 ? "like" : "likes"}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={() => onReply(heading)}
          >
            <CustomText style={{ fontSize: 12, color: colors.textSecondary }}>
              Reply
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Comment;
