import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalPost } from "../../context/postContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveOrDelete = ({ postId }) => {
  const { handleDelete, handleSave, handleSaveDelete } = useGlobalPost();
  const [open, setOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const getSaved = async () => {
      const savedPosts = await AsyncStorage.getItem("savedPosts");
      const savedPostsArray = savedPosts ? JSON.parse(savedPosts) : [];
      setIsSaved(savedPostsArray.includes(postId));
    };

    getSaved();
  }, [postId]);

  const handleClose = () => {
    setOpen(true);
  };

  const handleSavePost = async () => {
    try {
      await handleSave(postId);
      setIsSaved(true);
      const savedPosts = await AsyncStorage.getItem("savedPosts");
      const savedPostsArray = savedPosts ? JSON.parse(savedPosts) : [];
      savedPostsArray.push(postId);
      await AsyncStorage.setItem("savedPosts", JSON.stringify(savedPostsArray));
      handleClose();
    } catch (error) {
      console.error("Error saving post:", error);
      Alert.alert("Error", "Failed to save post.");
    }
  };

  const handleRemoveSavePost = async () => {
    try {
      await handleSaveDelete(postId);
      setIsSaved(false);
      const savedPosts = await AsyncStorage.getItem("savedPosts");
      const savedPostsArray = savedPosts ? JSON.parse(savedPosts) : [];
      const updatedSavedPosts = savedPostsArray.filter((id) => id !== postId);
      await AsyncStorage.setItem(
        "savedPosts",
        JSON.stringify(updatedSavedPosts)
      );
      handleClose();
    } catch (error) {
      console.error("Error removing saved post:", error);
      Alert.alert("Error", "Failed to remove saved post.");
    }
  };

  return (
    <>
      {!open && (
        <View className="bg-black-200 w-[111px] h-[84px] justify-center items-center rounded-lg mt-2 flex-col">
          {isSaved ? (
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={handleRemoveSavePost}
            >
              <Ionicons name="bookmark" size={24} color="white" />
              <Text className="text-gray-100 text-sm font-psemibold">
                Remove 
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={handleSavePost}
            >
              <Ionicons name="bookmark-outline" size={24} color="white" />
              <Text className="text-gray-100 text-sm font-psemibold">Save</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="flex-row items-center gap-2 mt-3"
            onPress={() => handleDelete(postId)}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
            <Text className="text-gray-100 text-sm font-psemibold">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default SaveOrDelete;
