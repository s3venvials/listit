import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

const SnackBarAlert = ({ visible, setVisible, message, sx }) => {

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar
        style={sx}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          icon: "close-circle",
          onPress: () => setVisible(false),
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackBarAlert;