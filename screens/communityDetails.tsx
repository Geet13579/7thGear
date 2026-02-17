import Header from "../components/Community/details/Header";
import Container from "../universal/Container2";
import CardBody from "../components/Community/details/CommunityDetails";
import { View, Animated, ScrollView } from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";

const CommunityDetails = ({ route }: { route: any }) => {
  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
  const { post } = route.params;

  return (
    <Container style={{ paddingTop: 70 }}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Animated.View
          style={[
            { gap: 16 },
            { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] },
          ]}
        >
          <Header />
        </Animated.View>

        {/* Changed slideFromTop to slideFromBottom */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] },
          ]}
        >
          <CardBody post={post} />
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default CommunityDetails;
