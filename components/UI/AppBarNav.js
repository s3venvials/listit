import * as React from "react";
import { Appbar, Menu } from "react-native-paper";

const AppBarHeader = ({ navigation, back }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _goBack = () => navigation.goBack();
  const _goToCart = () => navigation.navigate("Cart");

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title="List It" />
      <Appbar.Action icon="cart" onPress={_goToCart} />
      <Menu
        style={{ paddingTop: 40, flexDirection: 'row', justifyContent: 'center' }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
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
            navigation.navigate("Order");
            closeMenu();
          }}
          title="Orders"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default AppBarHeader;
