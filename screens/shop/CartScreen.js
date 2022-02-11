import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, Surface, Colors } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import SnackBarAlert from "../../components/UI/SnackBarAlert";

import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transFormedCartItems = [];
    for (const key in state.cart.items) {
      transFormedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quanity: state.cart.items[key].quanity,
        sum: state.cart.items[key].sum,
      });
    }
    return transFormedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const orderNowHandler = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
        setVisible(true);
        setMessage("Your order was successfully placed!");
      } catch (error) {
        setIsLoading(false);
        alert(error);
      }
    }, 3000);
  };

  const deleteCartItemHandler = async (id) => {
    await dispatch(cartActions.removeFromCart(id));
    setVisible(true);
    setMessage("Product was removed from your cart!");
  };

  return (
    <View style={styles.screen}>
      <Surface style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.blue500}
          mode="outlined"
          loading={isLoading}
          disabled={cartItems.length === 0 || isLoading}
          onPress={orderNowHandler}
        >
          Order Now
        </Button>
      </Surface>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quanity={itemData.item.quanity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={deleteCartItemHandler.bind(this, itemData.item.productId)}
          />
        )}
      />
      <SnackBarAlert
        visible={visible}
        setVisible={setVisible}
        message={message}
        sx={{ backgroundColor: "green", color: "white" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    elevation: 6,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.yellow700,
  },
});

export default CartScreen;
