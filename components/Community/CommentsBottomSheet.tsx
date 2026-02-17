import React, { forwardRef, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import TextProfileSection from "../../universal/textWithProfile";
import { colors } from "../../constants/Colors";
import { Entypo, Feather } from "@expo/vector-icons";
import CustomText from "../../universal/text";
import AddComment from "./details/add-comment";
import { postRequest } from "../../api/commonQuery";
import { USER_COMMENT_A_POST } from "../../constants/apiEndpoints";

type Props = {
  postId: string;
  eventId: string;
};

const CommentsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ postId, eventId }, ref) => {
    const snapPoints = useMemo(() => ["40%", "75%"], []);

    const handleCommentSubmit = async (commentText: string) => {
      try {
        const res = await postRequest<{ status: boolean; message: string }>(
          USER_COMMENT_A_POST,
          {
            event_id: eventId,
            post_id: postId,
            comment: commentText,
          },
        );

        if (res.status) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleSheetChanges = useCallback((index: number) => {
      console.log("BottomSheet index:", index);
    }, []);

    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => (
        <BottomSheetFooter {...props} bottomInset={0}>
          <View style={styles.footerContainer}>
            <AddComment
              onSubmit={handleCommentSubmit}
              placeholder="Add a comment..."
              userInitials="AS"
              backgroundColor={colors.primary}
            />
          </View>
        </BottomSheetFooter>
      ),
      [handleCommentSubmit],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        footerComponent={renderFooter}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          <View style={{ paddingHorizontal: 10 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <React.Fragment key={index}>
                <View style={styles.commentItem}>
                  <TextProfileSection
                    heading="Hosted by Adventure Seekers"
                    subHeading="This looks stunning! Adding to my bucket list 🙌"
                    bg={colors.primary}
                    profile="AS"
                    icon={false}
                    subHeadingColor={colors.text}
                  />

                  <View
                    style={{
                      padding: 10,
                      borderRadius: 20,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Feather name="heart" size={20} color="#94A3B8" />
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingTop: 5,
                    paddingLeft: 50,
                    paddingBottom: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <CustomText
                    style={{ fontSize: 12, color: colors.textSecondary }}
                  >
                    2 hours ago
                  </CustomText>
                  <Entypo
                    name="dot-single"
                    size={20}
                    color={colors.textSecondary}
                  />
                  <CustomText
                    style={{ fontSize: 12, color: colors.textSecondary }}
                  >
                    12 likes
                  </CustomText>
                </View>
              </React.Fragment>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  commentItem: {
    padding: 16,
  },
  footerContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingVertical: 8,
  },
});

export default CommentsBottomSheet;
