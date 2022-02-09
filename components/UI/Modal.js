import * as React from "react";
import { View } from "react-native";
import { Button, Paragraph, Dialog, Portal, Colors } from "react-native-paper";

const MyComponent = ({ visible, setVisible, onConfirm, title, content }) => {
  const hideDialog = () => setVisible(false);
  const confirmDelete = () => {
    onConfirm(true);
    hideDialog();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{content}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={Colors.blue500} onPress={hideDialog}>Cancel</Button>
            <Button color={Colors.blue500} onPress={confirmDelete}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MyComponent;
