import React, {useState} from 'react';
import {ActivityIndicator, Animated, Pressable, Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';

interface LoadingButtonProps {
  title: string;
  onPress: () => Promise<void> | void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
  buttonColor?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loadingColor = 'white',
  buttonColor = '#b30000',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [width] = useState(new Animated.Value(200));
  const [fadeOut] = useState(new Animated.Value(0));
  const [border] = useState(new Animated.Value(15));

  const handlePress = async () => {
    if (isLoading) return;
    
    // Start animation
    Animated.parallel([
      Animated.timing(width, {toValue: 50, duration: 300, useNativeDriver: false}),
      Animated.timing(border, {toValue: 25, duration: 300, useNativeDriver: false}),
      Animated.timing(fadeOut, {toValue: 1, duration: 200, useNativeDriver: false}),
    ]).start();
    
    setIsLoading(true);
    
    try {
      await Promise.resolve(onPress());
    } finally {
      // Reset animation
      Animated.parallel([
        Animated.timing(width, {toValue: 200, duration: 300, useNativeDriver: false}),
        Animated.timing(border, {toValue: 15, duration: 300, useNativeDriver: false}),
        Animated.timing(fadeOut, {toValue: 0, duration: 200, useNativeDriver: false}),
      ]).start(() => {
        setIsLoading(false);
      });
    }
  };

  const fadeAnimation = fadeOut.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[
        styles.button,
        {
          backgroundColor: buttonColor,
          width: width,
          borderRadius: border,
        },
        style,
      ]}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color={loadingColor} />
      ) : (
        <Animated.Text style={[styles.text, {opacity: fadeAnimation}, textStyle]}>
          {title}
        </Animated.Text>
      )}
    </AnimatedPressable>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    color: 'white',
    fontSize: 17,
    letterSpacing: 1,
  },
});

export default LoadingButton;
