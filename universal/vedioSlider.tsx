// import React, { useRef, useState, useEffect } from "react";
// import { View, StyleSheet, ScrollView, Dimensions, Animated } from "react-native";
// import Video from "react-native-video"; // npm install react-native-video

// const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const VIDEO_WIDTH = SCREEN_WIDTH;

// const VideoSlider = ({ videos }: { videos: string[] }) => {
//   const [videoHeight, setVideoHeight] = useState(SCREEN_WIDTH * 0.75); // Default 4:3 ratio
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const videoRefs = useRef<any[]>([]);

//   // Pause all videos except the current one
//   useEffect(() => {
//     videoRefs.current.forEach((video, index) => {
//       if (video && index !== currentIndex) {
//         video.setNativeProps({ paused: true });
//       }
//     });
//   }, [currentIndex]);

//   const onScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     {
//       useNativeDriver: false,
//       listener: (event: any) => {
//         const offsetX = event.nativeEvent.contentOffset.x;
//         const index = Math.round(offsetX / VIDEO_WIDTH);
//         setCurrentIndex(index);
//       },
//     }
//   );

//   const onLoad = (data: any) => {
//     // Calculate height based on video dimensions
//     if (data.naturalSize) {
//       const { width, height } = data.naturalSize;
//       const ratio = height / width;
//       setVideoHeight(VIDEO_WIDTH * ratio);
//     }
//   };

//   return (
//     <View style={[styles.sliderContainer, { height: videoHeight }]}>
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={onScroll}
//         scrollEventThrottle={16}
//         decelerationRate="fast"
//         snapToInterval={VIDEO_WIDTH}
//         snapToAlignment="center"
//         contentContainerStyle={styles.scrollContent}
//       >
//         {videos.map((video, index) => (
//           <View key={index} style={[styles.videoContainer, { height: videoHeight }]}>
//             <Video
//               ref={(ref) => (videoRefs.current[index] = ref)}
//               source={{ uri: video }}
//               style={styles.video}
//               resizeMode="cover"
//               paused={index !== currentIndex}
//               controls={true}
//               repeat={false}
//               onLoad={index === 0 ? onLoad : undefined}
//               playInBackground={false}
//               playWhenInactive={false}
//             />
//           </View>
//         ))}
//       </ScrollView>

//       {/* Dot Indicators */}
//       <View style={styles.dotContainer}>
//         {videos.map((_, index) => {
//           const inputRange = [
//             (index - 1) * VIDEO_WIDTH,
//             index * VIDEO_WIDTH,
//             (index + 1) * VIDEO_WIDTH,
//           ];

//           const dotWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [8, 20, 8],
//             extrapolate: "clamp",
//           });

//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.3, 1, 0.3],
//             extrapolate: "clamp",
//           });

//           return (
//             <Animated.View
//               key={index}
//               style={[
//                 styles.dot,
//                 {
//                   width: dotWidth,
//                   opacity,
//                   backgroundColor:
//                     index === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
//                 },
//               ]}
//             />
//           );
//         })}
//       </View>

//       {/* Counter */}
//       <View style={styles.counterContainer}>
//         <Animated.Text style={styles.counterText}>
//           {currentIndex + 1}/{videos.length}
//         </Animated.Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   sliderContainer: {
//     width: "100%",
//     position: "relative",
//     backgroundColor: "#000",
//   },
//   scrollContent: {
//     paddingHorizontal: 0,
//   },
//   videoContainer: {
//     width: VIDEO_WIDTH,
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
//   dotContainer: {
//     position: "absolute",
//     bottom: 12,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 6,
//   },
//   dot: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#fff",
//   },
//   counterContainer: {
//     position: "absolute",
//     top: 12,
//     right: 12,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   counterText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },
// });

// export default VideoSlider;