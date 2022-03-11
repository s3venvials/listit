import React, { useState, useRef } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button, Colors } from "react-native-paper";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

import SnackBarAlert from "../../components/UI/SnackBarAlert";
import AppBarBottom from "../../components/UI/AppBarBottom";

const ProductDetailScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();
  const carouselRef = useRef(null);

  const CustomPaging = ({ data, activeSlide }) => {
    const settings = {
      dotsLength: data.length,
      activeDotIndex: activeSlide,
      containerStyle: styles.dotContainer,
      dotStyle: styles.dotStyle,
      inactiveDotStyle: styles.inactiveDotStyle,
      inactiveDotOpacity: 0.4,
      inactiveDotScale: 0.6,
    };

    return <Pagination {...settings} />;
  };

  const RenderItem = ({ item, index }) => {
    return (
      <View>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      <ScrollView style={{ marginBottom: 66 }}>
        <Carousel
          ref={carouselRef}
          data={selectedProduct.images}
          renderItem={RenderItem}
          sliderWidth={400}
          itemWidth={400}
          onSnapToItem={(index) => setSlideIndex(index)}
        />
        <CustomPaging data={selectedProduct.images} activeSlide={slideIndex} />
        <View style={styles.actions}>
          <Button
            mode="outlined"
            color={Colors.blue500}
            onPress={() => {
              setVisible(true);
              setMessage(`Added ${selectedProduct.title} to the cart!`);
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          >
            Add to Cart
          </Button>
          <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
      </ScrollView>
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

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  dotContainer: {
    backgroundColor: Colors.blue500,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  inactiveDotStyle: {
    backgroundColor: Colors.black,
  },
});

export default ProductDetailScreen;
