import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native"
import  ChooseDateTime  from "../ClassComponents/ChooseDateTime";
import  ShowMap  from "../ClassComponents/ShowMap";
import { Button } from 'react-native-elements';

export default function SearchParkingPage({navigation}) {
  return (
    <View style={SearchParkingStyles.container}>
      <View style={SearchParkingStyles.header}>
        <ShowMap />
      </View>
      <View style={SearchParkingStyles.footer}>
        <Text style={SearchParkingStyles.text_header}>Choose a date and a time</Text>
        <ChooseDateTime />
        <TouchableHighlight>
          <Button
            title="Reserve a parking"
            onPress={()=> navigation.navigate('PaymentPage')}
            buttonStyle={{
              backgroundColor: '#009387',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
              margin: 20
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  )
}

const SearchParkingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
  },
  footer: {
    flex: 0,
    paddingTop: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  text_header: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1
  },
});