import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '../constants/Colors'
import CustomText from '../universal/lightText'
import Title from '../universal/Title'
import { useNavigation } from '@react-navigation/native'
import PriceButtonTextSection from '../universal/priceButtonCard'
import Container from '../universal/Container'

const SelectSlots = () => {
    const [travellers, setTravellers] = useState(1)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [emergencyContact, setEmergencyContact] = useState('')
    
    const navigation = useNavigation()
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

    return (
        <Container>

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>

                    <Feather name="chevron-left" size={24} color={colors.black} onPress={() => navigation.goBack()} />
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

                {/* User Information Form */}
                <View style={styles.formSection}>
                    <CustomText style={styles.sectionTitle}>Your information</CustomText>
                    <CustomText style={styles.sectionSubtitle}>
                        We'll send booking details to this info
                    </CustomText>

                    <View style={styles.formRow}>
                        <View style={styles.formField}>
                            <CustomText style={styles.fieldLabel}>First Name</CustomText>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter first name"
                                placeholderTextColor="#9CA3AF"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>

                        <View style={styles.formField}>
                            <CustomText style={styles.fieldLabel}>Last Name</CustomText>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter last name"
                                placeholderTextColor="#9CA3AF"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>

                    <View style={styles.formFieldFull}>
                        <CustomText style={styles.fieldLabel}>Email Address</CustomText>
                        <TextInput
                            style={styles.input}
                            placeholder="your@email.com"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.formFieldFull}>
                        <CustomText style={styles.fieldLabel}>Mobile Number</CustomText>
                        <TextInput
                            style={styles.input}
                            placeholder="10-digit mobile number"
                            placeholderTextColor="#9CA3AF"
                            value={mobile}
                            onChangeText={setMobile}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.formFieldFull}>
                        <CustomText style={styles.fieldLabel}>Emergency Contact</CustomText>
                        <TextInput
                            style={styles.input}
                            placeholder="10-digit mobile number"
                            placeholderTextColor="#9CA3AF"
                            value={emergencyContact}
                            onChangeText={setEmergencyContact}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.infoBox}>
                        <Feather name="info" size={16} color="#0066CC" />
                        <CustomText style={styles.infoText}>
                            Your information is secure and will only be used for booking purposes
                        </CustomText>
                    </View>
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
            <View style={styles.bottomSection}>
                 <PriceButtonTextSection
                price="₹8,999"
                priceHeading=""
                subHeading="Base + GST"
                buttonText="Proceed to payment"

                onClickFunc={() => navigation.navigate('payment')}
            />
            </View>
        </ScrollView>
        </ScrollView>
        </Container>

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
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingTop: 24,
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
    formSection: {
        marginBottom: 32,
    },
    formRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    formField: {
        flex: 1,
    },
    formFieldFull: {
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 14,
        color: colors.black,
        backgroundColor: '#fff',
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: '#EFF6FF',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#0066CC',
        lineHeight: 18,
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
    bottomSection: {
  
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        backgroundColor: '#fff',
    },
    bottomTotal: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.black,
    },
    bottomSubtext: {
        fontSize: 12,
        color: colors.text,
        marginTop: 2,
    },
    continueButton: {
        backgroundColor: '#FF385C',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
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