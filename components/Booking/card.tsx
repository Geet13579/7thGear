import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Description from '../../universal/subTitle'
import { colors } from '../../constants/Colors'
import PolicyCard from './BookingCard'
import UpperSection from '../../universal/UpperSection'
import Title from '../../universal/Title'

const RecentInsurance = () => {
    return (
       
        <>
           
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