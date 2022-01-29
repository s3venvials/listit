import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const AppBarBottom = () => (
 <Appbar style={styles.bottom}>
     <View style={styles.btnsContainer}>
   <Appbar.Action
     icon="archive"
     onPress={() => console.log('Pressed archive')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
    </View>
  </Appbar>
 );

export default AppBarBottom

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  btnsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});