import React, { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { HeaderIcon } from "../components/HeaderIcon";
import { PostList } from "../components/PostList";
import { loadPosts } from "../store/actions/postActions";

export function MainScreen({ navigation }) {
  const open = post => {
    navigation.navigate("Post", { postId: post.id, booked: post.booked });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const allPosts = useSelector(state => state.posts.allPosts);

  return <PostList data={allPosts} open={open} />;
}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Main Screen",
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
      <Item
        title="Foto"
        iconName="ios-images"
        onPress={() => navigation.push("Create")}
      />
    </HeaderButtons>
  ),
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
  // Эти стили будут доминировать над дефолтными в AppNavigation
  // headerStyle: {
  //   backgroundColor: "red"
  // },
  // headerTintColor: "yellow"
});
