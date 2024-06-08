import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const FormField = ({
  title,
  value,
  handleChangeText,
  styles,
  keyboardType,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className={` space-y-2 ${styles}`}>
      <Text className="text-gray-100">{title}</Text>
      <View className="relative">
        <TextInput
          className="bg-black-200 h-14 rounded-md px-3 text-gray-100 border focus:border-secondary"
          value={value}
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && value.length > 0 && (
          <Pressable
            className="absolute right-2 bottom-4"
            onPress={handleShowPassword}
          >
            {!showPassword ? (
              <Ionicons name="eye" size={20} color="white" />
            ) : (
              <Ionicons name="eye-off" size={20} color="white" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FormField;
