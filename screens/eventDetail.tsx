
import Header from "../components/eventDetails/header"
import Container from '../universal/Container'
import Details from "../components/eventDetails/details"
import ImageSlider from "../components/eventDetails/eventImageSlider"
import { ScrollView } from "react-native"


const EventDetail = () => {

  return (
    < >
    <ScrollView  contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}>
    <Header />
    <ImageSlider />
    <Details />
    </ScrollView>
    </>
    
    
  )
}


export default EventDetail