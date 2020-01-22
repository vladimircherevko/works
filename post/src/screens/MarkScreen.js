import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function MarkScreen() {
  return (
    <View style={styles.container}>
      <Text>O</Text>
    </View>
  );
}
MarkScreen.navigationOptions = {
  headerTitle: "Main Screen"
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
