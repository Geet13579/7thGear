import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "../universal/lightText";
import { colors } from "../constants/Colors";
import { Button } from "./Button";

interface UpperSectionProps {
    style?: ViewStyle;
    price: string;
    priceHeading: string;
    buttonText: string;
    subHeading: string;
    onClickFunc: () => void;
    disabled?: boolean;
}

const PriceButtonTextSection: React.FC<UpperSectionProps> = ({ price, priceHeading, subHeading,buttonText, onClickFunc,disabled }) => {
    const styles = StyleSheet.create({
      bottomSection: {
        paddingTop: 10
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
    },
  
    });

    return  <View style={styles.bottomSection}>
                <View style={styles.priceContainer}>
                    <View>
                        <CustomText style={styles.price}>{price}<CustomText style={styles.perPerson}>{priceHeading}</CustomText></CustomText>
                        <CustomText style={styles.spotsLeft}>{subHeading}</CustomText>
                    </View>
                    <View >
                    <Button title={buttonText} onClick={onClickFunc} disabled={disabled} />
                    </View>
                </View>
            </View>
};

export default PriceButtonTextSection;
