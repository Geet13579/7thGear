import Header from "../components/Community/header";
import Container from "../universal/Container2";
import FlatList from "../components/Community/flatList";
import CardBody from "../components/Community/card";
import { Animated, ScrollView } from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import { useState } from "react";

const Home = () => {
  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <Container style={{ paddingTop: 70 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Animated.View
          style={[
            { gap: 20, paddingHorizontal: 15 },
            { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] },
          ]}
        >
          <Header />
          <FlatList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Animated.View>

        {/* Changed slideFromTop to slideFromBottom */}
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] },
          ]}
        >
          <CardBody selectedCategory={selectedCategory} />
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default Home;
