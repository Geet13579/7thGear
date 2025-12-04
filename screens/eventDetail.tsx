
import Header from "../components/eventDetails/header"
import Details from "../components/eventDetails/details"
import ImageSlider from "../universal/imageSlider"
import { ScrollView, Animated } from "react-native"
import {useEntranceAnimation } from "../hooks/useEntranceAnimation";


const EventDetail = () => {

  const {fadeAnim, slideFromTop, slideFromBottom} = useEntranceAnimation();
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
  ];
  return (
    < >
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
          <Animated.View style={[{gap: 10}, {opacity: fadeAnim, transform: [{translateY: slideFromTop}]}]}>
        <Header />
        <ImageSlider images={images} />
      </Animated.View>
      <Animated.View style={[{gap: 20}, {opacity: fadeAnim, transform: [{translateY: slideFromBottom}]}]}>
        <Details />
      </Animated.View>
      </ScrollView>
    </>


  )
}


export default EventDetail