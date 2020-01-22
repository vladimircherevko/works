import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import { Post } from "../components/Post";

export const PostList = ({ data = [], open }) => (
  <View style={styles.container}>
    {(data.length && (
      <FlatList
        data={data}
        keyExtractor={post => "i" + post.id}
        renderItem={({ item }) => <Post post={item} onPress={open} />}
      />
    )) || <Text style={styles.text}>No post :( , you can add a new one!</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    marginVertical: 40
  }
});
