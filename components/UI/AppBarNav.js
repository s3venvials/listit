import React, { useState, useEffect, useRef } from "react";
import { Appbar, Menu, Badge, Colors } from "react-native-paper";
import { View, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

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

  const cartItemsCount = useSelector((state) => {
    let count = 0;
    for (const key in state.cart.items) {
      count += state.cart.items[key].quanity;
    }
    return count;
  });

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
          {user.current && (
            <View>
              <Badge
                visible={cartItemsCount > 0}
                size={20}
                style={{
                  position: "absolute",
                  top: 3,
                  right: 3,
                  backgroundColor: Colors.blue500,
                }}
              >
                {cartItemsCount}
              </Badge>
              <Appbar.Action icon="cart" onPress={_goToCart} />
            </View>
          )}
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
