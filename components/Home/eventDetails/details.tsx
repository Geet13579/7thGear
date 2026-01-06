import React from 'react'
import { StyleSheet, View } from 'react-native'
import Description from '../../../universal/subTitle'
import { colors } from '../../../constants/Colors'
import UpperSection from '../../../universal/UpperSection'
import Title from '../../../universal/Title'
import CustomText from '../../../universal/lightText'
import TextProfileSection from '../../../universal/textWithProfile'
import { Feather } from '@expo/vector-icons'
import PriceButtonTextSection from '../../../universal/priceButtonCard'
import { useNavigation } from '@react-navigation/native'

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

    const itineraryData = [
        {
            day: 1,
            label: 'Day 1',
            title: 'Arrival & Acclimatization',
            description: 'Meet at base camp, gear check, and local sightseeing'
        },
        {
            day: 2,
            label: 'Day 2',
            title: 'Trek to High Camp',
            description: '8km trek through pine forests and meadows'
        },
        {
            day: 3,
            label: 'Day 3',
            title: 'Summit Day',
            description: 'Early morning push to summit, return to high camp'
        },
        {
            day: 4,
            label: 'Day 4',
            title: 'Exploration Day',
            description: 'Explore nearby lakes and valleys'
        },
        {
            day: 5,
            label: 'Day 5',
            title: 'Descent',
            description: 'Trek back to base camp'
        },
        {
            day: 6,
            label: 'Day 6',
            title: 'Departure',
            description: 'Return journey and goodbyes'
        }
    ];

    const importantInfo = [
        'Physical fitness required - able to walk 6-8 hours daily',
        'Age limit: 18-50 years',
        'No smoking or alcohol during trek',
        'Follow trek leader instructions at all times',
        'Carry valid ID proof and medical certificate'
    ];

    const travelers = [
        { id: '1', initials: 'R' },
        { id: '2', initials: 'P' },
        { id: '3', initials: 'A' },
        { id: '4', initials: 'S' },
        { id: '5', initials: 'R' },
    ];

    const totalTravelers = 16;
    const maxVisibleTravelers = 5;
    const remainingTravelers = totalTravelers - maxVisibleTravelers;

    const navigation = useNavigation();
    
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <UpperSection style={{ paddingTop: 20 }}>
                        <Title title="Join Experiences" color={colors.black} />
                         <CustomText style={{color: colors.text, fontSize: 14, textAlign: "left" , fontWeight:100, fontFamily: 'Geist-regular'}}>Manali, Himachal Pradesh</CustomText>
                    </UpperSection>
                </View>

                <View style={styles.content}>
                    <TextProfileSection
                        heading="Hosted by Adventure Seekers"
                        subHeading="Member since 2019"
                        bg={colors.primary}
                        profile="AS"
                        icon={false}
                    />
                      <View style={styles.almostFullBadge}>
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

                <View style={styles.bottomSection}>
                    <CustomText style={styles.titleName}>About this experience</CustomText>
                    <CustomText style={styles.subLabel}>
                        Experience the breathtaking beauty of the Himalayas on this 6-day trek. Perfect for adventure enthusiasts looking to challenge themselves while enjoying stunning mountain vistas, crystal-clear lakes, and pristine valleys.
                    </CustomText>
                </View>

                <View style={styles.bottomSection}>
                    <CustomText style={styles.titleName}>What's included</CustomText>
                    <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 8}}>
                            <Feather name="check" size={20} color={colors.textSecondary} style={{marginTop: 2}} />   
                            <CustomText style={styles.subLabel}>
                                Professional trek leader and support staff
                            </CustomText>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 8}}>
                            <Feather name="check" size={20} color={colors.textSecondary} style={{marginTop: 2}} />   
                            <CustomText style={styles.subLabel}>
                                Transportation from Manali
                            </CustomText>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 8}}>
                            <Feather name="check" size={20} color={colors.textSecondary} style={{marginTop: 2}} />   
                            <CustomText style={styles.subLabel}>
                                Insurance coverage included
                            </CustomText>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomSection}>
                    <CustomText style={styles.titleName}>Itinerary</CustomText>
                    <View style={styles.itineraryContainer}>
                        {itineraryData.map((item, index) => (
                            <View key={item.day} style={styles.itineraryItem}>
                                {index < itineraryData.length - 1 && (
                                    <View style={styles.verticalLine} />
                                )}
                                <View style={styles.dayNumberContainer}>
                                    <CustomText style={styles.dayNumber}>{item.day}</CustomText>
                                </View>
                                <View style={styles.itineraryContent}>
                                    <CustomText style={styles.dayLabel}>{item.label}</CustomText>
                                    <CustomText style={styles.itineraryTitle}>{item.title}</CustomText>
                                    <CustomText style={styles.itineraryDescription}>{item.description}</CustomText>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.bottomSection}>
                    <CustomText style={styles.titleName}>Important information</CustomText>
                    <View style={styles.importantInfoContainer}>
                        {importantInfo.map((info, index) => (
                            <View key={index} style={styles.importantInfoItem}>
                                <CustomText style={styles.infoNumber}>{index + 1}</CustomText>
                                <CustomText style={styles.infoText}>{info}</CustomText>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.bottomSection}>
                    <CustomText style={styles.titleName}>Meet your fellow travelers</CustomText>
                    <View style={styles.travelersContainer}>
                        {travelers.map((traveler, index) => (
                            <View 
                                key={traveler.id} 
                                style={[
                                    styles.avatar,
                                    index > 0 && styles.avatarOverlap
                                ]}
                            >
                                <CustomText style={styles.initials}>
                                    {traveler.initials}
                                </CustomText>
                            </View>
                        ))}
                        {remainingTravelers > 0 && (
                            <CustomText style={styles.remainingText}>
                                +{remainingTravelers} more going
                            </CustomText>
                        )}
                    </View>
                </View>
            </View>

            <View style={{
                borderTopWidth: 2, 
               paddingHorizontal: 16,
                borderColor: '#E2E8F0',
                boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.25)'
            }}>
                <PriceButtonTextSection
                    price="₹8,999"
                    priceHeading="per person"
                    subHeading="4 of 20 spots left"
                    buttonText="Reserve your spot"
                    onClickFunc={() => navigation.navigate('selectSlots')}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingHorizontal: 16,
        paddingBottom: 20,
        gap: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subLabel: {
        fontSize: 14,
        color: "#717171",
        marginTop: 2,
        lineHeight: 20
    },
    titleName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
        marginBottom: 5,
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
    bottomSection: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderColor: '#E2E8F0',
    },
    itineraryContainer: {
        marginTop: 10,
        gap: 16,
    },
    itineraryItem: {
        flexDirection: 'row',
        gap: 12,
        position: 'relative',
    },
    verticalLine: {
        position: 'absolute',
        left: 18,
        top: 28,
        bottom: -16,
        width: 2,
        backgroundColor: '#E2E8F0',
    },
    dayNumberContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    dayNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
    itineraryContent: {
        flex: 1,
        gap: 2,
    },
    dayLabel: {
        fontSize: 12,
        color: '#717171',
    },
    itineraryTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
    },
    itineraryDescription: {
        fontSize: 14,
        color: '#717171',
        lineHeight: 20,
    },
    importantInfoContainer: {
        marginTop: 10,
        gap: 12,
    },
    importantInfoItem: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
    },
    infoNumber: {
        fontSize: 14,
        color: '#717171',
        fontWeight: '500',
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#717171',
        lineHeight: 20,
    },
    travelersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FF385C',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    avatarOverlap: {
        marginLeft: -12,
    },
    initials: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    remainingText: {
        fontSize: 14,
        color: '#717171',
        marginLeft: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.black,
    },
    perPerson: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.text,
    },
    spotsLeft: {
        fontSize: 12,
        color: '#717171',
        marginTop: 4,
    },
    reserveButton: {
        backgroundColor: '#FF385C',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 10,
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default Details