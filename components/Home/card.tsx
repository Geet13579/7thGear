import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Description from '../../universal/subTitle'
import { colors } from '../../constants/Colors'
import EventCard from './EventCard'
import UpperSection from '../../universal/UpperSection'
import Title from '../../universal/Title'

const EventArray = [
    {
        id: "1",
        title: "Biking Adventure",
        location: "Manali, Himachal Pradesh",
        date: "Nov 15-20, 2025",
        price: 8999,
        totalSpots: 28,
        joinedSpots: 25,
        image: require("../../assets/images/event-images/image.jpg"),
        type: "BIKING",
    },
    {
        id: "2",
        title: "Mountain Trek",
        location: "Kasol, Himachal Pradesh",
        date: "Dec 05-10, 2025",
        price: 12999,
        totalSpots: 20,
        joinedSpots: 12,
        image: require("../../assets/images/event-images/image.jpg"),
        type: "TREKKING",
    },

    {
        id: "3",
        title: "Mountain Trek",
        location: "Kasol, Himachal Pradesh",
        date: "Dec 05-10, 2025",
        price: 12999,
        totalSpots: 20,
        joinedSpots: 12,
        image: require("../../assets/images/event-images/image.jpg"),
        type: "TREKKING",
    },
    {
        id: "4",
        title: "Photography Contest",
        location: "Online",
        date: "Jan 01-31, 2026",
        price: 499,
        totalSpots: 100,
        joinedSpots: 80,
        image: require("../../assets/images/event-images/image.jpg"),
        type: "CONTEST",
    },
];
const RecentInsurance = () => {
    return (

        <>
            <View style={styles.header}>
                <UpperSection style={{ paddingTop: 20 }}>
                    <Title title="Join Experiences" color={colors.primary} />
                    <Description
                        description="Discover unique adventures near you"
                        color={colors.text}
                    />
                </UpperSection>
            </View>
            {EventArray.map(event => (
                <EventCard key={event.id} event={event} />
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