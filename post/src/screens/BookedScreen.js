import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import { HeaderIcon } from "../components/HeaderIcon";
import { PostList } from "../components/PostList";

export function BookedScreen({ navigation }) {
  const open = post => {
    navigation.navigate("Post", { postId: post.id, booked: post.booked });
  };

  const bookedPosts = useSelector(state => state.posts.bookedPosts);

  return <PostList data={bookedPosts} open={open} />;
}

BookedScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Booked Screen",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
});
