import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/Home/SearchInput";
import Trending from "../../components/Home/Trending";
import Empty from "../../components/Home/Empty";
import { useGlobalPost } from "../../context/postContext";
import VideoCards from "../../components/Home/VideoCards";

import { useLocalSearchParams } from "expo-router";
const Search = () => {
   const { query } = useLocalSearchParams();
   const { searchedPost, RefetchData, error } = useGlobalPost();
   const [refresh, setRefresh] = useState(false);

   const onRefreshing = async () => {
     setRefresh(true);
     await RefetchData();
     setRefresh(false);
   };


  return (
    <SafeAreaView className="bg-primary h-full px-4 pt-5">
      <View className="flex-1">
            <View>
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Search Result
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {query}
                  </Text>
                </View>
              </View>
              <SearchInput placeholder="Search for a video topic" />
            </View>
        <FlatList
          data={searchedPost}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <VideoCards {...item} />}
          // ListHeaderComponent={() => (
          // )}
          ListEmptyComponent={() => <Empty text={error} />}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefreshing} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
