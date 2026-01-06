import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomText from "../../universal/lightText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Event = {
  id: string;
  title: string;
  location: string;
  date: string;
  price: number;
  totalSpots: number;
  joinedSpots: number;
  image: any;
  type: "BIKING" | "TREKKING" | "CONTEST";
};

type Props = {
  event: Event;
};

const EventCard = ({ event }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const progressPercentage =
    (event.joinedSpots / event.totalSpots) * 100;

  const handleNavigation = () => {
    switch (event.type) {
     
      case "CONTEST":
        navigation.navigate("contestDetail", { eventId: event.id });
        break;
        default:
        navigation.navigate("eventDetail", { eventId: event.id });
        break;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigation}>
      <View style={styles.imageContainer}>
        <Image source={event.image} style={styles.image} />

        {
        event.type == "CONTEST" ?
         <View style={styles.badge}>
            <CustomText style={styles.badgeText}>Contest</CustomText>
          </View>
        :

        progressPercentage > 80 && (
          <View style={styles.badge}>
            <CustomText style={styles.badgeText}>Almost Full</CustomText>
          </View>
        )}
        

        <View style={styles.heartIcon}>
          <Feather name="heart" size={18} color="#fff" />
        </View>
      </View>

      <CustomText style={styles.title}>{event.title}</CustomText>
      <CustomText style={styles.sub}>{event.location}</CustomText>
      <CustomText style={styles.sub}>{event.date}</CustomText>

      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>
        <CustomText style={styles.progressText}>
          {event.joinedSpots}/{event.totalSpots}
        </CustomText>
      </View>

      <CustomText style={styles.price}>
        ₹{event.price}{" "}
        <CustomText style={styles.perPerson}>per person</CustomText>
      </CustomText>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  imageContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#6366F1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  heartIcon: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  sub: {
    fontSize: 13,
    color: "#717171",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF4444",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },
  perPerson: {
    fontSize: 13,
    color: "#888",
  },
});
