import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { THEME } from "../theme";
import { HeaderIcon } from "../components/HeaderIcon";

export function AboutScreen() {
  return (
    <View>
      <Text style={styles.title}>Post App</Text>
      <Text style={styles.text}>
        React Native приложение для создания постов, содержащих фото с названием
        и датой. Позволяет отмечать пост как избранный и удалять. Сочетает
        работу разных навигаторов переключения экранов.
      </Text>
      <Image style={styles.img} source={{ uri: THEME.LOGO_IMG }} />
    </View>
  );
}

AboutScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "About App",
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

const styles = StyleSheet.create({
  title: {
    fontFamily: "roboto-bold",
    fontSize: 25,
    marginVertical: 20,
    textAlign: "center"
  },
  text: {
    fontFamily: "roboto-regular",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
    color: "#888"
  },
  img: {
    width: "100%",
    height: 300
  }
});
