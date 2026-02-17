import React from "react";
import { StyleSheet, View } from "react-native";
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
  onReply: (username: string) => void;
}) => {
  return (
    <React.Fragment>
      <View style={styles.content}>
        <Comment
          heading={comment.user_name}
          subHeading={comment.comment}
          timegap={moment(comment.created_at).fromNow()}
          like_count={comment.like_count}
          is_liked={comment.is_liked}
          replies={comment.replies}
          event_id={comment.event_id}
          post_id={comment.post_id}
          comment_id={comment.id}
          setComments={setComments}
          onReply={onReply}
          bg={colors.primary}
          profile={comment.first_name[0] + comment.last_name[0]}
          icon={false}
          subHeadingColor={colors.text}
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: "#F7FAFE",
    paddingHorizontal: 10,
    borderRadius: 12,
  },
});

export default CommentBox;
