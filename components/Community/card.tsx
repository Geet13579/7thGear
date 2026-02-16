import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CommunityCard from "./CommunityCard";
import { getRequest } from "../../api/commonQuery";
import { GET_COMMUNITY_POSTS } from "../../constants/apiEndpoints";
import { LoadingPopup } from "../../universal/popup";
import NoDataFound from "../../universal/NoDataFound";

const RecentInsurance = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <CommunityCard key={index} post={post} setPosts={setPosts} />
      ))}
      <View style={{ marginTop: 20 }}>
        {posts.length === 0 && !loading && (
          <NoDataFound message="No Posts Found." />
        )}
      </View>
      <LoadingPopup visible={loading} />
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
