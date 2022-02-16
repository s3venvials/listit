import React, { useState } from "react";
import { Button, Colors } from "react-native-paper";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart';

import SnackBarAlert from "../../components/UI/SnackBarAlert";
import AppBarBottom from "../../components/UI/AppBarBottom";

const ProductDetailScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
          <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
          <View style={styles.actions}>
          <Button mode="outlined" color={Colors.blue500} onPress={() => {
            setVisible(true);
            setMessage(`Added ${selectedProduct.title} to the cart!`);
            dispatch(cartActions.addToCart(selectedProduct));
          }}>Add to Cart</Button>
          </View>
          <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
      <SnackBarAlert visible={visible} setVisible={setVisible} message={message} sx={{ backgroundColor: 'green', color: 'white' }} />
      <AppBarBottom />
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export default ProductDetailScreen;
