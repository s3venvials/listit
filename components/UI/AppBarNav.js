import * as React from "react";
import { Appbar, Menu } from "react-native-paper";
import { View, Platform } from "react-native";

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppBarHeader = ({ navigation, back }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _goBack = () => navigation.goBack();
  const _goToCart = () => navigation.navigate("Cart");
  const navName =
    navigation.getState().routes[navigation.getState().index].name;

  return (
    <View>
      <Appbar.Header>
        {back && <Appbar.BackAction onPress={_goBack} />}
        <Appbar.Content title="List It" subtitle={navName} />
        <Appbar.Action icon="cart" onPress={_goToCart} />
        <Menu
          style={{
            paddingTop: 40,
            flexDirection: "row",
            justifyContent: "center",
          }}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon={MORE_ICON} color="white" onPress={openMenu} />
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
      </Appbar.Header>
    </View>
  );
};

export default AppBarHeader;
