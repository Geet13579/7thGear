import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "../universal/lightText";

interface UpperSectionProps {
    children: React.ReactNode;
    style?: ViewStyle;
    heading: string;
    subHeading: string;
    bg?: string;
    profile?: string;
    icon?: string;
}

const TextProfileSection: React.FC<UpperSectionProps> = ({ heading, subHeading, style, bg, profile, icon }) => {
    const styles = StyleSheet.create({
        upperSection: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap:6,
            ...style
        },
        almostFullBadge: {
            width: 40,
            height: 40,
            borderRadius:50,
            backgroundColor: bg,
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        },
        badgeText: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "600",
            textAlign:"center"
        },
        titleName: {
            fontSize: 14,
            fontWeight: "600",
            color: "#222",
            marginBottom: 2,
        },
        subLabel: {
            fontSize: 12,
            color: "#717171",
            marginTop: 2,
            fontWeight:"400"
        },
    });

    return <View style={styles.upperSection}>

        <View style={styles.almostFullBadge}>
            <CustomText style={styles.badgeText}>{profile}</CustomText>
        </View>
        <View>
            <CustomText style={styles.titleName}>{heading}</CustomText>
            <CustomText style={styles.subLabel}>{subHeading}</CustomText>
        </View>

    </View>;
};

export default TextProfileSection;
