import React from 'react'
import {  StyleSheet, View } from 'react-native'
import CommunityCard from './CommunityCard'

const RecentInsurance = () => {
    return (
       
        <View style={styles.container}>
            
            {Array.from({ length: 10 }).map((_, index) => (
                <CommunityCard key={index} />
            ))}

            </View>
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