import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authActions from "../../store/actions/auth";

const AppBarBottom = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const u = await AsyncStorage.getItem("userData");
      setUser(u);
    };
    getUser();
  }, []);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigation.navigate("Auth Login");
  }

  if (!user) {
    return <View></View>;
  }

  return (
    <Appbar style={styles.bottom}>
      <View style={styles.actions}>
        <Appbar.Action
          icon="home"
          onPress={() => navigation.navigate("All Products")}
        />
      </View>
      <View style={styles.actions}>
        <Appbar.Action
          icon="account"
          onPress={() => console.log("Pressed account")}
        />
      </View>
      <View style={styles.actions}>
        <Appbar.Action
          icon="heart"
          onPress={() => console.log("Pressed heart")}
        />
      </View>
      <View style={styles.actions}>
        <Appbar.Action
          icon="logout"
          onPress={logoutHandler}
        />
      </View>
    </Appbar>
  );
};

export default AppBarBottom;

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "6%",
  },
});
