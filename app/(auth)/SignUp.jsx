import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import Btn from "../../components/Btn";
import { Link, router } from "expo-router";
import { CreateUser } from "../../lib/appwrite";
import { userGlobalContext } from "../../context/userContext";

const SignUp = () => {
  const { form, setForm, register, isSubmitting } = userGlobalContext();

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Invalid Input", "Fill all fields");
      return;
    }

    await register();
  };

  // if (!isSubmitting) {
  //   return (
  //     <View>
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView className="h-full bg-primary px-4">
      <View className=" justify-center  min-h-[75vh]">
        <Image source={images.logo} resizeMode="contain" className="w-28" />
        <Text className="text-white font-semibold text-2xl">
          Sign Up to Aora
        </Text>
        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          styles="mt-7"
          placeholder={"Enter Your unique Username"}
        />
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
          name={"Sign Up"}
          onPress={handleSubmit}
          styles={"mt-5"}
          isLoading={isSubmitting}
        />

        <View>
          <Text className="text-center mt-5 text-gray-100 font-[500]">
            Already have an account?
            <Link href={"/SignIn"} className="text-secondary">
              SignIn
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
// com.company.aora;
