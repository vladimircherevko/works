import * as Font from "expo-font";

export const bootstrap = async () => {
  await Font.loadAsync({
    "roboto-bold": require("./fonts/Roboto-Bold.ttf"),
    "roboto-regular": require("./fonts/Roboto-Regular.ttf")
  });
  return;
};
