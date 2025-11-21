import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface UpperSectionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const UpperSection: React.FC<UpperSectionProps> = ({ children, style }) => {
  const styles = StyleSheet.create({
    upperSection: {
      borderStartEndRadius: 20,
      borderEndEndRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 80,
      paddingBottom: 20,
      ...style
    },
  });

  return <View style={styles.upperSection}>{children}</View>;
};

export default UpperSection;
