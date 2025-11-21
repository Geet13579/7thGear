import { KeyboardAvoidingView, Platform, View, Text } from 'react-native'

const Home = () => {
  return (
    <>
    <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
    <View>
    <Text>hghyfvuf</Text>
    </View>
    </KeyboardAvoidingView>
      {/* <KPI />
      <RecentInsurance /> */}
    </>
  )
}

export default Home