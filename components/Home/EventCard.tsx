import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomText from "../../universal/lightText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  eventDetail: undefined;
  // Add other screens as needed
};


const EventCard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const totalSpots = 28;
  const joinedSpots = 25;
  const progressPercentage = (joinedSpots / totalSpots) * 100;

  return (
    <TouchableOpacity style={styles.card} 
    onPress={() => navigation.navigate("eventDetail")}
    >
     

    
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
        
          source={require("../../assets/images/event-images/image.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.almostFullBadge}>
          <CustomText style={styles.badgeText}>Almost full</CustomText>
        </View>
        <TouchableOpacity style={styles.heartIcon}>
          <Feather name="heart" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Title and Info */}
     <View>
        <CustomText style={styles.titleName}>Biking</CustomText>
        <CustomText style={styles.subLabel}>Manali, Himachal Pradesh</CustomText>
        <CustomText style={styles.subLabel}>Nov 15-20, 2025</CustomText>

        {/* Progress Bar Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
          <CustomText style={styles.progressText}>{joinedSpots}/{totalSpots} joined</CustomText>
        </View>
      </View>

      {/* Footer Row */}
      <View style={styles.footerRow}>
               <CustomText style={styles.price}>₹8,999 <CustomText style={styles.perPerson}>per person</CustomText></CustomText>

      </View>
    </TouchableOpacity>
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
  progressSection: {
    marginTop: 12,
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12, // Space between progress bar and text
  },
  progressBarContainer: {
    flex: 1, // Takes remaining space
    height: 6,
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FF4444",
    borderRadius: 3,
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
    marginBottom: 8,
  },
});
export default EventCard;