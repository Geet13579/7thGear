import Header from "../components/Home/eventDetails/header";
import Details from "../components/Home/eventDetails/details";
import ImageSlider from "../universal/imageSlider";
import { ScrollView, Animated } from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import Container from "../universal/Container2";
import { useEffect, useState } from "react";
import { getRequest } from "../api/commonQuery";
import { FETCH_EVENT_DETAILS, IMAGE_URL } from "../constants/apiEndpoints";
import { useApi } from "../hooks/useApi";
import { LoadingPopup } from "../universal/popup";

const EventDetail = ({ route }: any) => {
  const { eventId } = route.params;

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
      const response = await getRequest<{ status: boolean; data: any }>(
        `${FETCH_EVENT_DETAILS}?event_id=${eventId}`,
      );

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

  useEffect(() => {
    if (eventId) {
      getEventDetails();
    }
  }, [eventId]);

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
