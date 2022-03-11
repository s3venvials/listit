import React, { useState, useEffect } from "react";
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

export default function ImagePickerExample({ onImageAdd, loadedImages }) {
  const [images, setImages] = useState([1, 2, 3, 4, 5, 6]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (loadedImages && loadedImages.length > 0) {
      const temp = [...images];

      loadedImages.forEach((i) => {
        temp.pop();
        temp.unshift(i);
      });

      setImages(temp);
      setCount(count + loadedImages.length);
    }
  }, []);

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

    if (!result.cancelled) {
      images.pop();
      const temp = [...images];
      temp.unshift(result.uri);
      setImages(temp);
      setCount(count + 1);
      onImageAdd(temp.filter((i) => typeof i === 'string'));
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
