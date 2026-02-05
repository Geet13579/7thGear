import { StyleSheet, View } from 'react-native'
import CustomText from '../../universal/text';
import FilterButton from '../../universal/filter';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const Header = () => {

  return (
    <View >
      <View style={styles.greetContainer}>
        <View style={styles.logoContainer}>
          <CustomText style={{ fontSize: 17, fontFamily: "Geist-Bold" }}  >Profile</CustomText>
        </View>
        {/* <View style={styles.logoContainer}>

          <FontAwesome5 name="user-edit" size={15} color="black" />

        </View> */}
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  greetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"

  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 10
  }

})

export default Header