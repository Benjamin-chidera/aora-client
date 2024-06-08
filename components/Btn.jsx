import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const Btn = ({ name, onPress, styles, isLoading, textStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[60px] justify-center items-center ${styles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      onPress={onPress}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {name} { isLoading && <ActivityIndicator size={"small"} color={"black"}/>}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;
