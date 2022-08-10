import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
// import { Icon } from '@rneui/base';

const apiUrl = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/'

export default function ProfileScreen({ route, navigation }) {
    const { Id, UserName, Email, FirstName, LastName } = route.params;
    const [pastReserves, setPastReserves] = useState([]);
    const [futureReserves, setfutureReserves] = useState([]);
    console.log("user: =======================" + Id + " " + UserName);

    // ============================ hooks

    useEffect(() => {

        getFutureReservedSpots();
    }, []);

    const getFutureReservedSpots = () => {
        fetch(`${apiUrl}parkingarrangements/getFutureReservations?user_id=${Id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => { return res.json() })
            .then(res => {
                setfutureReserves(res === 'Reservation DB is empty for this user.\n' ? [] : res);
                console.log(res)
            })
    }

    // ============================ JSX

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={{ flexDirection: 'row' }}>
                <TouchableRipple style={{marginLeft: 15, marginTop:10}}
                    onPress={() => navigation.openDrawer()}>
                    <Icon type='font-awesome-5' name="bars" color="#777777" size={20} />
                </TouchableRipple>
                <TouchableRipple style={{marginLeft: 300, marginTop:10}} onPress={() => navigation.navigate('EditProfilePage', {Id: Id, UserName: UserName, Email: Email, FirstName: FirstName, LastName: LastName})}>
                    <Icon type='font-awesome-5' name="user-edit" color="#777777" size={20} />
                </TouchableRipple>
            </View> */}
            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                <Avatar.Image style={{ backgroundColor: '#009387' }}
                    source={{ uri: 'https://api.adorable.io/avatars/80/abott@adorable.png', }}
                    size={80}
                />
                <View style={{ marginLeft: 20 }}>
                    <Title style={[styles.title, {
                        marginTop: 15,
                        marginBottom: 5,
                    }]}>{FirstName} {LastName}</Title>
                    <Caption style={styles.caption}>@{UserName}</Caption>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    {/* <Icon type='font-awesome-5' name="envelope" color="#777777" size={24} /> */}
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{Email}</Text>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => navigation.navigate('SearchParkingScreen')}>
                    <View style={styles.menuItem}>
                        {/* <Icon type='font-awesome-5' name="search-location" color="black" size={25} /> */}
                        <Text style={styles.menuItemText}>Search Parking</Text>
                    </View>
                </TouchableRipple>
            </View>

            <View style={styles.menuWrapper}>
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Future reserves</Text>
                </View>
            </View>
            {
                futureReserves.length > 0 && futureReserves.map((reservation, index) => (
                    <View >
                        <Text style={styles.ItemText}>{reservation.ParentSpot.ParentLot.Name}, Spot: {reservation.ParentSpot.Number}</Text>
                        <Text style={styles.ItemText}>From: {reservation.StartTime}</Text> 
                        <Text style={styles.ItemText}>To: {reservation.EndTime}</Text>
                    </View>
                ))}


            {/* <View style={styles.menuWrapper}>
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Past reserves</Text>


                </View>
            </View> */}

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
        marginBottom: 5,
        marginTop: 5
    },
    menuWrapper: {
        marginTop: 5,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    ItemText : {
        marginLeft: 20,
        fontSize: 16,
        lineHeight: 26,
    }
});