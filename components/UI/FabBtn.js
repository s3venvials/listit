import * as React from "react";
import { StyleSheet, View } from "react-native";
import { FAB, Colors } from "react-native-paper";

const FabBtn = ({ onAdd, sx }) => {
  return (
    <View style={sx}>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        color={Colors.white}
        onPress={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.green500,
  },
});

export default FabBtn;
