import { Video, ResizeMode } from "expo-av";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { IMAGE_URL } from "../../constants/apiEndpoints";

const AUTO_HIDE_DELAY = 3000;

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const videoRef = useRef<Video>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  /** Only for video tap */
  const onVideoTap = () => {
    if (showControls) {
      // If already visible → hide immediately
      setShowControls(false);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      return;
    }

    // Show + auto hide
    setShowControls(true);

    hideTimer.current = setTimeout(() => {
      setShowControls(false);
    }, AUTO_HIDE_DELAY);
  };

  /** Play / Pause should NOT affect control visibility */
  const togglePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }

    setIsPlaying(!isPlaying);
  };

  /** Fullscreen should NOT hide controls */
  const openFullscreen = async () => {
    await videoRef.current?.presentFullscreenPlayer();
  };

  return (
    <Pressable onPress={onVideoTap}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: IMAGE_URL + "/" + videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          isLooping
        />

        {showControls && (
          <>
            {/* Play / Pause */}
            <TouchableOpacity
              style={styles.centerButton}
              onPress={togglePlayPause}
              activeOpacity={0.7}
            >
              <FontAwesome6
                name={isPlaying ? "circle-pause" : "circle-play"}
                size={36}
                color="white"
              />
            </TouchableOpacity>

            {/* Fullscreen */}
            <TouchableOpacity
              style={styles.fullscreenButton}
              onPress={openFullscreen}
              activeOpacity={0.7}
            >
              <FontAwesome6 name="expand" size={20} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: 250,
  },
  centerButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -26 }, { translateY: -26 }],
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 50,
    padding: 12,
  },
  fullscreenButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 6,
    padding: 8,
  },
});

export default VideoPlayer;
