import { View, Text, FlatList } from "react-native";
import React from "react";

const HomeItem = ({ post }) => {
  return (
    <View>
      <FlatList
        data={post}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        horizontal
        // ListEmptyComponent={() => <Empty text={"No Video Found"} />}
      />
    </View>
  );
};

export default HomeItem;
