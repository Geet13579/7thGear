
import Header from "../components/Home/contestDetail/header"
import Container from '../universal/Container2'
import CardBody from "../components/Home/contestDetail/details"
import { View ,Animated, ScrollView} from "react-native"
import {useEntranceAnimation } from "../hooks/useEntranceAnimation";

const Home = () => {
  const {fadeAnim, slideFromTop, slideFromBottom} = useEntranceAnimation();

  return (
    <Container style={{paddingTop: 70}}>
       <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
      <Animated.View style={[{gap: 16}, {opacity: fadeAnim, transform: [{translateY: slideFromTop}]}]}>
        <Header />
      </Animated.View>
      
      {/* Changed slideFromTop to slideFromBottom */}
      <Animated.View style={[ {opacity: fadeAnim, transform: [{translateY: slideFromBottom}]}]}>
        <CardBody/>
      </Animated.View>
    </ScrollView>
    </Container>
  )
}


export default Home