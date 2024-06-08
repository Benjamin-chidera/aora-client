import { Link, Redirect, router, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, ActivityIndicator } from "react-native";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../components/Btn";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userGlobalContext } from "../context/userContext";
// import { Image } from "expo-image";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const { isLoading, isLoggedIn } = userGlobalContext();

  if (!isLoading && isLoggedIn) {
    SplashScreen.hideAsync();
    return <Redirect href={"/Home"} />;
  }

  return (
    <>
      <SafeAreaView className="h-full bg-primary">
        <View contentContainerStyle={{ height: "100%" }}>
          <View
            className={"w-full justify-center items-center min-h-[85vh] px-4"}
          >
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              // style={{ width: 200, height: 200 }}
              resizeMode="contain"
              className="max-w-[380px] w-full h-[300px]"
            />

            <View className="relative">
              <Text className="text-3xl text-center text-white font-semibold">
                Discover Endless Possibilities with{" "}
                <Text className="text-secondary-200 relative">Aora</Text>
              </Text>

              <Image
                source={images.path}
                className="w-24 absolute -bottom-4 -right-3"
                resizeMode="contain"
              />
            </View>

            <Text className="text-[#CDCDE0] mt-5 text-center font-pregular">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>

            <Btn
              onPress={() => router.push("/SignIn")}
              name={"Continue with Email"}
              styles={"w-full mt-7"}
            />
          </View>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </>
  );
}
