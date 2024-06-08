import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "red" },
        }}
      >
        <Stack.Screen
          name="SignIn"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
