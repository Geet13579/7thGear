import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../constants/Colors";
import { Entypo, Feather } from "@expo/vector-icons";
import CustomText from "../../../universal/text";
import Comment from "./Comment";
import moment from "moment";

const CommentBox = ({comment}: {comment: any}) => {
  return (
    <React.Fragment>
      <View style={styles.content}>
        <Comment
          heading={comment.user_name}
          subHeading={comment.comment}
          bg={colors.primary}
          profile="AS"
          icon={false}
          subHeadingColor={colors.text}
          timegap = {moment(comment.created_at).fromNow()}
          like_count={comment.like_count}
          is_liked={comment.is_liked}
          replies={comment.replies}
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
