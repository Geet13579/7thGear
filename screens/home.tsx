import Header from "../components/Home/header";
import SearchBar from "../universal/searchBar";
import Container from "../universal/Container";
import FlatList from "../components/Home/flatList";
import CardBody from "../components/Home/card";
import { View, Animated, ScrollView } from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import useAuthStore from "../store/authenticationStore";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getRequest, postRequest } from "../api/commonQuery";
import { useEffect } from "react";
import { GET_FIREBASE_AUTH_TOKEN } from "../constants/apiEndpoints";

const Home = () => {
  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();

  const token = useAuthStore.getState().token;
  const auth = getAuth();

  const getFCM = async () => {
    const res = await getRequest<{
      status: boolean;
      data: { firebase_token: string };
    }>(GET_FIREBASE_AUTH_TOKEN);

    if (res.status) {
      await signInWithCustomToken(auth, res.data);
    }
  };

  useEffect(() => {
    if (token) {
      getFCM();
    }
  }, [token]);

  return (
    <Container>
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
          <SearchBar />
          <FlatList />
        </Animated.View>

        {/* Changed slideFromTop to slideFromBottom */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] },
          ]}
        >
          <CardBody />
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default Home;
