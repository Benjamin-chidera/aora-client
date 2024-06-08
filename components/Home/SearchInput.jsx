import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useGlobalPost } from "../../context/postContext";
import axios from "axios";

const SearchInput = ({ placeholder }) => {
  const { query, handleSearchInput, handleSearch } = useGlobalPost();

  return (
    <View className="relative">
      <TextInput
        className="bg-black-200 h-14 rounded-md px-3 pr-8 text-gray-100 border focus:border-gray-100 placeholder:text-lg"
        value={query}
        onChangeText={handleSearchInput}
        placeholder={placeholder}
        placeholderTextColor={"#cdcde0"}
      />

      <TouchableOpacity
        className="absolute right-2 bottom-3"
        onPress={handleSearch}
      >
        <Ionicons name="search" size={24} color={"#7b7b8b"} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
