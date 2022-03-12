import React, { useState, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Surface, Button, TextInput, Colors } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";

import ImagePicker from "../../components/UI/ImagePicker";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

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

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      images: editedProduct ? editedProduct.images : [],
      desc: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      images: editedProduct ? true : false,
      desc: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = async () => {
    setFormIsSubmitted(true);
    if (!formState.formIsValid) {
      return;
    }

    let message;
    const { title, desc, images, price } = formState.inputValues;

    if (editedProduct) {
      message = `Edited ${formState.inputValues.title} successfully!`;
      try {
        await dispatch(
          productsActions.updateProduct(prodId, title, desc, images)
        );
      } catch (error) {
        alert(error);
        return;
      }
    } else {
      message = `Added ${formState.inputValues.title} successfully!`;
      dispatch(productsActions.createProduct(title, desc, images, +price));
    }
    navigation.navigate("User Products", { message });
  };

  const textChangeHandler = (name, value) => {
    let isValid = true;

    // TODO: Add better validation
    if (value.trim().length > 0) {
      isValid = true;
    }

    dispatchFormState({ type: FORM_UPDATE, value, isValid, input: name });
  };

  const imageChangeHandler = (name, value) => {
    let isValid = true;
    dispatchFormState({ type: FORM_UPDATE, value, isValid, input: name });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={styles.container}
      >
        <Surface style={styles.formControl}>
          <Text style={styles.title}>
            {navParams.type === "Add" ? "Add New Product" : "Edit Product"}
          </Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Title"
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, "title")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
          />
          {!formState.inputValidities.title && formIsSubmitted && (
            <Text style={{ color: "red" }}>Please enter a valid title</Text>
          )}
          <ImagePicker
            onImageAdd={imageChangeHandler.bind(this, "images")}
            loadedImages={formState.inputValues.images}
          />
          {!formState.inputValidities.images && formIsSubmitted && (
            <Text style={{ color: "red" }}>Please add an image</Text>
          )}
          {editedProduct ? null : (
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Price"
              value={formState.inputValues.price}
              onChangeText={textChangeHandler.bind(this, "price")}
              keyboardType="decimal-pad"
            />
          )}
          {!formState.inputValidities.price && formIsSubmitted && (
            <Text style={{ color: "red" }}>Please enter a valid price</Text>
          )}
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Description"
            multiline
            numberOfLines={10}
            value={formState.inputValues.desc}
            onChangeText={textChangeHandler.bind(this, "desc")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
          />
          {!formState.inputValidities.desc && formIsSubmitted && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              Please enter a description
            </Text>
          )}
          <Button
            color={Colors.blue500}
            mode="contained"
            icon="send"
            onPress={submitHandler}
          >
            Submit
          </Button>
        </Surface>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
