import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";

import SnackBarAlert from "../../components/UI/SnackBarAlert";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

const ProductOverviewScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate("Product Details", {
      productId: id,
      productTitle: title,
    });
  };

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
            mode="outlined"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            Details
          </Button>
          <Button
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
     <SnackBarAlert visible={visible} setVisible={setVisible} message={message} sx={{ backgroundColor: 'green', color: 'white' }} />
    </View>
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductOverviewScreen;
