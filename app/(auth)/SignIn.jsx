import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import Btn from "../../components/Btn";
import { Link } from "expo-router";
import { SignInUser } from "../../lib/appwrite";
import { userGlobalContext } from "../../context/userContext";

const SignIn = () => {
  const { login, form, setForm, isSubmitting } = userGlobalContext();

  const handleSubmit = async () => {
     if (!form.email || !form.password) {
      Alert.alert("Invalid Input", "Fill all fields");
      return;
    }
    await login();
  };

  return (
    <SafeAreaView className="h-full bg-primary px-4">
      <View className=" justify-center  min-h-[75vh]">
        <Image source={images.logo} resizeMode="contain" className="w-28" />
        <Text className="text-white font-semibold text-2xl">Login to Aora</Text>
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          styles="mt-7"
          keyboardType="email-address"
          placeholder={"Enter Email"}
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          styles="mt-7"
          placeholder={"Enter Password"}
        />

        <Btn
          name={"Sign In"}
          onPress={handleSubmit}
          styles={"mt-5"}
          isLoading={isSubmitting}
        />

        <View>
          <Text className="text-center mt-5 text-gray-100 font-[500]">
            Don’t have an account?{" "}
            <Link href={"/SignUp"} className="text-secondary">
              Signup
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
