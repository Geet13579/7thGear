import React from 'react'
import { StyleSheet, View } from 'react-native'
import Description from '../../universal/Description'
import { colors } from '../../constants/Colors'
import UpperSection from '../../universal/UpperSection'
import Title from '../../universal/Title'
import CustomText from '../../universal/lightText'
import TextProfileSection from '../../universal/textWithProfile'
import { Feather } from '@expo/vector-icons'

const Details = () => {

    interface CardItem {
        id: string;
        icon: string;
        iconName: any;
        title: string;
        description: string;
    }
    
    const cardItems: CardItem[] = [
        {
            id: '1',
            icon: 'map-pin',
            iconName: Feather,
            title: 'Location',
            description: 'Manali, Himachal Pradesh',
        },
        {
            id: '2',
            icon: 'calendar',
            iconName: Feather,
            title: 'Duration',
            description: '6 days, 5 nights',
        },
        {
            id: '3',
            icon: 'users',
            iconName: Feather,
            title: 'Participants',
            description: '16/20 joined',
        },
        {
            id: '4',
            icon: 'message-circle',
            iconName: Feather,
            title: 'Group chat',
            description: 'Only for participants',
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <UpperSection style={{ paddingTop: 20 }}>
                    <Title title="Join Experiences" color={colors.black} />
                    <Description
                        description="Manali, Himachal Pradesh"
                        color={colors.text}
                        textDecorationLine="underline"
                    />
                </UpperSection>
            </View>

            <View style={styles.content}>
                <TextProfileSection 
                    heading="Hosted by Adventure Seekers" 
                    subHeading="Member since 2019"
                    bg={colors.primary} 
                    profile="AS" 
                    icon="" 
                />

                <View style={styles.almostFullBadge}>
                    <Feather name="check" size={20} color="#fff" />
                    <CustomText style={styles.badgeText}>Verified</CustomText>
                </View>
            </View>

            <View style={styles.cardsContainer}>
                <View style={styles.row}>
                    {cardItems.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <item.iconName name={item.icon} size={24} color={colors.text} />
                            <CustomText style={styles.cardTitle}>{item.title}</CustomText>
                            <CustomText style={styles.cardDescription}>{item.description}</CustomText>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingBottom: 20,
        gap: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 20,
        borderColor: "#E2E8F0",
    },
    almostFullBadge: {
        backgroundColor: "#34C759",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 5
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    cardsContainer: {
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "space-between",
    },
    card: {
        width: '48%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        gap: 4,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    cardDescription: {
        fontSize: 12,
        color: '#717171',
    },
})

export default Details