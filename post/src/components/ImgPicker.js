import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { View, StyleSheet, Image, Button, Alert } from "react-native";

async function takePermit() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );

  if (status !== "granted") {
    Alert.alert("Wrong!", "No permitions");
    return false;
  }
  return true;
}

export const ImgPicker = ({ onPick }) => {
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    const may = await takePermit();
    if (!may) return;

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.4,
      allowsEditing: false,
      aspect: [16, 9]
    });
    setImage(img.uri);
    onPick(img.uri);
  };
  return (
    <View style={styles.wrap}>
      <Button title="Take picture!" onPress={takePicture} />
      {image && <Image source={{ uri: image }} style={styles.img} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 10
  },
  img: {
    width: "100%",
    height: 200,
    marginVertical: 10
  }
});
