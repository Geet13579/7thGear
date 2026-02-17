import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import CommunityCard from "./CommunityCard";
import { getRequest } from "../../api/commonQuery";
import { GET_COMMUNITY_POSTS } from "../../constants/apiEndpoints";
import { LoadingPopup } from "../../universal/popup";
import NoDataFound from "../../universal/NoDataFound";
import BottomSheet from "@gorhom/bottom-sheet";
import CommentsBottomSheet from "./CommentsBottomSheet";
import { useCommunityPostStore } from "../../store/communityPostStore";

const RecentInsurance = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const posts = useCommunityPostStore((state) => state.posts);
  const setPosts = useCommunityPostStore((state) => state.setPosts);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{
    postId: string;
    eventId: string;
  } | null>(null);
  const commentsSheetRef = useRef<BottomSheet>(null);

  const handleOpenComments = (postId: string, eventId: string) => {
    setSelectedPost({ postId, eventId });
    commentsSheetRef.current?.expand();
  };

  const getCommunityPosts = async () => {
    try {
      setLoading(true);
      const response = await getRequest<{ status: boolean; data: any }>(
        GET_COMMUNITY_POSTS,
        { cat_id: selectedCategory },
      );
      if (response.status) {
        setPosts(response.data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.log(error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory !== "") {
      getCommunityPosts();
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {posts.map((post, index) => (
        <CommunityCard
          key={index}
          post={post}
          onOpenComments={handleOpenComments}
        />
      ))}
      <View style={{ marginTop: 20 }}>
        {posts.length === 0 && !loading && (
          <NoDataFound message="No Posts Found." />
        )}
      </View>
      <LoadingPopup visible={loading} />

      {/* <CommentsBottomSheet
        ref={commentsSheetRef}
        postId={selectedPost?.postId || ""}
        eventId={selectedPost?.eventId || ""}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default RecentInsurance;
