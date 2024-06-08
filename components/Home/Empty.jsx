import { View, Text, Image } from "react-native";
import React from "react";
import images from "../../constants/images";
import Btn from "../Btn";
import { router } from "expo-router";

const Empty = ({ text }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex flex-col items-center">
        <Image
          source={images.empty}
          className="w-40 h-40"
          resizeMode="contain"
        />
        <Text className=" my-3 text-gray-100 text-lg">{text} 😢</Text>

        <View className="w-full">
          <Btn
            name={"Create Video"}
            onPress={() => router.push("/Create")}
            styles={"w-full mt-7"}
          />
        </View>
      </View>
    </View>
  );
};

export default Empty;
