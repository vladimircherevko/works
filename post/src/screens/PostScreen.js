import React, { useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Image, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import { HeaderIcon } from "../components/HeaderIcon";
import { THEME } from "../theme";
import { toggleBooked, removePost } from "../store/actions/postActions";

export function PostScreen({ navigation }) {
  const dispatch = useDispatch();

  const postId = navigation.getParam("postId");
  const post = useSelector(state =>
    state.posts.allPosts.find(p => p.id === postId)
  );

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  const booked = useSelector(state =>
    state.posts.bookedPosts.some(post => post.id === postId)
  );
  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  if (!post) return null;

  const pressHandler = () => {
    Alert.alert(
      "Внимание!",
      "Подтвердите удаление:",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Main");
            dispatch(removePost(postId));
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      <Image source={{ uri: post.img }} style={styles.img} />
      <View style={styles.textWrap}>
        <Text style={styles.text}>{post.text}</Text>
      </View>
      <Button
        title="Delete"
        onPress={pressHandler}
        color={THEME.DANGER_COLOR}
      />
    </View>
  );
}

PostScreen.navigationOptions = ({ navigation }) => {
  const postId = navigation.getParam("postId");
  const postBooked = navigation.getParam("booked");
  const toggleHandler = navigation.getParam("toggleHandler");
  const iconName = postBooked ? "ios-star" : "ios-star-outline";

  return {
    headerTitle: "Post " + postId,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderIcon}>
        <Item title="Star" iconName={iconName} onPress={toggleHandler} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  textWrap: {
    padding: 20
  },
  img: {
    width: "100%",
    height: 200
  },
  text: {
    fontSize: 20,
    fontFamily: "roboto-regular"
  }
});
