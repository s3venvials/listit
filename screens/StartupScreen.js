import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Colors, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          navigation.navigate("Auth Login");
          return;
        }

        const parsedData = JSON.parse(userData);
        const { token, userId, expireDate } = parsedData;
        const expirationDate = new Date(expireDate);

        if (expirationDate <= new Date() || !token || !userId) {
          await AsyncStorage.removeItem("userData");
          navigation.navigate("Auth Login");
          return;
        }

        navigation.navigate("All Products");
        dispatch(authActions.authenticate(userId, token));
      } catch (error) {
        alert(error);
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.blue500} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
