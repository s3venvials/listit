import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { List, IconButton } from "react-native-paper";

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

const CategoryList = ({ onPickedCategory, onBackArrow }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
          <IconButton icon="arrow-left" size={32} onPress={onBackArrow} />
        <Text style={styles.title}>Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={(itemData) => (
            <List.Item
              onPress={() => onPickedCategory(itemData.item)}
              title={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "110%",
    marginBottom: 20,
  },
  innerContainer: {
    margin: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default CategoryList;
