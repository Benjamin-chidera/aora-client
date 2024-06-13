import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { router, SplashScreen } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext({});
export const userGlobalContext = () => useContext(UserContext);

const BASE_URL = "172.20.10.2:3000/api/v1/auth";
export const UserProvider = ({ children }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const register = async () => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `https://aora-server-csch.onrender.com/api/v1/auth/register`,
        
        { ...form }
      );

      await AsyncStorage.setItem("token", data.user.token);
      router.push("/Home");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  const login = async () => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `https://aora-server-csch.onrender.com/api/v1/auth/login`,
        {
          ...form,
        }
      );

      await AsyncStorage.setItem("token", data.user.token);
      router.push("/Home");
    } catch (error) {
      console.error("Network error:", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token); // Update isLoggedIn based on token existence
        SplashScreen.hideAsync();
      } catch (e) {
        console.error("Failed to load token from storage", e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // useEffect(() => {
  //   const removed = async () => {
  //     await AsyncStorage.removeItem("token");
  //   };

  //   removed();
  // }, []);

  const values = {
    form,
    setForm,
    register,
    isSubmitting,
    login,
    isLoading,
    isLoggedIn,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
