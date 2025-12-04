import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "../universal/lightText";
import { Image } from "react-native";
import { EvilIcons, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../constants/Colors";

interface UpperSectionProps {
    style?: ViewStyle;
    heading: string;
    subHeading: string;
    bg?: string;
    profile?: string;
    icon?: boolean;
    subHeadingColor?: string;
}

const TextProfileSection: React.FC<UpperSectionProps> = ({ heading, subHeading, style, bg, profile, icon, subHeadingColor }) => {
    const styles = StyleSheet.create({
        upperSection: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            ...style,
            backgroundColor: icon ? "#F7FAFE" : "",
            borderRadius: 12,
            padding: icon ? 10:0,
        },
        almostFullBadge: {
            width: 32,
            height: 32,
            borderRadius: 50,
            backgroundColor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        badgeText: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "600",
            textAlign: "center"
        },
        titleName: {
            fontSize: 14,
            fontWeight: "600",
            color: "#222",
            marginBottom: 2,
        },
        subLabel: {
            fontSize: 12,
            color: subHeadingColor || "#717171",
            marginTop: 2,
            fontWeight: "400"
        },
    });

    return <View style={[styles.upperSection]}>

        <View style={styles.almostFullBadge}>
            {!icon ? <CustomText style={styles.badgeText}>{profile}</CustomText>
                :

                <Image source={{ uri: profile }} style={styles.almostFullBadge} />}
        </View>
        <View>
            <CustomText style={styles.titleName}>{heading}</CustomText>
            {!icon ? <CustomText style={styles.subLabel}>{subHeading}</CustomText> :
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <EvilIcons name="user" size={20} color={colors.textSecondary} />
                        <CustomText style={styles.subLabel}>{subHeading}</CustomText>

                    </View>

                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <EvilIcons name="location" size={20} color={colors.textSecondary} />
                        <CustomText style={styles.subLabel}>{subHeading}</CustomText>

                    </View>
                </View>

            }
        </View>

    </View>;
};

export default TextProfileSection;
