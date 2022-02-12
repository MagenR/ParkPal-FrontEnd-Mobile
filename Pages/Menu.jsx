import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Menu({ navigation }) {
    return (
        <View >
            <View style={styles.buttonStyle}>
                <Button styles={styles.BtnStyle}
                    title="Search parking lot"
                    color='#f194ff'
                    onPress={() => navigation.navigate('searchParking')}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button styles={styles.BtnStyle}
                    title="Parking board"
                    color='#f194ff'
                    // onPress={() => navigation.navigate()}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button styles={styles.BtnStyle}
                    title="Parking history"
                    color='#f194ff'
                    // onPress={() => navigation.navigate()}
                />
            </View>
        </View>
    )
}

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
    buttonStyle: {
        marginHorizontal: 20,
        marginTop: 20,

      }

});