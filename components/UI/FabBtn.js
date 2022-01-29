import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

const FabBtn = ({ onAdd }) => {
  return (
    <FAB
      style={styles.fab}
      large
      icon="plus"
      color={Colors.primary}
      onPress={onAdd}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FabBtn;
