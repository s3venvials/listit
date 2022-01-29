import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Surface, Button, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";

const EditProductScreen = ({ navigation, route }) => {
  const prodId = route.params.productId;
  let editedProduct;

  if (prodId) {
    editedProduct = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id === prodId)
    );
  }

  const navParams =
    navigation.getState().routes[navigation.getState().index].params;

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setimageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState(
    editedProduct ? editedProduct.description : ""
  );
  const dispatch = useDispatch();

  const submitHandler = () => {
    let message;
    if (editedProduct) {
      message = `Edited ${title} successfully!`;
      dispatch(productsActions.updateProduct(prodId, title, desc, imageUrl));
    } else {
      message = `Added ${title} successfully!`;
      dispatch(productsActions.createProduct(title, desc, imageUrl, +price));
    }
    navigation.navigate("User Products", { message });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Surface style={styles.formControl}>
          <Text style={styles.title}>
            {navParams.type === "Add" ? "Add New Product" : "Edit Product"}
          </Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Image URL"
            value={imageUrl}
            onChangeText={(text) => setimageUrl(text)}
          />
          {editedProduct ? null : (
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Price"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          )}
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Description"
            multiline
            numberOfLines={10}
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />
          <Button mode="contained" icon="send" onPress={submitHandler}>
            Submit
          </Button>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  form: {
    margin: 10,
  },
  formControl: {
    width: "100%",
    padding: 10,
    elevation: 6,
    borderRadius: 10,
  },
  input: {
    marginVertical: 10,
  },
});

export default EditProductScreen;
