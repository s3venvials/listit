import React, { useState } from "react";
import {
  Image,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Button, Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
  const [images, setImages] = useState([1, 2, 3, 4, 5, 6]);
  const [count, setCount] = useState(0);

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const pickImage = async () => {
    if (count === 6) {
      return;
    }

    const permission = await ImagePicker.getCameraPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    if (!result.cancelled) {
      images.pop();
      const temp = [...images];
      temp.unshift(result.uri);
      setImages(temp);
      setCount(count + 1);
    }
  };

  return ( 
    <View style={styles.root}>
      <Button onPress={pickImage}>Upload Images</Button>
      <FlatList
        horizontal={true}
        data={images}
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <View>
            {typeof item.item === "string" ? (
              <Image source={{ uri: item.item }} style={styles.images} />
            ) : (
              <View>
                <TouchableCmp
                  onPress={pickImage}
                  useForeground
                ><View style={styles.imageBox}></View></TouchableCmp>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageBox: {
    borderWidth: 1,
    backgroundColor: Colors.grey100,
    height: 80,
    width: 80,
    margin: 4,
  },
  images: {
    width: 80,
    height: 80,
    marginHorizontal: 4,
  },
});
