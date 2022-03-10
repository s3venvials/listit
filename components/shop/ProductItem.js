import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from "react-native";
import { Card, Title, Paragraph, Surface } from "react-native-paper";

const ProductItem = ({ product, onSelect, children }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View>
      <TouchableCmp onPress={onSelect} useForeground>
        <Surface style={styles.surface}>
          <Card.Cover source={{ uri: product.imageUrl }} />
          <Card.Content style={styles.content}>
            <Title style={styles.title}>{product.title}</Title>
            <Paragraph style={styles.price}>
              ${product.price.toFixed(2)}
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            {children}
          </Card.Actions>
        </Surface>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    // paddingBottom: 6,
    elevation: 6,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  content: {
    alignItems: "center",
    // padding: 1,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    // marginVertical: 2,
    alignContent: "center",
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default ProductItem;
