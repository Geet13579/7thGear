import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { colors } from "../../../constants/Colors";
import CustomText from "../../../universal/lightText";

interface UpperSectionProps {
  style?: ViewStyle;
  heading: string;
  subHeading: string;
  location?: string; // Optional location parameter
  bg?: string;
  profile?: string;
  icon?: boolean;
  subHeadingColor?: string;
  timegap?: string;
  like_count?: number;
  is_liked?: boolean;
  replies?: any[];
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
          <Feather name="heart" size={20} color={colors.textSecondary} />
          <CustomText style={{ fontSize: 12, color: colors.textSecondary }}>
            {like_count} likes
          </CustomText>
          <TouchableOpacity style={{ paddingLeft: 10 }}>
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
