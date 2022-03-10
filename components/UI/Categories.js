import * as React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Avatar } from "react-native-paper";

const cats = [
    {
        id: 0,
        icon: 'folder',
        label: "Mens",
    },
    {
        id: 1,
        icon: 'folder',
        label: "Womens",
    },
    {
        id: 2,
        icon: 'folder',
        label: "Kids",
    },
    {
        id: 3,
        icon: 'folder',
        label: "Gaming",
    },
    {
        id: 4,
        icon: 'folder',
        label: "Automotive",
    },
    {
        id: 5,
        icon: 'folder',
        label: "Fashion",
    },
    {
        id: 6,
        icon: 'folder',
        label: "Hand Bags",
    },
    {
        id: 7,
        icon: 'folder',
        label: "Toys",
    },
    {
        id: 8,
        icon: 'folder',
        label: "Tools",
    },
    {
        id: 9,
        icon: 'folder',
        label: "Kitchen",
    },
];

const Categories = () => {
  return (
    <View style={styles.root}>
        <FlatList
            horizontal={true}
          data={cats}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
              <View>
            <Avatar.Icon style={styles.avatar} size={46} icon={item.item.icon} />
            <Text style={styles.label}>{item.item.label}</Text>
            </View>
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 2,
  },
  avatar: {
    margin: 8,
  },
  label: {
      textAlign: "center",
  },
});

export default Categories;
