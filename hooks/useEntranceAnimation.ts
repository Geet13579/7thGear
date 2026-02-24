import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useEntranceAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideFromTop = useRef(new Animated.Value(-100)).current;
  const slideFromBottom = useRef(new Animated.Value(100)).current;
  const formSlideUp = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.timing(slideFromTop, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(formSlideUp, {
        toValue: 0,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),

      Animated.timing(slideFromBottom, {
        toValue: 0,
        duration: 800,
        delay: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    fadeAnim,
    slideFromTop,
    slideFromBottom,
    formSlideUp,
  };
};
