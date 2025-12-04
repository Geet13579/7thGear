import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '../constants/Colors'
import CustomText from '../universal/lightText'
import Title from '../universal/Title'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../universal/Button'

const SelectSlots = () => {
    const [travellers, setTravellers] = useState(1)
    const basePrice = 8999
    const gstRate = 0.18
    
    const subtotal = basePrice * travellers
    const gst = Math.round(subtotal * gstRate)
    const total = subtotal + gst

    const incrementTravellers = () => {
        if (travellers < 20) {
            setTravellers(travellers + 1)
        }
    }

    const decrementTravellers = () => {
        if (travellers > 1) {
            setTravellers(travellers - 1)
        }
    }

    const navigation = useNavigation()

    const onSignIn = () => {
        navigation.navigate('slotForm')
    }
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={colors.black} />
                </TouchableOpacity>
                <Title title="Select Slots" color={colors.black} />
                <View style={{ width: 24 }} />
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* How many spots section */}
                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>How many spots?</CustomText>
                    <CustomText style={styles.sectionSubtitle}>
                        Select the number of people joining
                    </CustomText>

                    <View style={styles.travellerCounter}>
                        <View style={styles.travellerInfo}>
                            <Feather name="users" size={20} color={colors.text} />
                            <CustomText style={styles.travellerText}>Travellers</CustomText>
                        </View>

                        <View style={styles.counterControls}>
                            <TouchableOpacity
                                style={[
                                    styles.counterButton,
                                    travellers === 1 && styles.counterButtonDisabled
                                ]}
                                onPress={decrementTravellers}
                                disabled={travellers === 1}
                            >
                                <Feather 
                                    name="minus" 
                                    size={20} 
                                    color={travellers === 1 ? '#ccc' : colors.text} 
                                />
                            </TouchableOpacity>

                            <CustomText style={styles.counterValue}>{travellers}</CustomText>

                            <TouchableOpacity
                                style={[
                                    styles.counterButton,
                                    travellers === 20 && styles.counterButtonDisabled
                                ]}
                                onPress={incrementTravellers}
                                disabled={travellers === 20}
                            >
                                <Feather 
                                    name="plus" 
                                    size={20} 
                                    color={travellers === 20 ? '#ccc' : colors.text} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {travellers >= 17 && (
                        <CustomText style={styles.warningText}>
                            Only {20 - travellers + 1} spots left
                        </CustomText>
                    )}
                </View>

                {/* Price Details */}
                <View style={styles.priceSection}>
                    <CustomText style={styles.priceTitle}>Price details</CustomText>

                    <View style={styles.priceRow}>
                        <CustomText style={styles.priceLabel}>
                            ₹{basePrice.toLocaleString('en-IN')} × {travellers} person(s)
                        </CustomText>
                        <CustomText style={styles.priceValue}>
                            ₹{subtotal.toLocaleString('en-IN')}
                        </CustomText>
                    </View>

                    <View style={styles.priceRow}>
                        <CustomText style={styles.priceLabel}>GST (18%)</CustomText>
                        <CustomText style={styles.priceValue}>
                            ₹{gst.toLocaleString('en-IN')}
                        </CustomText>
                    </View>

                    <View style={[styles.priceRow, styles.totalRow]}>
                        <CustomText style={styles.totalLabel}>Total</CustomText>
                        <CustomText style={styles.totalValue}>
                            ₹{total.toLocaleString('en-IN')}
                        </CustomText>
                    </View>
                </View>
            </View>

            {/* Bottom Button */}
                <View style={styles.buttonContainer}>
                            <Button title="Continue" onClick={onSignIn} />
                          </View>
          
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
        paddingTop: 60,
        paddingBottom: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#E2E8F0',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 22,
        paddingTop: 10,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.black,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 24,
    },
    travellerCounter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#F8FAFC',
    },
    travellerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    travellerText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    counterButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    counterButtonDisabled: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
    },
    counterValue: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.black,
        minWidth: 24,
        textAlign: 'center',
    },
    warningText: {
        fontSize: 12,
        color: '#FF385C',
        marginTop: 12,
        fontWeight: '500',
    },
    priceSection: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 20,
        gap: 16,
    },
    priceTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.black,
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: 14,
        color: colors.text,
    },
    priceValue: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 16,
        marginTop: 4,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.black,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FF385C',
    },
    buttonContainer: {
    paddingHorizontal: 40,
    marginTop: 20,
  },
    continueButton: {
        backgroundColor: '#FF385C',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
})

export default SelectSlots