import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../universal/lightText";

type RootStackParamList = {
  eventDetail: undefined;
};

const MAX_LENGTH = 120; // *** character limit ***

const EventCard = ({ description }: { description: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > MAX_LENGTH;
  const shownText = expanded ? description : description.slice(0, MAX_LENGTH);

  return (
    <View style={styles.container}>

      {/* Icons Row */}
      <View style={styles.iconRow}>
        <View style={styles.iconItem}>
          <Feather name="heart" size={20} />
          <CustomText>234</CustomText>
        </View>

        <View style={styles.iconItem}>
          <Ionicons name="chatbox-outline" size={20} />
          <CustomText>234</CustomText>
        </View>

        <View style={styles.iconItem}>
          <Feather name="send" size={20} />
          <CustomText>234</CustomText>
        </View>
      </View>

      {/* Description with View More/Less */}
      <View>
        <CustomText style={styles.descriptionText}>
          {shownText}
          {!expanded && isLong ? "..." : ""}
             {isLong && (
          <Pressable onPress={() => setExpanded(!expanded)}>
            <CustomText style={styles.viewMoreText}>
              {expanded ? "View less" : "View more"}
            </CustomText>
          </Pressable>
        )}
        </CustomText>

     
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  iconRow: {
    flexDirection: "row",
    gap: 20,
  },

  iconItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  descriptionText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    fontFamily: "Geist-medium",
    lineHeight: 20,
  },

  viewMoreText: {
    color: "rgba(0, 122, 255, 1)",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 10,
    
  },
});

export default EventCard;
