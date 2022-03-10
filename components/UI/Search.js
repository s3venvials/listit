import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Search = ({ placeHolder }) => {
    return (
        <View style={styles.root}>
            <TextInput mode="outlined" style={styles.input} placeholder={placeHolder} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 7.5,
    }
});

export default Search;