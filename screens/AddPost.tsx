import { colors } from '../constants/Colors'
import UpperSection from '../universal/UpperSection'
import { StyleSheet, View } from 'react-native'
import Title from '../universal/Title';

const AddPost = () => {

  return (
    <UpperSection style={{ position: "relative", height: 200 }}>
      <View style={styles.greetContainer}>
        <View>
          <Title title="Add Post" color={colors.text} />


        </View>

      </View>

    </UpperSection>
  )
}

const styles = StyleSheet.create({
  greetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },

})

export default AddPost