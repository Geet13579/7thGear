import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Description from '../../universal/Description'
import { colors } from '../../constants/Colors'
import PolicyCard from './EventCard'
import UpperSection from '../../universal/UpperSection'
import Title from '../../universal/Title'

const RecentInsurance = () => {
    return (
       
        <>
            <View style={styles.header}>
              <UpperSection style={{ paddingTop: 20}}>
              <Title title="Join Experiences" color={colors.primary} />
              <Description
                description="Discover unique adventures near you"
                color={colors.text}
              />
            </UpperSection>
            </View>
            {Array.from({ length: 10 }).map((_, index) => (
                <PolicyCard key={index} />
            ))}

            </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    }
})

export default RecentInsurance