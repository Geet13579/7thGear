import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Title from "../../../universal/Title";
import CustomText from "../../../universal/lightText";
import { colors } from "../../../constants/Colors";

const Header = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.greetContainer}>
                    {/* Back Button */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Title title="Post" color={colors.black} />

                    {/* Three Dots */}
                    <TouchableOpacity onPress={() => setMenuVisible(prev => !prev)}>
                        <Entypo name="dots-three-vertical" size={20} color="black" />
                    </TouchableOpacity>

                </View>
            </View>

       <Modal
  transparent
  visible={menuVisible}
  onRequestClose={() => setMenuVisible(false)}
>
  {/* Backdrop */}
  <Pressable
    style={StyleSheet.absoluteFill}
    onPress={() => setMenuVisible(false)}
  />

  {/* Tooltip (blocks press propagation) */}
  <View
    style={styles.tooltip}
    onStartShouldSetResponder={() => true}
  >
    <TouchableOpacity
      style={styles.tooltipItem}
      onPress={() => {
        setMenuVisible(false);
        navigation.navigate("ReportIssue");
      }}
    >
      <CustomText style={styles.tooltipText}>
        Report an issue
      </CustomText>
    </TouchableOpacity>
  </View>
</Modal>

        </>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    greetContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },


    tooltip: {
        position: "absolute",
        top: 60,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        width: 140,
        paddingVertical: 2,
        shadowRadius: 8,
        elevation: 6,
    },

    tooltipItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    tooltipText: {
        fontSize: 14,
        color: colors.black,
        fontWeight: "500",
    },
});

export default Header;
