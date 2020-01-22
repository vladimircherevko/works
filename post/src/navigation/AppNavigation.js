import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import { MainScreen } from "../screens/MainScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { PostScreen } from "../screens/PostScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { BookedScreen } from "../screens/BookedScreen";
import { THEME } from "../theme";

const navOptions = {
  // Стили для заголовка общие для всех экранов
  // будут перекрыты стилями в конкретном экране
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: (Platform.OS === "android" && THEME.MAIN_COLOR) || "#fff"
    },
    headerTintColor: (Platform.OS === "android" && "#fff") || THEME.MAIN_COLOR
  }
};

const PostNav = createStackNavigator(
  {
    Main: MainScreen,
    Post: PostScreen
  },
  navOptions
);

const BookedNav = createStackNavigator(
  {
    Booked: BookedScreen,
    Post: PostScreen
  },
  navOptions
);

const configBottomTab = {
  Post: {
    screen: PostNav,
    navigationOptions: {
      tabBarLabel: "All", // текст кнопки возле иконки
      tabBarIcon: info => (
        <Ionicons name="ios-albums" size={25} color={info.tintColor} />
      )
    }
  },
  Booked: {
    screen: BookedNav,
    navigationOptions: {
      tabBarIcon: info => (
        <Ionicons name="ios-star" size={25} color={info.tintColor} />
      )
      // tabBarIcon: <Ionicons name="ios-star" size={25} />
    }
  }
};

const BottomNav =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(configBottomTab, {
        activeTintColor: "#fff",
        barStyle: { backgroundColor: THEME.MAIN_COLOR },
        shifting: true
      })
    : createBottomTabNavigator(configBottomTab, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR
        }
      });
const AboutNav = createStackNavigator(
  {
    About: AboutScreen
  },
  navOptions
);

const CreateNav = createStackNavigator(
  {
    Create: CreateScreen
  },
  navOptions
);

const MainNav = createDrawerNavigator(
  {
    PostTabs: {
      screen: BottomNav,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: <Ionicons name="ios-partly-sunny" size={25} />
      }
    },
    About: {
      screen: AboutNav,
      navigationOptions: {
        drawerLabel: "About this App"
      }
    },
    Create: {
      screen: CreateNav,
      navigationOptions: {
        drawerLabel: "Add a new post"
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: "roboto-regular"
      }
    }
  }
);

export const AppNavigation = createAppContainer(MainNav);
