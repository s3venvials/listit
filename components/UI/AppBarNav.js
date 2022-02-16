import React, { useState, useEffect, useRef } from "react";
import { Appbar, Menu, Colors } from "react-native-paper";
import { View, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const AppBarHeader = ({ navigation, back }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _goBack = () => navigation.goBack();
  const _goToCart = () => navigation.navigate("Cart");
  const navName =
    navigation.getState().routes[navigation.getState().index].name;
  const user = useRef();

  useEffect(() => {
    const getUser = async () => {
      user.current = await AsyncStorage.getItem("userData");
    };
    getUser();
  }, []);

  return (
    <View>
      {navName !== "Auth Login" && (
        <Appbar.Header>
          {navName !== "All Products" && user.current && (
            <Appbar.BackAction onPress={_goBack} />
          )}
          <Appbar.Content title="List It" subtitle={navName} />
          {user.current && <Appbar.Action icon="cart" onPress={_goToCart} />}
          {user.current && (
            <Menu
              style={{
                paddingTop: 40,
                flexDirection: "row",
                justifyContent: "center",
              }}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action
                  icon={MORE_ICON}
                  color="white"
                  onPress={openMenu}
                />
              }
            >
              <Menu.Item
                icon="shopping"
                onPress={() => {
                  navigation.navigate("All Products");
                  closeMenu();
                }}
                title="Home"
              />
              <Menu.Item
                icon="history"
                onPress={() => {
                  navigation.navigate("Orders");
                  closeMenu();
                }}
                title="Orders"
              />
              <Menu.Item
                icon="playlist-edit"
                onPress={() => {
                  navigation.navigate("User Products");
                  closeMenu();
                }}
                title="User Products"
              />
            </Menu>
          )}
        </Appbar.Header>
      )}
    </View>
  );
};

export default AppBarHeader;
