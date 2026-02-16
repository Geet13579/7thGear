import React, { useState } from "react";
import Container from "../universal/Container";
import { getRequest } from "../api/commonQuery";
import { GET_MY_HOSTINGS, IMAGE_URL } from "../constants/apiEndpoints";
import { useFocusEffect } from "@react-navigation/native";
import MyHostingCard from "../components/myhostings/MyHostingCard";
import NoDataFound from "../universal/NoDataFound";
import Header from "../components/myhostings/Header";

const MyHostings = () => {
  const [events, setEvents] = useState([]);

  const getMyHostings = async () => {
    try {
      const response = await getRequest<{ status: boolean; data: any }>(
        `${GET_MY_HOSTINGS}?hosting_type=EVENT`,
      );
      
      if (response.status) {
        setEvents(
          response.data.map((item) => {
            return {
              id: item.id,
              title: item.event_title,
              location: item.event_location,
              date: item.start_date,
              price: Number(item.price),
              totalSpots: Number(item.slot_count),
              joinedSpots: Number(item.slot_count - item.remamining_slot) || 0,
              image: { uri: IMAGE_URL + item.event_banner[0] },
              cat_uid: item.cat_uid,
              admin_status: item.admin_status
            };
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getMyHostings();
    }, []),
  );

  return (
    <Container>
      <Header />
      {events.map((event) => (
        <MyHostingCard key={event.id} event={event} />
      ))}

      {events.length === 0 && <NoDataFound message="No Hostings Found" />}
    </Container>
  );
};

export default MyHostings;
