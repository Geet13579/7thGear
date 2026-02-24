import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH; // Card padding

const CommunityCard = ({ images }: { images: string[] }) => {
  const [imageHeight, setImageHeight] = useState(250); // default fallback
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Auto-calc image height based on aspect ratio of first image
  useEffect(() => {
    if (!images || images.length === 0) return;

    Image.getSize(
      images[0],
      (w, h) => {
        const ratio = h / w;
        setImageHeight(IMAGE_WIDTH * ratio);
      },
      () => setImageHeight(250), // fallback if broken image
    );
  }, [images]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / IMAGE_WIDTH);
        setCurrentIndex(index);
      },
    },
  );

  return (
    <>
      <View style={[styles.sliderContainer, { height: imageHeight }]}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={IMAGE_WIDTH}
          snapToAlignment="center"
          contentContainerStyle={styles.scrollContent}
        >
          {images.map((image, index) => (
            <View
              key={index}
              style={[styles.imageContainer, { height: imageHeight }]}
            >
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>

        {/* Dot Indicators */}
        <View style={styles.dotContainer}>
          {images.map((_, index) => {
            const inputRange = [
              (index - 1) * IMAGE_WIDTH,
              index * IMAGE_WIDTH,
              (index + 1) * IMAGE_WIDTH,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity,
                    backgroundColor:
                      index === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Counter */}
        <View style={styles.counterContainer}>
          <Animated.Text style={styles.counterText}>
            {currentIndex + 1}/{images.length}
          </Animated.Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: "100%",
    position: "relative",
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dotContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  counterContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default CommunityCard;
