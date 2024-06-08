import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalPost } from "../../context/postContext";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCards from "../../components/Home/VideoCards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Empty from "../../components/Home/Empty";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Redirect, router } from "expo-router";

const Profile = () => {
  const { author, post, loading, RefetchData } = useGlobalPost();
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

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

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("token");
    return router.replace("/SignIn")
  };

  return (
    <SafeAreaView className="px-4 pt-7 bg-primary h-full">
      <FlatList
        data={author.userPost}
        key={(item) => item._id}
        renderItem={({ item }) => <VideoCards {...item} />}
        ListHeaderComponent={() => (
          <View>
            <TouchableOpacity className="items-end pb-2" onPress={handleLogOut}>
              <MaterialCommunityIcons name="logout" size={24} color="red" />
            </TouchableOpacity>
            <View className="h-[56px] w-[56px] mx-auto border border-secondary rounded-lg">
              <Image
                source={{
                  uri: user?.userProfile,
                }}
                className="w-full h-full rounded-lg"
              />
            </View>

            <View className="justify-center items-center mt-2">
              <Text className="text-gray-100 text-2xl font-psemibold capitalize">
                {user?.username}
              </Text>
              <View className="flex flex-row gap-10  pt-5">
                <View>
                  <Text className="text-xl font-psemibold text-gray-100">
                    {author?.userPost?.length || 0}
                  </Text>
                  <Text className="text-xs font-pregular text-gray-100">
                    posts
                  </Text>
                </View>
                <View>
                  <Text className="text-xl font-psemibold text-gray-100">
                    1.2k
                  </Text>
                  <Text className="text-xs font-pregular text-gray-100">
                    Views
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <Empty text={"No Video Found"} />}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefreshing} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
