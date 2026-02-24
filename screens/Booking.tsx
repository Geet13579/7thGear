import Header from "../components/Booking/header";
import Container from "../universal/Container";
import FlatList from "../components/Booking/flatList";
import CardBody from "../components/Booking/card";
import { View, Animated, ScrollView } from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import { useCallback, useEffect, useState } from "react";
import { getRequest } from "../api/commonQuery";
import { GET_MY_BOOKINGS } from "../constants/apiEndpoints";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingPopup } from "../universal/popup";

const Home = () => {
  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("upcoming");

  const getBookings = async () => {
    try {
      setLoading(true);
      const res = await getRequest<{ status: boolean; data: any }>(
        `${GET_MY_BOOKINGS}?hosting_type=EVENT`,
      );
      if (res.status) {
        setBookings(res.data.eventData);
        setFilteredBookings(res.data.eventData[selectedCategory]);
      }
      console.log(res.data.eventData.upcoming);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBookings();
    }, []),
  );

  return (
    <Container>
      <LoadingPopup visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Animated.View
          style={[
            { gap: 15 },
            { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] },
          ]}
        >
          <Header />
          <FlatList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            bookings={bookings}
            setFilteredBookings={setFilteredBookings}
          />
        </Animated.View>

        {/* Changed slideFromTop to slideFromBottom */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] },
          ]}
        >
          <CardBody filteredBookings={filteredBookings} />
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default Home;
