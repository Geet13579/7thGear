import React, { forwardRef, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

type Props = {
  postId: string;
};

const CommentsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ postId }, ref) => {
    const snapPoints = useMemo(() => ["40%", "80%"], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Comments</Text>

          {/* Replace with FlatList later */}
          <Text>Post ID: {postId}</Text>
          <Text>No comments yet...</Text>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default CommentsBottomSheet;
