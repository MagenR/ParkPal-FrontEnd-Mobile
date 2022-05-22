import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import { Icon } from '@rneui/base';

export default function ProfileScreen({ route, navigation }) {
  const { Id, UserName, Email, FirstName, LastName } = route.params;
  console.log("user: =======================" + Id + " " + UserName);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableRipple style={{ marginLeft: 15, marginTop: 10 }}
          onPress={() => navigation.openDrawer()}>
          <Icon type='font-awesome-5' name="bars" color="#777777" size={20} />
        </TouchableRipple>
        <TouchableRipple style={{ marginLeft: 300, marginTop: 10 }} onPress={() => navigation.navigate('EditProfilePage', { Id: Id, UserName: UserName, Email: Email, FirstName: FirstName, LastName: LastName })}>
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
          }]}>{FirstName} {LastName}</Title>
          <Caption style={styles.caption}>@{UserName}</Caption>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon type='font-awesome-5' name="envelope" color="#777777" size={24} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{Email}</Text>
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
      {/* <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => navigation.navigate('History', Id)}>
                    <View style={styles.menuItem}>
                        <Icon type='font-awesome-5' name="history" color="black" size={25} />
                        <Text style={styles.menuItemText}>Purchase History</Text>
                    </View>
                </TouchableRipple>
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
    marginBottom: 10,
    marginTop: 10
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