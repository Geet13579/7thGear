import React, { useEffect, useState } from "react";
import { Animated, ScrollView, View } from "react-native";
import Container from "../universal/Container";
import { LoadingPopup } from "../universal/popup";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import Header from "../components/participant-details/header";
import ParticipantDetailsFlatList from "../components/participant-details/flatList";
import NoDataFound from "../universal/NoDataFound";
import { getRequest } from "../api/commonQuery";
import { GET_PARTICIPANT_LIST } from "../constants/apiEndpoints";
import ParticipantCard from "../components/participant-details/ParticipantCard";
import { useFocusEffect } from "@react-navigation/native";

const filters = [
  {
    cat_name: "Participants",
    cat_uid: "participant",
  },
  // {
  //   cat_name: "Payment",
  //   cat_uid: "payments"
  // },
  {
    cat_name: "Chat Room",
    cat_uid: "chatroom",
  },
  {
    cat_name: "Multimedia",
    cat_uid: "multimedia",
  },
];

const ParticipantDetails = ({ route }: any) => {
  const { event_id } = route.params;
  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
  const [filter, setFilter] = useState(filters[0].cat_uid);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const getParticipants = async () => {
    try {
      setLoading(true);
      const res = await getRequest<{ status: boolean; data: any }>(
        `${GET_PARTICIPANT_LIST}?hosting_type=EVENT&event_id=${event_id}`,
      );

      console.log("participants", res.data);
      if (res.status) {
        setParticipants(res.data.eventData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(filter);

  useFocusEffect(
    React.useCallback(() => {
      if (filter === "participant") {
        getParticipants();
      }
    }, [event_id, filter]),
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
          <ParticipantDetailsFlatList
            filters={filters}
            filter={filter}
            setFilter={setFilter}
          />
        </Animated.View>

        {filter !== "participant" && <NoDataFound message="No Data Found" />}

        {/* Changed slideFromTop to slideFromBottom */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] },
          ]}
        >
          {filter === "participant" && (
            <>
              {participants?.map((participant: any) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                />
              ))}

              {participants?.length === 0 && (
                <NoDataFound message="No Participants Found" />
              )}
            </>
          )}
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default ParticipantDetails;
