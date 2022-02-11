import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Colors, Text } from "react-native-paper";
import * as productsActions from "../../store/actions/products";

import ProductItem from "../../components/shop/ProductItem";
import FabBtn from "../../components/UI/FabBtn";
import SnackBarAlert from "../../components/UI/SnackBarAlert";
import Modal from "../../components/UI/Modal";

const UserProductScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    if (route.params) {
      setMessage(route.params.message);
      setVisible(true);
    }
  }, [route.params]);

  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id, type) =>
    navigation.navigate("Edit Product", { productId: id, type });

  const deleteProductHandler = (id) => {
    setVisible(true);
    setMessage("Product deleted successfully!");
    dispatch(productsActions.deleteProduct(id));
  };

  return (
    <>
      <View>
        <FlatList
          data={userProducts}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ProductItem
              key={itemData.item.id}
              product={itemData.item}
              onSelect={() => editProductHandler(itemData.item.id)}
            >
              <Button
                color={Colors.blue500}
                mode="outlined"
                onPress={() => editProductHandler(itemData.item.id, "Edit")}
              >
                Edit
              </Button>
              <Button
                color={Colors.blue500}
                mode="outlined"
                onPress={() => {
                  setShowModal(true);
                  setProductId(itemData.item.id);
                  setModalTitle("Confirm Delete");
                  setModalContent(
                    `Are you sure you want to delete the product ${itemData.item.title}?`
                  );
                }}
              >
                Delete
              </Button>
            </ProductItem>
          )}
        />
        <FabBtn
          onAdd={() => editProductHandler(null, "Add")}
          sx={{ marginTop: userProducts.length > 0 ? 0 : "20%" }}
        />
        <SnackBarAlert
          visible={visible}
          setVisible={setVisible}
          message={message}
          sx={{ backgroundColor: "green", color: "white" }}
        />
        <Modal
          visible={showModal}
          setVisible={setShowModal}
          onConfirm={() => deleteProductHandler(productId)}
          title={modalTitle}
          content={modalContent}
        />
      </View>
      <View style={styles.centered}>
        {userProducts.length === 0 && (
          <Text>Nothing here, select the plus icon to get started!</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductScreen;
