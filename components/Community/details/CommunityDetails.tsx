// CommunityCard.tsx - Full page version with sticky comment
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";
import TextProfileSection from "../../../universal/textWithProfile";
import { colors } from "../../../constants/Colors";
import CustomText from "../../../universal/lightText";
import ImageSlider from "../../../universal/imageSlider";
import AddComment from "./add-comment";
import {
  GET_USER_COMMENT_THREAD,
  IMAGE_URL,
  USER_COMMENT_A_POST,
} from "../../../constants/apiEndpoints";
import VideoPlayer from "../VideoPlayer";
import Description from "./Description";
import moment from "moment";
import CommentBox from "./CommentBox";
import { getRequest, postRequest } from "../../../api/commonQuery";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingPopup } from "../../../universal/popup";
import NoDataText from "../../../universal/NoDataText";
import useAuthStore from "../../../store/authenticationStore";
import { useCommunityPostStore } from "../../../store/communityPostStore";

const CommunityCard = ({
  post,
  comments,
  setComments,
  handleReply,
}: {
  post: any;
  comments: any[];
  setComments: (comments: any[]) => void;
  handleReply: (username: string, parent_user_id: string) => void;
}) => {
  const [loading, setLoading] = React.useState(false);

  const getComments = async () => {
    try {
      setLoading(true);
      const res = await getRequest<{ status: boolean; data: any }>(
        GET_USER_COMMENT_THREAD,
        {
          post_id: post.id,
        },
      );

      if (res.status) {
        setComments(res.data);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.log(error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getComments();
    }, []),
  );

  return (
    <>
      {/* Main layout */}
      <View style={{ flex: 1 }}>
        {/* Scrollable content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Top Section - User who posted */}
            <View style={{ paddingTop: 5, paddingHorizontal: 10 }}>
              <TextProfileSection
                heading={
                  post.user_f_name.trim() + " " + post.user_l_name.trim()
                }
                subHeading={post.user_city}
                location={"Posted " + moment(post.created_at).fromNow()}
                bg={colors.primary}
                profile={
                  post.user_f_name.trim()[0] + post.user_l_name.trim()[0]
                }
                icon={false}
              />
            </View>

            {post.media_type === "IMAGE" && (
              <ImageSlider
                images={post.media_link.map((item) => IMAGE_URL + "/" + item)}
              />
            )}
            {post.media_type === "VIDEO" && (
              <VideoPlayer videoUrl={post.media_link} />
            )}

            {/* Bottom Section - Trip/Group Info */}
            <View style={{ paddingTop: 0, paddingHorizontal: 15 }}>
              <TextProfileSection
                heading={post.event_title}
                subHeading={
                  "Hosted by " +
                  post.manager_f_name.trim() +
                  " " +
                  post.manager_l_name.trim()
                }
                location={"📍 " + post.event_location}
                bg={colors.textSecondary}
                profile={
                  post.manager_f_name.trim()[0] + post.manager_l_name.trim()[0]
                }
                icon={false}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 10,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Description
                description={post.short_desc}
                like_count={post.like_counter}
                is_liked={post.is_liked}
                post_id={post.id}
                event_id={post.event_id}
                comment_count={post.comment_counter}
              />

              <View
                style={{
                  paddingHorizontal: 10,
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "100%",
                }}
              >
                {comments.map((comment, index) => (
                  <CommentBox
                    key={index}
                    comment={comment}
                    setComments={setComments}
                    onReply={handleReply}
                  />
                ))}
                {comments.length === 0 && (
                  <NoDataText message="No Comments Yet." />
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* TRUE Sticky Footer */}
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.footer}
        >
          <AddComment
            onSubmit={handleCommentSubmit}
            placeholder="Add a comment..."
            userInitials={splittedUsername[0][0] + splittedUsername[1][0]}
            backgroundColor={colors.primary}
            value={commentText}
            onChangeText={setCommentText}
            inputRef={inputRef}
          />
        </KeyboardAvoidingView> */}
      </View>

      <LoadingPopup visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    // position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 20,
    gap: 12,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: "#F7FAFE",
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  commentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // for Android shadow
  },
});

export default CommunityCard;
