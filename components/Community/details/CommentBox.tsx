import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../../constants/Colors";
import Comment from "./Comment";
import moment from "moment";

const CommentBox = ({
  comment,
  setComments,
  onReply,
}: {
  comment: any;
  setComments: (comments: any[]) => void;
  onReply: (username: string, parent_user_id: string) => void;
}) => {
  const [showReplies, setShowReplies] = React.useState(false);

  return (
    <View>
      <View style={styles.content}>
        <Comment
          heading={comment.first_name + " " + comment.last_name}
          subHeading={comment.comment}
          timegap={moment(comment.created_at).fromNow()}
          like_count={comment.like_count}
          is_liked={comment.is_liked}
          replies={comment.replies}
          event_id={comment.event_id}
          post_id={comment.post_id}
          comment_id={comment.id}
          setComments={setComments}
          onReply={(username, parent_id) => {
            onReply(username, parent_id);
            setShowReplies(true);
          }}
          bg={colors.primary}
          profile={comment.first_name[0] + comment.last_name[0]}
          icon={false}
          subHeadingColor={colors.text}
          parent_id={comment.parent_id}
        />
      </View>
 
      {comment.replies && comment.replies.length > 0 && (
        <View style={{ paddingLeft: 10 }}>
          <Text
            onPress={() => setShowReplies(!showReplies)}
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: "600",
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            {showReplies
              ? "Hide Replies"
              : `View ${comment.replies.length} ${
                  comment.replies.length === 1 ? "Reply" : "Replies"
                }`}
          </Text>
        </View>
      )}

      {showReplies && comment.replies && comment.replies.length > 0 && (
        <View style={{ paddingLeft: 40, marginTop: 0, gap: 10 }}>
          {comment.replies.map((reply: any) => (
            <CommentBox
              key={reply.id}
              comment={reply}
              setComments={setComments}
              onReply={onReply}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,

    paddingHorizontal: 10,
    borderRadius: 12,
  },
});

export default CommentBox;
