import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Container from '../universal/Container'
import { colors } from '../constants/Colors'
import { LoadingPopup } from '../universal/popup'
import NoDataFound from '../universal/NoDataFound'
import Header from '../components/notifications/Header'

const Notifications = () => {
    const [loading, setLoading] = React.useState(false);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Header />

          <NoDataFound message="No Notifications Yet." />
          {/* {events.length === 0 && (
          )} */}
        </View>
      </ScrollView>

      <LoadingPopup visible={loading} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 10,
  },
});

export default Notifications