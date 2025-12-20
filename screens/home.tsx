
import Header from "../components/Home/header"
import SearchBar from '../universal/searchBar'
import Container from '../universal/Container'
import FlatList from "../components/Home/flatList"
import CardBody from "../components/Home/card"
import { View ,Animated, ScrollView} from "react-native"
import {useEntranceAnimation } from "../hooks/useEntranceAnimation";

const Home = () => {
  const {fadeAnim, slideFromTop, slideFromBottom} = useEntranceAnimation();

  return (
    <Container >
       <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
      <Animated.View style={[{gap: 15}, {opacity: fadeAnim, transform: [{translateY: slideFromTop}]}]}>
        <Header />
        <SearchBar />
        <FlatList />
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