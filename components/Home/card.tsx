import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Description from "../../universal/subTitle";
import { colors } from "../../constants/Colors";
import EventCard from "./EventCard";
import UpperSection from "../../universal/UpperSection";
import Title from "../../universal/Title";
import selectedCategoryStore from "../../store/selectedCategory";
import { getRequest } from "../../api/commonQuery";
import {
  GET_EVENTS_BY_CATEGORY,
  IMAGE_URL,
} from "../../constants/apiEndpoints";
import { LoadingPopup } from "../../universal/popup";
import { useFocusEffect } from "@react-navigation/native";
import NoDataFound from "../../universal/NoDataFound";
import wishlistStore from "../../store/wishlistStore";
import useAuthStore from "../../store/authenticationStore";

const EventArray = [
  {
    id: "1",
    title: "Biking Adventure",
    location: "Manali, Himachal Pradesh",
    date: "Nov 15-20, 2025",
    price: 8999,
    totalSpots: 28,
    joinedSpots: 25,
    image: require("../../assets/images/event-images/image.jpg"),
    type: "BIKING",
  },
  {
    id: "2",
    title: "Mountain Trek",
    location: "Kasol, Himachal Pradesh",
    date: "Dec 05-10, 2025",
    price: 12999,
    totalSpots: 20,
    joinedSpots: 12,
    image: require("../../assets/images/event-images/image.jpg"),
    type: "TREKKING",
  },

  {
    id: "3",
    title: "Mountain Trek",
    location: "Kasol, Himachal Pradesh",
    date: "Dec 05-10, 2025",
    price: 12999,
    totalSpots: 20,
    joinedSpots: 12,
    image: require("../../assets/images/event-images/image.jpg"),
    type: "TREKKING",
  },
  {
    id: "4",
    title: "Photography Contest",
    location: "Online",
    date: "Jan 01-31, 2026",
    price: 499,
    totalSpots: 100,
    joinedSpots: 80,
    image: require("../../assets/images/event-images/image.jpg"),
    type: "CONTEST",
  },
];

const RecentInsurance = () => {
  const selectedCategory = selectedCategoryStore(
    (state) => state.selectedCategory,
  );
  const user = useAuthStore((state) => state.user);
  const setWishlist = wishlistStore((state) => state.setWishlist);
  const wishlist = wishlistStore((state) => state.wishlist);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await getRequest<{ status: boolean; data: any }>(
        `${GET_EVENTS_BY_CATEGORY}?category_uid=${selectedCategory}&user_id=${user?.id}&page=1&limit=10`,
      );

      if (response.status) {
        const eventsInWishlist = {};
        setEvents(
          response.data.map((item) => {
            if (item.in_wishlist) {
              eventsInWishlist[item.id] = true;
            } else {
              eventsInWishlist[item.id] = false;
            }

            return {
              id: item.id,
              title: item.event_title,
              location: item.event_location,
              start_date: item.start_date,
              end_date: item.end_date,
              price: Number(item.price),
              totalSpots: Number(item.slot_count),
              joinedSpots: Number(item.slot_count - item.remamining_slot) || 0,
              image: { uri: IMAGE_URL + item.event_banner[0] },
              type: selectedCategory,
              cat_uid: item.cat_uid,
              in_wishlist: item.in_wishlist,
            };
          }),
        );

        setWishlist({ ...wishlist, ...eventsInWishlist });
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setEvents([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (selectedCategory) {
        getEvents();
      }
    }, [selectedCategory]),
  );

  return (
    <>
      <LoadingPopup visible={loading} />
      <View style={styles.header}>
        <UpperSection style={{ paddingTop: 20 }}>
          <Title title="Join Experiences" color={colors.primary} />
          <Description
            description="Discover unique adventures near you"
            color={colors.textSecondary}
          />
        </UpperSection>
      </View>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      {events.length === 0 && <NoDataFound message="No Events Posted Yet." />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noEvents: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default RecentInsurance;
