import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, FlatList } from "react-native";
import { List } from "react-native-paper";

const categories = [
  "Women",
  "Men",
  "Electronics",
  "Toys & Collectibles",
  "Home",
  "Beauty",
  "Kids",
  "Sports & Outdoors",
  "Handmade",
  "Pet Supplies",
  "Garden & Outdoor",
  "Office",
  "Other",
];

const CategoryScreen = () => {
  const navigation = useNavigation();
  const goBack = (category) => {
      navigation.
    navigation.navigate("Edit Product", { category });
  };
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={(itemData) => (
          <List.Item
            onPress={() => goBack(itemData.item)}
            title={itemData.item}
          />
        )}
      />
    </View>
  );
};

export default CategoryScreen;
