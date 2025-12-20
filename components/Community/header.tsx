import { StyleSheet, View } from 'react-native'
import CustomText from '../../universal/text';
import FilterButton from '../../universal/filter';

const Header = () => {

  return (
      <View >
        <View style={styles.greetContainer}>
          <View style={styles.logoContainer}>
            <CustomText style={{ fontSize: 17, fontFamily:"Geist-Bold" }}  >Community</CustomText>
          </View>
          <View style={styles.logoContainer}>

            <FilterButton/>

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
    
    
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 10
  }

})

export default Header