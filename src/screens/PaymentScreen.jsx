import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Input, Icon, Button } from '@rneui/base';
import * as Animatable from 'react-native-animatable';

export default function PaymentScreen({ navigation, route }) {
  const { pName, pAdress } = route.params
  const [payment, setPayment] = useState({ cardNumber: '', expiration: '', cvv: '', id: '' })

  const updatePayment = (key, value) => {
    setPayment(oldState => ({
      ...oldState,
      [key]: value,
    }));
  }

  return (
    <View style={paymentStyles.container}>
      <View style={paymentStyles.textContainer}>
        <Text style={paymentStyles.text}>Location: {pAdress}</Text>
        <Text style={paymentStyles.text}>Date:</Text>
        <Text style={paymentStyles.text}>Entry Time:</Text>
        <Text style={paymentStyles.text}>Exit Time:</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[paymentStyles.footer]}
      >
        <Input
          label='Card Number'
          placeholder='****  ****  ****  ****'
          placeholderTextColor='#cdd0d2'
          rightIcon={
            <Icon
              name='cc-visa'
              type='font-awesome-5'
              size={24}
              color='black'
            />
          }
          onChangeText={e => updatePayment('cardNumber', e)}
        />
        <Input
          label='Expiration'
          placeholder='00/00'
          placeholderTextColor='#cdd0d2'
          onChangeText={e => updatePayment('expiration', e)}
        />
        <Input
          label='CVV'
          placeholder='***'
          placeholderTextColor='#cdd0d2'
          onChangeText={e => updatePayment('cvv', e)}
        />
        <Input
          label='ID'
          placeholder="*********"
          placeholderTextColor='#cdd0d2'
          onChangeText={e => updatePayment('id', e)}
        />
        <TouchableHighlight>
          <Button
            title="Purchase"
            buttonStyle={{
              backgroundColor: '#009387',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
          />
        </TouchableHighlight>
      </Animatable.View>
    </View>
  );
};

const paymentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  footer: {
    flex: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  text: {
    backgroundColor: "#009387",
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    padding: 15

  },
  textContainer: {
    flex: 2,
    paddingVertical: 80,
    paddingHorizontal: 30,
  },
});