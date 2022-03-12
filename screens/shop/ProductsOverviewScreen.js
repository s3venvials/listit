import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, ActivityIndicator, Colors, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SnackBarAlert from "../../components/UI/SnackBarAlert";
import ProductItem from "../../components/shop/ProductItem";
import AppBarBottom from "../../components/UI/AppBarBottom";
import Search from "../../components/UI/Search";
import Categories from "../../components/UI/Categories";

import * as productActions from "../../store/actions/products";
import * as authActions from "../../store/actions/auth";

const ProductOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError("");
    setIsRefreshing(true);
    setTimeout(async () => {
      try {
        const user = await AsyncStorage.getItem("userData");
        const { userId, token, expiresIn } = JSON.parse(user);
        dispatch(authActions.authenticate(userId, token, expiresIn));
        dispatch(productActions.fetchProducts());
      } catch (error) {
        setError(error.message);
      }
      setIsRefreshing(false);
    }, 600);
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("focus", loadProducts);

    return () => {
      willFocusSub;
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
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
        <AppBarBottom />
      </View>
    );
  }

  return (
    <View style={{ height: '100%' }}>
      <Search placeHolder="Search Everything" />
      <Categories />
      <FlatList
        style={styles.fixedList}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 1,
            }}
          >
            <ProductItem
              product={itemData.item}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
          </View>
        )}
      />
      <SnackBarAlert
        visible={visible}
        setVisible={setVisible}
        message={message}
        sx={{ backgroundColor: "green", color: "white" }}
      />
      <AppBarBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  fixedList: {
    marginBottom: 66,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverviewScreen;
