import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { router, usePathname } from "expo-router";
import { Alert } from "react-native";

const PostContext = createContext({});
export const useGlobalPost = () => useContext(PostContext);

const BASE_URL = "http://172.20.10.2:3000/api/v1/posts";

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchedPost, setSearchedPost] = useState([]);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const [error, setError] = useState("");
  const [author, setAuthor] = useState([]);
  const [saved, setSaved] = useState([]);

  const [savedIcon, setSavedIcon] = useState(false);

  useEffect(() => {
    const getUserFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          setUser(token);
        }
      } catch (error) {
        console.error("Error getting token from AsyncStorage:", error);
      }
    };
    getUserFromToken();
  }, []);

  const getPost = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data } = await axios(BASE_URL, {
        headers: { Authorization: `Bearer ${user}` },
      });

      if (data) {
        setPost(data.post);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [user]);

  const RefetchData = () => {
    getPost();
  };

  const getSearch = async () => {
    try {
      const { data } = await axios(
        `http://172.20.10.2:3000/api/v1/posts/q?title=${query}`
      );
      setSearchedPost(data.post);
      setError("");
    } catch (error) {
      console.log(error);
      setSearchedPost([]);
      setError(error.response.data.err);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  const handleSearchInput = (text) => {
    setQuery(text);
  };

  const handleSearch = () => {
    if (!query) {
      return Alert.alert(
        "Missing inputs",
        "Please input something to see a result"
      );
    }

    if (pathname.startsWith("/search")) router.setParams({ query });
    else router.push(`/search/${query}`);
  };

  useEffect(() => {
    const getUserPost = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const { data } = await axios(
          "http://172.20.10.2:3000/api/v1/posts/author",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAuthor(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserPost();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://172.20.10.2:3000/api/v1/posts/${postId}`);

      Alert.alert("Success", "Post deleted successfully.");
      RefetchData();
    } catch (error) {
      console.error("Error deleting post:", error);
      Alert.alert("Error", "Failed to delete post.");
    }
  };

  const handleSave = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return Alert.alert("Authentication error", "Please log in again.");
      }

      await axios.put(
        `http://172.20.10.2:3000/api/v1/posts/save/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const value = JSON.stringify(true); // Update the savedIcon state
      await AsyncStorage.setItem("save", value);

      setSavedIcon(true); // Update the savedIcon state in the context

      Alert.alert("Success", "Post saved successfully.");
      RefetchData();
    } catch (error) {
      console.error("Error saving post:", error);
      setSavedIcon(false); // Update the savedIcon state in case of error
      await AsyncStorage.setItem("save", JSON.stringify(false)); // Update AsyncStorage
      Alert.alert("Error", "Failed to save post.");
    }
  };

  const handleSaveDelete = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return Alert.alert("Authentication error", "Please log in again.");
      }

      await axios.delete(
        `http://172.20.10.2:3000/api/v1/posts/save/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const value = JSON.stringify(false); // Update the savedIcon state
      await AsyncStorage.setItem("save", value);

      setSavedIcon(false); // Update the savedIcon state in the context

      Alert.alert("Success", "Removed from bookmark");
      RefetchData();
    } catch (error) {
      console.error("Error saving post:", error);
      setSavedIcon(true); // Update the savedIcon state in case of error
      await AsyncStorage.setItem("save", JSON.stringify(true)); // Update AsyncStorage
      Alert.alert("Error", "Failed to save post.");
    }
  };

  useEffect(() => {
    const getSavedPost = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const { data } = await axios(
          "http://172.20.10.2:3000/api/v1/posts/save",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSaved(data.savedPosts);
      } catch (error) {
        console.log(error);
      }
    };
    getSavedPost();
  }, []);

  const values = {
    post,
    loading,
    RefetchData,
    searchedPost,
    query,
    handleSearchInput,
    handleSearch,
    error,
    author,
    handleDelete,
    handleSave,
    savedIcon,
    handleSaveDelete,
    saved,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};
