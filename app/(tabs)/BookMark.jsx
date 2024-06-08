import { FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useGlobalPost } from "../../context/postContext";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/Home/SearchInput";
import VideoCards from "../../components/Home/VideoCards";
import Empty from "../../components/Home/Empty";

const BookMark = () => {
  const { saved, RefetchData } = useGlobalPost();
  const [refresh, setRefresh] = useState(false);
  const onRefreshing = async () => {
    setRefresh(true);
    await RefetchData();
    setRefresh(false);
  };

  
  return (
    <SafeAreaView className="flex-1 bg-primary px-4 pt-8">
      <View className="flex-1">
        <SearchInput placeholder="Search for a video topic" />

        <FlatList
          data={saved}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <VideoCards {...item} />}
          ListEmptyComponent={() => <Empty text={"No Video Found"} />}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefreshing} />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default BookMark;

const styles = StyleSheet.create({});
