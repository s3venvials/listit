import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Surface } from "react-native-paper";
import CartItem from "./CartItem";

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View>
      <Surface style={styles.orderItem}>
        <View style={styles.summary}>
          <Text style={styles.totalAmount}>Total: ${amount.toFixed()}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Button
          mode="text"
          onPress={() => setShowDetails((prevState) => !prevState)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        {showDetails && (
          <View style={styles.detailItems}>
            {items.map((cartItem) => (
              <CartItem
                key={cartItem.productId}
                quanity={cartItem.quanity}
                amount={cartItem.sum}
                title={cartItem.productTitle}
              />
            ))}
          </View>
        )}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    paddingBottom: 6,
    elevation: 6,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: '100%',
  }
});

export default OrderItem;
