import React, { useState, useReducer } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Surface, Text, TextInput, Button, Colors } from "react-native-paper";
import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

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

const AuthScreen = ({ navigation }) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const signupHandler = () => {
    setFormIsSubmitted(true);

    if (!formState.formIsValid) {
      return;
    }

    dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

  const loginHandler = async () => {
    setFormIsSubmitted(true);

    if (!formState.formIsValid) {
      return;
    }

    await dispatch(
      authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );

    navigation.navigate("All Products");
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const textChangeHandler = (name, value) => {
    let isValid = false;

    if (value.trim().length > 0) {
      isValid = true;
    }

    dispatchFormState({ type: FORM_UPDATE, value, isValid, input: name });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Surface style={styles.surface}>
        <ScrollView>
          <TextInput
            mode="outlined"
            id="email"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={textChangeHandler.bind(this, "email")}
            value={formState.inputValues.email}
          />
          {!formState.inputValidities.email && formIsSubmitted && (
            <Text style={{ color: "red" }}>Please enter a valid email</Text>
          )}
          <TextInput
            mode="outlined"
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={textChangeHandler.bind(this, "password")}
            value={formState.inputValues.password}
          />
          {!formState.inputValidities.password && formIsSubmitted && (
            <Text style={{ color: "red" }}>Please enter a valid password</Text>
          )}
          <View style={styles.btnGroup}>
            <Button mode="contained" color={Colors.blue500} onPress={loginHandler}>
              Login
            </Button>
          </View>
          <View style={styles.btnGroup}>
            <Button mode="contained" color={Colors.cyan500} onPress={signupHandler}>
              Sign Up
            </Button>
          </View>
        </ScrollView>
      </Surface>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 6,
  },
  surface: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    elevation: 6,
  },
  btnGroup: {
    marginTop: 10,
  },
});

export default AuthScreen;
