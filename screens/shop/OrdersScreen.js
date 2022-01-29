import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, Surface } from "react-native-paper";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

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

const styles = StyleSheet.create({});

export default OrderScreen;
