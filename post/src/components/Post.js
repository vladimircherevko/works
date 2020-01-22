import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";

export const Post = ({ post, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(post)} activeOpacity={0.7}>
      <View style={styles.wrap}>
        <ImageBackground source={{ uri: post.img }} style={styles.img}>
          <View style={styles.textWrap}>
            <Text style={styles.text}>
              {new Date(post.date).toLocaleDateString()}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 15,
    overflow: "hidden"
  },
  img: {
    width: "100%",
    height: 200
  },
  textWrap: {
    backgroundColor: "rgba(0,0,0,.5)",
    paddingVertical: 5,
    alignItems: "center",
    width: "100%"
  },
  text: {
    color: "#fff",
    fontFamily: "roboto-regular",
    fontSize: 20
  }
});
