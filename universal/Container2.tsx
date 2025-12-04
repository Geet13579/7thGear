import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 70,
      paddingBottom: 20,
      gap: 15,
      ...style
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default Container;
