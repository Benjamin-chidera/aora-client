import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/Home/SearchInput";
import Trending from "../../components/Home/Trending";
import Empty from "../../components/Home/Empty";
import { useGlobalPost } from "../../context/postContext";
import VideoCards from "../../components/Home/VideoCards";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const { post, loading, RefetchData } = useGlobalPost();
  const [user, setUser] = useState({});

  const onRefreshing = async () => {
    setRefresh(true);
    await RefetchData();
    setRefresh(false);
  };

  let decode = null;
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token && typeof token === "string" && token !== null) {
          decode = jwtDecode(token);
        
          setUser(decode);
        }
      } catch (error) {
        console.error("Error getting token from AsyncStorage:", error);
      }
    };

    getToken();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary px-4 pt-8">
      <View className="flex-1">
        <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {user?.username}
            </Text>
          </View>
          <View>
            <Image
              source={images.logoSmall}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </View>
        </View>
        <SearchInput placeholder="Search for a video topic" />

        <FlatList
          data={post}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <VideoCards {...item} />}
          ListHeaderComponent={() => (
            <View className="flex">
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular">
                  Trending Video
                </Text>
                <Trending posts={post?.slice(0, 7)} />
              </View>
            </View>
          )}
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

export default Home;

const styles = StyleSheet.create({});
