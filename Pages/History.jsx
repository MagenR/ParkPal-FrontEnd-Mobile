import { View, Text, StyleSheet, StatusBar, Platform,FlatList, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import React, { useState, useEffect } from 'react';

const apiUrl= 'api/getPastReservations'

export default function History({ navigation , route}) {

    // const [dataSet, setData] = React.useState({
    //     date:'',
    //     location:'',
    //     entryTime:'',
    //     exitTime:'',
    //     price:'',
    //     purchases:[],
    //     index:0
    // });

    // useEffect(() => {
    //     console.log(dataSet);
    //     if (route.params != undefined) {
    //         var purchase = {
    //             title : route.params.date,
    //             location : route.params.location ,
    //             entryTime: route.params.entryTime,
    //             exitTime: route.params.exitTime,
    //             price: route.params.price,
    //             key : dataSet.index
    //         }
    //         setData( prevData => ({
    //             notes: [...prevData.purchases, purchase],
    //             index: ++prevData.index}))   
    //     }
   
    // }, [route]);
  
    fetch(apiUrl+'/'+user_id, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
        .then(res => {
            console.log('res=', res);
            return res.json();
        })
        .then(
          (result) => {
            console.log("History : ", result);          
          },
          (error) => {
            console.error("GET Error: ", error);
          });
        

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Purchase history</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
            <ScrollView>
            <FlatList
                renderItem={({ result }) => (
                    <View style={styles.row}>
                        <Text>{result.ReservedAt.name}</Text>
                        <Text>{result.ReservedAt.address}</Text>
                        <Text>{result.StartTime}</Text>
                        <Text>{result.EndTime}</Text>
                    </View>)} />
                </ScrollView>
            </Animatable.View>
        </View>

    );

};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    button:
    {
        alignItems: 'center',
        marginTop: 50

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },

});