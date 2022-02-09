import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, Colors } from "react-native-paper";

import OrderItem from "../../components/shop/OrderItem";

import * as ordersActions from "../../store/actions/order";

const OrderScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersActions.fetchOrders())
    .then(() => {
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          animating={true}
          color={Colors.blue500}
          size="large"
        />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderScreen;
