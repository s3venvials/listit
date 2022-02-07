import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, ActivityIndicator, Colors, Text } from "react-native-paper";

import SnackBarAlert from "../../components/UI/SnackBarAlert";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";

const ProductOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError("");
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await dispatch(productActions.fetchProducts());
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, 600);
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('focus', loadProducts);

    return () => {
      willFocusSub;
    }
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    navigation.navigate("Product Details", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          onPress={loadProducts}
          mode="contained"
          color={Colors.blue500}
          style={{ marginTop: 20 }}
        >
          Try again
        </Button>
      </View>
    );
  }

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

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Nothing here.... your the first!</Text>
        <Button
          color={Colors.blue500}
          mode="contained"
          style={{ marginTop: 10 }}
          onPress={() =>
            navigation.navigate("Edit Product", {
              productId: null,
              type: "Add",
            })
          }
        >
          Add Product
        </Button>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            product={itemData.item}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.blue500}
              mode="outlined"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            >
              Details
            </Button>
            <Button
              color={Colors.blue500}
              mode="outlined"
              onPress={() => {
                setVisible(true);
                setMessage(`Added ${itemData.item.title} to the cart!`);
                dispatch(cartActions.addToCart(itemData.item));
              }}
            >
              Add To Cart
            </Button>
          </ProductItem>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverviewScreen;
