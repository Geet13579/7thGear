import React from "react";
import Container from "../universal/Container";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/Colors";
import Header from "../components/wishlist/Header";
import Filters from "../components/wishlist/Filters";
import { getRequest } from "../api/commonQuery";
import { GET_WISHLIST_EVENTS, IMAGE_URL } from "../constants/apiEndpoints";
import { useFocusEffect } from "@react-navigation/native";
import EventCard from "../components/Home/EventCard";
import NoDataFound from "../universal/NoDataFound";
import wishlistStore from "../store/wishlistStore";
import { LoadingPopup } from "../universal/popup";

const Wishlist = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("ALL");
  const [events, setEvents] = React.useState([]);
  const setWishlist = wishlistStore((state: any) => state.setWishlist);
  const [loading, setLoading] = React.useState(false);

  const getWishList = async () => {
    try {
      setLoading(true);
      const response = await getRequest<{ status: boolean; data: any }>(
        GET_WISHLIST_EVENTS,
      );

      if (response.status) {
        const eventsInWishlist = {};
        setEvents(
          response.data.eventData.map((item: any) => {
            eventsInWishlist[item.event.id] = true;

            return {
              id: item.event.id,
              title: item.event.event_title,
              location: item.event.event_location,
              date: item.event.start_date,
              price: Number(item.event.price),
              totalSpots: Number(item.event.slot_count),
              joinedSpots:
                Number(item.event.slot_count - item.event.remamining_slot) || 0,
              image: { uri: IMAGE_URL + item.event.event_banner[0] },
              type: item.category.cat_name,
              cat_uid: item.category.cat_uid,
              in_wishlist: true,
            };
          }),
        );
        setWishlist(eventsInWishlist);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getWishList();
    }, []),
  );

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Header */}
          <Header />
          <Filters
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}

          {events.length === 0 && (
            <NoDataFound message="No Event Wishlisted Yet." />
          )}
        </View>
      </ScrollView>

      <LoadingPopup visible={loading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 10,
  },
});

export default Wishlist;
