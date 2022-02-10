import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableHighlight, Button } from 'react-native';


export default function SignUp({ navigation }) {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='Username'

            />
            <TextInput
                style={styles.textInput}
                placeholder='First name'

            />
              <TextInput
                style=
                {styles.textInput}
                placeholder='Last name'

            />
              <TextInput
                style={styles.textInput}
                placeholder='Email'

            />
              <TextInput
                style={styles.textInput}
                placeholder='Password'

            />
              <Button styles={styles.BtnStyle}
                    title="Sign up"
                    color='#f194ff'
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