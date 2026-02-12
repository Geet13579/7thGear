import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import CustomText from "../../universal/lightText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { padStartNumbers } from "../../utils/padStart";
import moment from "moment";
import { postRequest } from "../../api/commonQuery";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../../constants/apiEndpoints";
import { useApi } from "../../hooks/useApi";
import wishlistStore from "../../store/wishlistStore";
import { ErrorPopup, SuccessPopup } from "../../universal/popup";

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
};

type Props = {
  event: Event;
};

const EventCard = ({ event }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const wishlist = wishlistStore((state) => state.wishlist);
  const setWishlist = wishlistStore((state) => state.setWishlist);

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
        navigation.navigate("eventDetail", { eventId: event.id });
        break;
    }
  };

  const addToWishlist = async () => {
    try {
      setIsLoading(true);
      const res = await postRequest<{ status: boolean; message: string }>(
        ADD_TO_WISHLIST,
        { cat_uid: event.cat_uid, event_id: event.id },
      );

      if (res.status) {
        setWishlist({ ...wishlist, [event.id]: true });
        // setShowSuccess(true);
        // setSuccessMessage(res.message);
      }
    } catch (error) {
      if (error.message) {
        setShowError(true);
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWhishlist = async () => {
    console.log("remove");
    try {
      setIsLoading(true);
      console.log({ cat_uid: event.cat_uid, event_id: event.id });
      const res = await postRequest<{ status: boolean; message: string }>(
        REMOVE_FROM_WISHLIST,
        { cat_uid: event.cat_uid, event_id: event.id },
      );

      if (res.status) {
        setWishlist({ ...wishlist, [event.id]: false });
        // setShowSuccess(true);
        // setSuccessMessage(res.message);
      }
    } catch (error) {
      console.log(error);
      if (error.message) {
        setShowError(true);
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
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

        {event.type == "CONTEST" ? (
          <View style={styles.badge}>
            <CustomText style={styles.badgeText}>Contest</CustomText>
          </View>
        ) : (
          progressPercentage > 80 && (
            <View style={styles.badge}>
              <CustomText style={styles.badgeText}>Almost Full</CustomText>
            </View>
          )
        )}

        <TouchableOpacity
          style={styles.heartIcon}
          activeOpacity={0.7}
          onPress={() => {
            if (wishlist[event.id]) {
              removeFromWhishlist();
            } else {
              addToWishlist();
            }
          }}
        >
          <Entypo
            name="heart"
            size={18}
            color={wishlist[event.id] ? "#FF4444" : "#fff"}
          />
          {/* <Feather name="heart" size={18} color={wishlist[event.id] ? "#FF4444" : "#fff"} /> */}
        </TouchableOpacity>
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
          {padStartNumbers(event.totalSpots)}
        </CustomText>
      </View>

      <CustomText style={styles.price}>
        ₹{event.price.toLocaleString("en-IN")}{" "}
        <CustomText style={styles.perPerson}>/ Slot</CustomText>
      </CustomText>

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
