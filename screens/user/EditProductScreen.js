import React, { useState, useReducer } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Surface, Button, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";

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
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      desc: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      desc: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = () => {
    setFormIsSubmitted(true);
    if (!formState.formIsValid) {
      return;
    }

    let message;
    const { title, desc, imageUrl, price } = formState.inputValues;

    if (formState.formIsValid) {
      message = `Edited ${formState.inputValues.title} successfully!`;
      dispatch(productsActions.updateProduct(prodId, title, desc, imageUrl));
    } else {
      message = `Added ${formState.inputValues.title} successfully!`;
      dispatch(productsActions.createProduct(title, desc, imageUrl, +price));
    }
    navigation.navigate("User Products", { message });
  };

  const textChangeHandler = (name, value) => {
    let isValid = false;

    if (value.trim().length > 0) {
      isValid = true;
    }

    dispatchFormState({ type: FORM_UPDATE, value, isValid, input: name });
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
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, "title")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
          />
          {!formState.inputValidities.title && formIsSubmitted && (
            <Text style={{ color: "red" }}>Please enter a valid title</Text>
          )}
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Image URL"
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
          />
          {!formState.inputValidities.imageUrl && formIsSubmitted && (
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
            <Text style={{ color: "red", marginBottom: 10 }}>Please enter a description</Text>
          )}
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
