import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 20,
      flex: 1,
      gap: 15,
      ...style
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default Container;
