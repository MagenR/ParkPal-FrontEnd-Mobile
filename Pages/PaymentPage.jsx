import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

export default function PaymentPage({ navigation, route }) {
    const [payment, setPayment] = useState({ cardNumber: '', expiration: '', cvv: '', id: '' })

    const updatePayment = (key, value) => {
        setPayment(oldState => ({
            ...oldState,
            [key]: value,
        }));
    }

    return (
        <View style={paymentStyles.container}>
            <View style={paymentStyles.header}>
            </View>
            <View style={paymentStyles.footer}>
                <Input
                    label='Card Number'
                    placeholder='****  ****  ****  ****'
                    placeholderTextColor= '#cdd0d2'
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
                    placeholderTextColor= '#cdd0d2'
                    onChangeText={e => updatePayment('expiration', e)}
                />
                <Input
                    label='CVV'
                    placeholder='***'
                    placeholderTextColor= '#cdd0d2'
                    onChangeText={e => updatePayment('cvv', e)}
                />
                <Input
                    label='ID'
                    placeholder="*********"
                    placeholderTextColor= '#cdd0d2'
                    onChangeText={e => updatePayment('id', e)}
                />
                <TouchableHighlight>
                <Button
                    title="Purchase"
                    buttonStyle={{
                        backgroundColor: '#2089dc',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                    }}
                />
                </TouchableHighlight>
            </View>
        </View>
    );
};

const paymentStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 50,
        paddingHorizontal: 10,
        flex: 1
    },
    header: {
        flex: 2,
    },
    footer: {
        flex: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        backgroundColor: '#fff'
    }
});