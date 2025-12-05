import Header from "../components/Profile/header";
import Container from "../universal/Container";
import FlatList from "../components/Booking/flatList";
import CardBody from "../components/Booking/card";
import {
  View,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import TextProfileSection from "../universal/textWithProfile";
import { colors } from "../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import CustomText from "../universal/text";
import useAuthStore from "../store/authenticationStore";

const Home = () => {
  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
  const { logOut } = useAuthStore();
  return (
    <Container>
      <TouchableOpacity onPress={() => logOut()}><CustomText>Logout</CustomText></TouchableOpacity>
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

          <View style={styles.content}>
            <TextProfileSection
              heading="Hosted by Adventure Seekers"
              subHeading="Member since 2019"
              bg={colors.primary}
              profile="AS"
              icon={false}
            />
          </View>
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

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: "#E2E8F0",
  },
});

export default Home;
