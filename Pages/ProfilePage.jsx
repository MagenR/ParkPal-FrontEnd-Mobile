import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import { Icon } from 'react-native-elements';

export default function ProfilePage({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableRipple style={{marginLeft: 15, marginTop:10}}
                    onPress={() => navigation.openDrawer()}>
                    <Icon type='font-awesome-5' name="bars" color="#777777" size={20} />
                </TouchableRipple>
                <TouchableRipple style={{marginLeft: 300, marginTop:10}} onPress={() => navigation.navigate('EditProfilePage')}>
                    <Icon type='font-awesome-5' name="user-edit" color="#777777" size={20} />
                </TouchableRipple>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                <Avatar.Image style={{ backgroundColor: '#009387' }}
                    source={{
                        uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                    }}
                    size={80}
                />
                <View style={{ marginLeft: 20 }}>
                    <Title style={[styles.title, {
                        marginTop: 15,
                        marginBottom: 5,
                    }]}>John Doe</Title>
                    <Caption style={styles.caption}>@j_doe</Caption>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon type='font-awesome-5' name="map-marker" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Kolkata, India</Text>
                </View>
                <View style={styles.row}>
                    <Icon type='font-awesome-5' name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+91-900000009</Text>
                </View>
                <View style={styles.row}>
                    <Icon type='font-awesome-5' name="envelope" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>john_doe@email.com</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>140.50 <Icon type='font-awesome-5' name="shekel-sign" color="black" size={15} /></Title>
                    <Caption>Payments</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Reservation</Caption>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => navigation.navigate('SearchParkingPage')}>
                    <View style={styles.menuItem}>
                        <Icon type='font-awesome-5' name="search-location" color="black" size={25} />
                        <Text style={styles.menuItemText}>Search Parking</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        paddingVertical: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});