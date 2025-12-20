import React from "react";
import { StyleSheet, View, ViewStyle, Image } from "react-native";
import CustomText from "../universal/lightText";
import { EvilIcons } from "@expo/vector-icons";
import { colors } from "../constants/Colors";

interface UpperSectionProps {
    style?: ViewStyle;
    heading: string;
    subHeading: string;
    location?: string; // Optional location parameter
    bg?: string;
    profile?: string;
    icon?: boolean;
    subHeadingColor?: string;
}

const TextProfileSection: React.FC<UpperSectionProps> = ({ 
    heading, 
    subHeading, 
    location,
    style, 
    bg, 
    profile, 
    icon, 
    subHeadingColor 
}) => {
    const styles = StyleSheet.create({
        upperSection: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            ...style,
            backgroundColor: icon ? "#F7FAFE" : "transparent",
            borderRadius: 12,
            padding: icon ? 10 : 0,
        },
        almostFullBadge: {
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        badgeText: {
            color: "#fff",
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center"
        },
        titleName: {
            fontSize: 14,
            fontWeight: "600",
            color: "#222",
        },
        subLabel: {
            fontSize: 12,
            color: subHeadingColor || colors.textSecondary,
            fontWeight: "400"
        },
        iconRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            marginTop: 3,
        },
        iconWrapper: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 8,
        }
    });

    return (
        <View style={styles.upperSection}>
            <View style={styles.almostFullBadge}>
                {!icon ? (
                    <CustomText style={styles.badgeText}>{profile}</CustomText>
                ) : (
                    <Image 
                        source={{ uri: profile }} 
                        style={{ width: 40, height: 40, borderRadius: 50 }} 
                    />
                )}
            </View>
            
            <View >
                <CustomText style={styles.titleName}>{heading}</CustomText>
                
                {!icon ? (
                    // For user posts - show location and time
                    <View style={styles.iconRow}>
                        {subHeading && (
                            <View style={styles.iconWrapper}>
                                <EvilIcons name="location" size={18} color={colors.textSecondary} />
                                <CustomText style={styles.subLabel}>{subHeading}</CustomText>
                            </View>
                        )}
                        {location && (
                            <CustomText style={styles.subLabel}>• {location}</CustomText>
                        )}
                    </View>
                ) : (
                    // For trip/group info - show organizer and location
                    <View style={styles.iconRow}>
                        {subHeading && (
                            <View style={styles.iconWrapper}>
                                <EvilIcons name="user" size={18} color={colors.textSecondary} />
                                <CustomText style={styles.subLabel}>{subHeading}</CustomText>
                            </View>
                        )}
                        {location && (
                            <View style={styles.iconWrapper}>
                                <EvilIcons name="location" size={18} color={colors.textSecondary} />
                                <CustomText style={styles.subLabel}>{location}</CustomText>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default TextProfileSection;