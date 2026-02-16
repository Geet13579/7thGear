import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import CustomText from "../universal/text";
import * as ImagePicker from "expo-image-picker";
import Label from "../universal/Label";
import Container from "../universal/Container";
import Title from "../universal/Title";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useApi } from "../hooks/useApi";
import { postRequest } from "../api/commonQuery";
import { ADD_EVENT_POST_VIDEO } from "../constants/apiEndpoints";
import { Video, ResizeMode } from "expo-av";
import { ErrorPopup, LoadingPopup, SuccessPopup } from "../universal/popup";

const PostVideo = () => {
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access videos",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newVideos = result.assets.map((asset) => asset.uri);
      setVideos((prev) => [...prev, ...newVideos]);
    }
  };

  const removeVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const {
    isLoading,
    showSuccess,
    showError,
    errorMessage,
    successMessage,
    setShowSuccess,
    setShowError,
    setErrorMessage,
    setSuccessMessage,
    setIsLoading,
    handleErrorClose,
    handleSuccessClose,
  } = useApi();

  const uploadVideos = async () => {
    // Validate and save
    if (videos.length === 0 || !description) {
      setShowError(true);
      setErrorMessage("Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);
      const formattedVideos = videos.map((uri, index) => {
        const fileName = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(fileName);
        const extension = match ? match[1].toLowerCase() : "mp4";
        const type = `video/${extension === "mov" ? "quicktime" : extension}`;

        return {
          uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
          name: fileName || `video_${index}.${extension}`,
          type,
        };
      });

      const postData = {
        // cat_id: "",
        // event_id: "",
        // manager_id: "",
        short_desc: description,
        video: formattedVideos[0], // Changed from postimages
      };

      const res = await postRequest<{
        status: boolean;
        message: string;
        data: any;
      }>(
        ADD_EVENT_POST_VIDEO, // Keep the same endpoint for now unless a video one is found
        postData,
        true, // asFormData
      );

      console.log(res);
      if (res?.status) {
        setSuccessMessage(res.message);
        setShowSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setErrorMessage(error.message);
        setShowError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    handleSuccessClose();
    navigation.navigate("Community");
  };

  useFocusEffect(
    React.useCallback(() => {
      setDescription("");
      setVideos([]);
    }, []),
  );

  return (
    <Container>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} style={styles.backButton}>
          <Feather
            name="chevron-left"
            size={24}
            color={colors.black}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Title title="Post Video" color={colors.black} />
        <View style={styles.menuButton}>
          <Feather name="more-vertical" size={24} color={colors.black} />
        </View>
      </View>

      <View style={styles.section}>
        {/* <CustomText style={styles.sectionTitle}>
                  Event Banner
                </CustomText> */}
        {videos.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {videos.map((uri, index) => (
              <View key={index} style={styles.bannerThumbnailContainer}>
                <Video
                  source={{ uri: uri }}
                  style={styles.bannerThumbnail}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={false}
                  useNativeControls={false}
                />
                <TouchableOpacity
                  style={styles.removeThumbnailButton}
                  onPress={() => removeVideo(index)}
                >
                  <Feather name="x" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}

            {videos.length < 1 && (
              <TouchableOpacity
                style={[styles.bannerUpload, { width: 150, height: 100 }]}
                activeOpacity={0.8}
                onPress={pickVideo}
              >
                <View style={styles.uploadPlaceholder}>
                  <Feather name="film" size={24} color="#CBD5E0" />
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          <TouchableOpacity
            style={styles.bannerUpload}
            activeOpacity={0.8}
            onPress={pickVideo}
          >
            <View style={styles.uploadPlaceholder}>
              <Feather name="film" size={40} color="#CBD5E0" />
              <CustomText style={styles.uploadText}>Post Video</CustomText>
              <CustomText style={styles.uploadSubtext}>
                Tap to select a video
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.section]}>
        <Label label="Short Description *" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter post description here"
          placeholderTextColor="#9CA3AF"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.7}
        onPress={uploadVideos}
      >
        <CustomText style={styles.saveButtonText}>Post Now</CustomText>
      </TouchableOpacity>

      <LoadingPopup visible={isLoading} />
      <SuccessPopup
        visible={showSuccess}
        message={successMessage}
        onClose={handleCloseSuccess}
      />
      <ErrorPopup
        visible={showError}
        message={errorMessage}
        onClose={handleErrorClose}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#FF385C",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 16,
  },
  bannerUpload: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
  },
  bannerImageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  editOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  bannerThumbnailContainer: {
    width: 150,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  bannerThumbnail: {
    width: "100%",
    height: "100%",
  },
  removeThumbnailButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.black,
    backgroundColor: "#fff",
  },
});

export default PostVideo;
