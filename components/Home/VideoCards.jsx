import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import SaveOrDelete from "../Home/SaveOrDelete";

const VideoCards = ({ video, image, title, author, _id }) => {
  const [play, setPlay] = useState(false);
  const [showOptions, setShowOptions] = useState(false);


  return (
    <View className="flex-col items-center  mb-14 mt-4">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1 ">
          <View
            className={
              "w-[46px] h-[46px] border border-secondary rounded-lg  mb-1"
            }
          >
            <Image
              source={{ uri: author?.userProfile || image }} // user profile pic
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {author?.username || "benTest"}
            </Text>
          </View>
        </View>

        <View className="relative">
          <TouchableOpacity
            className={"pt-2"}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Entypo name="dots-three-vertical" size={20} color="white" />
          </TouchableOpacity>

          {showOptions && (
            <View className="absolute right-0 top-8 z-20">
              <SaveOrDelete postId={_id} />
            </View>
          )}
        </View>
      </View>

      <View className="w-full h-[200px] rounded-lg mt-5 -z-10">
        {play ? (
          <Video
            source={{ uri: video }}
            className="w-full h-[200px] rounded-lg bg-white/70"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <TouchableOpacity
            className="relative"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <Image
              source={{ uri: image }}
              className="w-full h-[200px] rounded-lg"
              resizeMode="cover"
            />
            <View className=" absolute top-[40%] left-[40%]">
              <AntDesign name="play" size={44} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VideoCards;
