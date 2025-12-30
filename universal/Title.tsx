import { StyleSheet } from "react-native";
import CustomText from "./text";

const Title = ({ color, title, centered }: { color: string; title: string; centered?: boolean }) => {

  const styles = StyleSheet.create({
    text: {
      color: color,
      fontSize: 20,
      textAlign: centered ? "center" : "left",
      fontFamily: 'Geist-Bold',
      marginBottom: 4,
    },
  });

  return <CustomText style={styles.text}>{title}</CustomText>;
};

export default Title;
