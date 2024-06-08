import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Video, ResizeMode } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import Btn from "../../components/Btn";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [play, setPlay] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: "",
    image: null,
    prompt: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setForm((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

  

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setForm((prev) => ({
        ...prev,
        video: result.assets[0].uri,
      }));
    }
  };

  const uploadPosts = async () => {
    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("video", {
      uri: form.video,
      name: "video.mp4",
      type: "video/mp4",
    });
    formData.append("image", {
      uri: form.image,
      name: "image.jpg",
      type: "image/jpeg",
    });
    formData.append("prompt", form.prompt);

    try {
      if (!form.title || !form.video || !form.image || !form.prompt) {
        Alert.alert("Invalid Input", "Input fields cannot be empty");
        return;
      }
      setUploading(true);
      const { data } = await axios.post(
        "http://172.20.10.2:3000/api/v1/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setForm({
        title: "",
        video: "",
        image: null,
        prompt: "",
      });

      router.push("/Home")
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="pt-7 px-4 bg-primary h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-2xl text-white font-semibold mb-7">
          Upload Video
        </Text>
        <View className="flex-col gap-5">
          <View>
            <Text className="mb-2 text-sm text-gray-100">Video Title</Text>
            <TextInput
              className="bg-black-200 h-14 rounded-md px-3 text-gray-100 border focus:border-secondary placeholder:text-sm"
              placeholder="Give your video a catchy title..."
              placeholderTextColor={"#7b7b8b"}
              onChangeText={(e) => setForm({ ...form, title: e })}
            />
          </View>

          <View>
            <Text className="mb-2 text-sm text-gray-100">Upload Video</Text>
            <View>
              <TouchableOpacity
                className="bg-black-200 h-52 w-full rounded-md text-gray-100 border focus:border-secondary placeholder:text-sm justify-center items-center"
                onPress={pickVideo}
              >
                {form.video ? (
                  <Video
                    className="h-52 w-full rounded-md"
                    source={{ uri: form.video }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                      if (status.didJustFinish) {
                        setPlay(false);
                      }
                    }}
                  />
                ) : (
                  <Ionicons name="cloud-upload" size={40} color="orange" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="mb-2 text-sm text-gray-100">Upload Image</Text>
            <View>
              <TouchableOpacity
                className="bg-black-200 h-52 w-full rounded-md  text-gray-100 border focus:border-secondary placeholder:text-sm justify-center items-center"
                onPress={pickImage}
              >
                {form.image ? (
                  <Image
                    source={{ uri: form.image }}
                    className="h-52 w-full rounded-md"
                  />
                ) : (
                  <Ionicons name="cloud-upload" size={40} color="orange" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="mb-2 text-sm text-gray-100">AI Prompt</Text>
            <TextInput
              className="bg-black-200 h-14 rounded-md px-3 text-gray-100 border focus:border-secondary placeholder:text-sm"
              placeholder="The AI prompt of your video...."
              placeholderTextColor={"#7b7b8b"}
              onChangeText={(e) => setForm({ ...form, prompt: e })}
            />
          </View>

          <Btn
            onPress={uploadPosts}
            styles={"mt-5"}
            name={"Submit & Publish"}
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
