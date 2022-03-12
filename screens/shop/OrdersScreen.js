import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, Colors, Text } from "react-native-paper";

import OrderItem from "../../components/shop/OrderItem";
import AppBarBottom from "../../components/UI/AppBarBottom";

import * as ordersActions from "../../store/actions/order";

const OrderScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersActions.fetchOrders())
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
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

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Nothing here, go find some cool stuff!</Text>
        <AppBarBottom />
      </View>
    );
  }

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        style={{ marginBottom: 80 }}
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
      <AppBarBottom />
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

export default OrderScreen;
