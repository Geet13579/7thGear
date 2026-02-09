import { StyleSheet, View, Image } from 'react-native'
import CustomText from '../../universal/text';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';


const Header = () => {

  return (
      <View >
        <View style={styles.greetContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 70, height: 70 }}
            />
            {/* <CustomText style={{ fontSize: 17, fontFamily:"Geist-Bold" }}  >7th Gear</CustomText> */}
          </View>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="heart" size={22} color="black" />
            <MaterialIcons name="notifications-none" size={26} color="black" />
          </View>
        </View>

      </View>
  )
}

const styles = StyleSheet.create({
  greetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 10
  }

})

export default Header