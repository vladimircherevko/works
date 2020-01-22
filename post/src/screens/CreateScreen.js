import React, { useState, useRef } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import { HeaderIcon } from "../components/HeaderIcon";
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  View,
  Keyboard
} from "react-native";
import { THEME } from "../theme";
import { addPost } from "../store/actions/postActions";
import { ImgPicker } from "../components/ImgPicker";

export function CreateScreen({ navigation }) {
  const [value, setValue] = useState("");

  const imgRef = useRef();

  const dispatch = useDispatch();

  const save = () => {
    if (!imgRef.current) return;

    const post = {
      title: value,
      date: new Date().toJSON(),
      img: imgRef.current,
      booked: false
    };
    imgRef.current = null;
    dispatch(addPost(post));
    navigation.navigate("Main");
  };

  const onPick = uri => {
    imgRef.current = uri;
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrap}>
          <Text style={styles.title}>Create new post:</Text>
          <TextInput
            style={styles.input}
            placeholder="New title"
            value={value}
            onChangeText={setValue}
            multiline
          />
          <ImgPicker onPick={onPick} />
          <Button
            title="Create"
            color={THEME.MAIN_COLOR}
            onPress={save}
            disabled={!value}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Add post",
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
  wrap: { padding: 10 },
  title: {
    textAlign: "center",
    fontFamily: "roboto-regular",
    fontSize: 20,
    marginVertical: 10
  },
  input: {
    // height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    borderColor: THEME.MAIN_COLOR,
    borderStyle: "solid",
    borderWidth: 1
  }
});
