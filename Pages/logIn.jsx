import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableHighlight, Button } from 'react-native';


export default function logIn({ navigation }) {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='Email/Username'

            />
            <TextInput
                style={styles.textInput}
                placeholder='Password'

            />
              <Button styles={styles.BtnStyle}
                    title="Login"
                    color='#f194ff'
                    onPress={() => navigation.navigate('Menu')}
                />
        </View>
    );

};

const styles = StyleSheet.create({
    BtnStyle:
    {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
        marginVertical: 10,

    },
    textInput: {
        height: 40,
        width: 350,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});