import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Share } from "react-native";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import CustomText from "../../universal/lightText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { padStartNumbers } from "../../utils/padStart";
import moment from "moment";
import { useApi } from "../../hooks/useApi";
import { ErrorPopup, SuccessPopup } from "../../universal/popup";
import { SignupButton } from "../../universal/Button";
import Badge from "../../universal/Badge";

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
  cat_uid: string;
  in_wishlist: boolean;
  admin_status: "ACCEPTED" | "REJECTED" | "PENDING";
};

type Props = {
  event: Event;
};

const getBadge = ({ status }: { status: string }) => {
  if (status === "ACCEPTED") {
    return <Badge label="Approved" backgroundColor="#4CAF50" />;
  } else if (status === "REJECTED") {
    return <Badge label="Rejected" backgroundColor="#FF3B30" />;
  } else if (status === "PENDING") {
    return <Badge label="Pending" backgroundColor="#FFB800" />;
  }
};

const MyHostingCard = ({ event }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const progressPercentage = (event.joinedSpots / event.totalSpots) * 100;

  const {
    isLoading,
    showSuccess,
    showError,
    errorMessage,
    successMessage,
    setShowSuccess,
    setShowError,
    setErrorMessage,
    setSuccessMessage,
    handleErrorClose,
    setIsLoading,
    handleSuccessClose,
  } = useApi();

  const handleNavigation = () => {
    switch (event.type) {
      case "CONTEST":
        navigation.navigate("contestDetail", { eventId: event.id });
        break;
      default:
        navigation.navigate("HomeStack", {
          screen: "eventDetail",
          params: { eventId: event.id },
        });
        break;
    }
  };

  const shareEvent = async (eventId) => {
    const url = `https://travel7thgear.com/event/${eventId}`;

    await Share.share({
      message: `Check this event 👇\n${url}`,
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleNavigation}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      <View style={styles.imageContainer}>
        <Image source={event.image} style={styles.image} />
        <View style={styles.badge}>
          {getBadge({ status: event.admin_status })}
        </View>

        {/* {event.type == "CONTEST" ? (
          <View style={styles.badge}>
            <CustomText style={styles.badgeText}>Contest</CustomText>
          </View>
        ) : (
          progressPercentage > 80 && (
            <View style={styles.badge}>
              <CustomText style={styles.badgeText}>Almost Full</CustomText>
            </View>
          )
        )} */}
      </View>

      <CustomText style={styles.title}>{event.title}</CustomText>
      <View style={styles.row}>
        <Feather name="map-pin" size={10} color="#FF4444" />
        <CustomText style={styles.sub}>{event.location}</CustomText>
      </View>
      <View style={styles.row}>
        <Feather name="calendar" size={10} color="#000" />
        <CustomText style={styles.sub}>
          {moment(event.date).format("DD MMM YYYY")}
        </CustomText>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
        <CustomText style={styles.progressText}>
          {padStartNumbers(event.joinedSpots)} /{" "}
          {padStartNumbers(event.totalSpots)} Joined
        </CustomText>
      </View>

      <CustomText style={styles.price}>
        ₹{event.price.toLocaleString("en-IN")}{" "}
        <CustomText style={styles.perPerson}>/ Slot</CustomText>
      </CustomText>

      <View style={[styles.progressRow, { marginTop: 10 }]}>
        <View style={{ flex: 1 }}>
          <SignupButton title="Edit Details" onClick={() => {}} />
        </View>
        <TouchableOpacity
          style={styles.outlinedBtn}
          onPress={() =>
            navigation.navigate("HomeStack", {
              screen: "participantDetails",
              params: {
                event_id: event.id,
              },
            })
          }
        >
          <Ionicons name="eye-outline" size={24} color="#212121" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.outlinedBtn}
          onPress={() => shareEvent(event.id)}
        >
          <Ionicons name="share-social-outline" size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      <SuccessPopup
        visible={showSuccess}
        message={successMessage}
        onClose={handleSuccessClose}
      />
      <ErrorPopup
        visible={showError}
        message={errorMessage}
        onClose={handleErrorClose}
      />
    </TouchableOpacity>
  );
};

export default MyHostingCard;

const styles = StyleSheet.create({
  outlinedBtn: {
    borderColor: "#94A3B8",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  imageContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
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
    marginTop: 5,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
  },
  perPerson: {
    fontSize: 13,
    color: "#888",
  },
});
