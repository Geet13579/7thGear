import Header from "../components/Community/details/Header";
import Container from "../universal/Container2";
import CardBody from "../components/Community/details/CommunityDetails";
import {
  View,
  Animated,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import AddComment from "../components/Community/details/add-comment";
import { postRequest } from "../api/commonQuery";
import {
  USER_COMMENT_A_POST,
  USER_REPLY_TO_COMMENT,
} from "../constants/apiEndpoints";
import { colors } from "../constants/Colors";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../store/authenticationStore";
import { useCommunityPostStore } from "../store/communityPostStore";

const KeyboardWrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

const CommunityDetails = ({ route }: { route: any }) => {
  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyDetails, setReplyDetails] = useState({
    isAReply: false,
    username: "",
    parent_id: "",
  });
  const [commentText, setCommentText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<TextInput>(null);

  const user = useAuthStore((state) => state.user);
  const splittedUsername = user.full_name.split(" ");
  const posts = useCommunityPostStore((state) => state.posts);
  const setPosts = useCommunityPostStore((state) => state.setPosts);

  const handleReply = (username: string, parent_id: string) => {
    setReplyDetails({
      isAReply: true,
      username,
      parent_id,
    });
    setCommentText(`@${username.trim().split(" ").join("_")} `);
    inputRef.current?.focus();
  };

  const handleCommentSubmit = async (text: string) => {
    try {
      setLoading(true);
      const res = await postRequest<{ status: boolean; data: any }>(
        USER_COMMENT_A_POST,
        {
          post_id: post.id,
          comment: text,
          event_id: post.event_id,
        },
      );

      if (res.status) {
        setComments((prev) => [res.data, ...prev]);
        setCommentText(""); // Clear input on success
        setPosts(
          posts.map((p) =>
            p.id === post.id
              ? { ...p, comment_counter: Number(p.comment_counter) + 1 }
              : p,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Recursive function to add reply to the correct parent
  const addReplyToComment = (commentsList: any[], newReply: any): any[] => {
    return commentsList.map((comment) => {
      if (comment.id === newReply.parent_id) {
        return {
          ...comment,
          replies: [newReply, ...(comment.replies || [])],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, newReply),
        };
      }
      return comment;
    });
  };

  const handleReplyComment = async () => {
    try {
      setLoading(true);
      const postData = {
        post_id: post.id,
        comment: commentText,
        event_id: post.event_id,
        parent_id: replyDetails.parent_id,
      };
      const res = await postRequest<{ status: boolean; data: any }>(
        USER_REPLY_TO_COMMENT,
        postData,
      );
      if (res.status) {
        setCommentText("");
        setReplyDetails({
          isAReply: false,
          username: "",
          parent_id: "",
        });

        // Update local state by adding the new reply to the correct parent
        setComments((prevComments) =>
          addReplyToComment(prevComments, res.data),
        );
      }
      console.log(res, postData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Changed passed value to false from true
    }
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardWrapper behavior="padding" style={{ flex: 1 }}>
      <Container style={{ paddingTop: 70, position: "relative", flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Animated.View
            style={[
              { gap: 16 },
              { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] },
            ]}
          >
            <Header />
          </Animated.View>

          {/* Changed slideFromTop to slideFromBottom */}
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideFromBottom }],
              },
            ]}
          >
            <CardBody
              post={post}
              comments={comments}
              setComments={setComments}
              handleReply={handleReply}
            />
          </Animated.View>
        </ScrollView>

        <AddComment
          onSubmit={
            replyDetails.isAReply ? handleReplyComment : handleCommentSubmit
          }
          placeholder="Add a comment..."
          userInitials={splittedUsername[0][0] + splittedUsername[splittedUsername.length - 1][0]}
          backgroundColor={colors.primary}
          value={commentText}
          onChangeText={setCommentText}
          inputRef={inputRef}
          loading={loading}
          keyboardHeight={keyboardHeight}
          replyDetails={replyDetails}
          setReplyDetails={setReplyDetails}
        />
      </Container>
    </KeyboardWrapper>
  );
};

export default CommunityDetails;
