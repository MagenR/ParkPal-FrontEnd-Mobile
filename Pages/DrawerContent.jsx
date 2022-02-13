import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Title, Caption } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function DrawerContent(props) {

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'column' }}>
                            <Title style={styles.title}>User Name</Title>
                            <Caption style={styles.caption}>User Nickname</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Profile"
                        onPress={() => { props.navigation.navigate('ProfilePage') }}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Search for Parking"
                        onPress={() => { props.navigation.navigate('searchParkingPage') }}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Purchase history"
                        onPress={() => { props.navigation.navigate('searchParkingPage') }}
                    />
                </Drawer.Section>
            </DrawerContentScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    drawerSection: {
        marginTop: 15,
    },
});