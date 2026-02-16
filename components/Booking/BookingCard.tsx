import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomText from "../../universal/lightText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../constants/Colors";
import { IMAGE_URL } from "../../constants/apiEndpoints";
import moment from "moment";

type RootStackParamList = {
  eventDetail: undefined;
  // Add other screens as needed
};

const EventCard = ({ event }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const totalSpots = 28;
  const joinedSpots = 25;
  const progressPercentage = (joinedSpots / totalSpots) * 100;

  return (
    <View style={styles.card}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: IMAGE_URL + "/" + event.event_banner[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.almostFullBadge}>
          <CustomText style={styles.badgeText}>
            {event.booking_details.status.slice(0, 1) +
              event.booking_details.status.slice(1).toLowerCase()}
          </CustomText>
        </View>
      </View>

      {/* Title and Info */}
      <View>
        <View style={styles.titleContainer}>
          <Feather name="calendar" size={14} color="black" />
          <CustomText style={styles.titleName}>{event.event_title}</CustomText>
        </View>

        <View style={styles.titleContainer}>
          <Feather name="clock" size={14} color="black" />
          <CustomText style={styles.subLabel}>
            {moment(event.start_date).format("MMM DD, YYYY")} -{" "}
            {moment(event.end_date).format("MMM DD, YYYY")}
          </CustomText>
        </View>

        <View style={styles.titleContainer}>
          <Feather name="map-pin" size={14} color="black" />

          <CustomText style={styles.subLabel}>
            {event.event_location}
          </CustomText>
        </View>

        <View style={styles.titleContainer}>
          <Feather name="user" size={14} color="black" />
          <CustomText style={styles.subLabel}>
            {event.booking_details.slot_count} Person(s)
          </CustomText>
        </View>
      </View>

      {/* Footer Row */}
      <View style={styles.footerRow}>
        <View
          style={{
            height: 1,
            borderWidth: 1,
            borderColor: "#E8E8E8",
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 12,
          }}
        >
          <View>
            <CustomText style={styles.perPerson}>Booking ID</CustomText>
            <CustomText style={styles.progressText}>
              {event.booking_details.booking_uid}
            </CustomText>
          </View>
          <View>
            <CustomText style={styles.perPerson}>Total Paid</CustomText>
            <CustomText style={styles.progressText}>
              ₹{event.booking_details.total_amt}
            </CustomText>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.viewDetailsButton}
            onPress={() =>
              navigation.navigate("HomeStack", {
                screen: "eventDetail",
                params: { eventId: event.id },
              })
            }
          >
            <CustomText style={styles.viewDetailsText}>View Details</CustomText>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
            <Feather name="download" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
            <Feather name="share-2" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
  },

  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  almostFullBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#B8F7C8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#00330D",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  subLabel: {
    fontSize: 12,
    color: "#717171",
    marginTop: 2,
  },
  titleName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  SignupButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: "center",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: "#FF385C",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  progressText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginTop: 4,
  },
  perPerson: {
    fontSize: 13,
    fontWeight: "400",
    color: "#888",
  },
  footerRow: {
    marginBottom: 30,
  },
});
export default EventCard;
