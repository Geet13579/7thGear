import Header from "../components/Home/eventDetails/header";
import Details from "../components/Home/eventDetails/details";
import ImageSlider from "../universal/imageSlider";
import { ScrollView, Animated } from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import Container from "../universal/Container2";
import { useCallback, useEffect, useState } from "react";
import { getRequest } from "../api/commonQuery";
import { FETCH_EVENT_DETAILS, IMAGE_URL } from "../constants/apiEndpoints";
import { useApi } from "../hooks/useApi";
import { LoadingPopup } from "../universal/popup";
import useAuthStore from "../store/authenticationStore";
import { useFocusEffect } from "@react-navigation/native";

const EventDetail = ({ route }: any) => {
  const { eventId } = route.params;
  const user = useAuthStore.getState().user;

  console.log(user);

  const [eventDetails, setEventDetails] = useState<any>({});

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
    setIsLoading,
    handleErrorClose,
    handleSuccessClose,
  } = useApi();

  const getEventDetails = async () => {
    try {
      setIsLoading(true);
      console.log(
        `${FETCH_EVENT_DETAILS}?event_id=${eventId}&user_id=${user?.id}`,
      );
      const response = await getRequest<{ status: boolean; data: any }>(
        `${FETCH_EVENT_DETAILS}?event_id=${eventId}&user_id=${user?.id}`,
      );

      console.log(response);
      if (response.status) {
        setEventDetails({
          ...response.data,
          event_banner: response.data.event_banner.map(
            (item: string) => IMAGE_URL + item,
          ),
        });
      }
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setErrorMessage(error.message);
        setShowError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (eventId) {
        getEventDetails();
      }
    }, [eventId]),
  );

  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();

  return (
    <Container style={{ paddingTop: 70 }}>
      <LoadingPopup visible={isLoading} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            { gap: 10 },
            { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] },
          ]}
        >
          <Header />
          <ImageSlider images={eventDetails.event_banner || []} />
        </Animated.View>
        <Animated.View
          style={[
            { gap: 20 },
            { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] },
          ]}
        >
          <Details eventDetails={eventDetails} />
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default EventDetail;
