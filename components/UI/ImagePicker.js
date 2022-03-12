import React, { useState, useEffect } from "react";
import { FIREBASE_API } from "@env";
// import { getApps, initializeApp  } from "firebase/app";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

// const firebaseConfig = {
//   apiKey: FIREBASE_API,
//   authDomain: "listit-1358.firebaseapp.com",
//   databaseURL: "https://listit-1358.firebaseapp.com",
//   storageBucket: "listit-1358.appspot.com",
//   messagingSenderId: "592636498896",
// };

// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }

const NUM_ITEMS = 6;
function getColor(i) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index + 1}`,
    label: String(index + 1) + "",
    height: 100,
    width: 100 + Math.random() * 40,
    imageUrl: null,
    backgroundColor,
  };
});

export default function _ImagePicker({ onImageAdd, loadedImages }) {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (loadedImages && loadedImages.length > 0) {
      setData(loadedImages);
    }
  }, []);

  const pickImage = async (imgObj) => {
    if (count === 6) {
      return;
    }

    const permission = await ImagePicker.getCameraPermissionsAsync();

    if (!permission.granted) {
      const status = await ImagePicker.requestCameraPermissionsAsync();
      if (!status.granted) {
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const temp = [...data];
      const index = temp.indexOf(imgObj);

      imgObj.imageUrl = result.uri;
      temp[index] = imgObj;

      setData(temp);
      setCount(count + 1);

      onImageAdd(temp);
    }
  };

  // const uploadImageAsync = async (uri) => {
  //   // Why are we using XMLHttpRequest? See:
  //   // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });

  //   const fileRef = ref(getStorage(), uuid.v4());
  //   const result = await uploadBytes(fileRef, blob);

  //   // We're done with the blob, close and release it
  //   blob.close();

  //   return await getDownloadURL(fileRef);
  // }

  const onDragEndHandler = (data) => {
    const temp = [];
    data.forEach((i, index) => {
      i.label = String(index + 1);
      temp.push(i);
    });
    setData(temp);
    onImageAdd(temp);
  };

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPress={() => pickImage(item)}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : item.backgroundColor },
          ]}
        >
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.images} />
          ) : (
            <Text style={styles.text}>{item.label}</Text>
          )}
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View>
      <Text style={{ fontStyle: 'open-sans-bold', fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Upload Images</Text>
      <DraggableFlatList
        horizontal={true}
        data={data}
        onDragEnd={({ data }) => onDragEndHandler(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
      <Text style={{ fontStyle: 'open-sans-bold', fontSize: 16, marginVertical: 10 }} >Tap a box to start adding images!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  images: {
    width: 100,
    height: 100,
    marginHorizontal: 4,
  },
});
