import React from "react";
import { Surface } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ onRemove, quanity, title, amount }) => {
  return (
    <Surface style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quanity}>{quanity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.deleteBtn}>
          <Ionicons
            name={Platform.OS === "anroid" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quanity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    amount: {

    },
    deleteBtn: {
        marginLeft: 20,
    },
});

export default CartItem;
