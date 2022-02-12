import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-elements';
import SearchParkingPage from './searchParkingPage';

const SearchParkingStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export default function TabScreen() {
    return (
        <Tab.Navigator
            initialRouteName="searchParkingPage"
            activeColor="#fff"
        >
            <Tab.Screen
                name="searchParkingPage"
                component={SearchParkingScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="search" type='font-awesome-5' color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const SearchParkingScreen = ({ navigation }) => (
    <SearchParkingStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <SearchParkingStack.Screen name="searchParkingPage" component={SearchParkingPage} options={{
            title: 'Overview',
            headerLeft: () => (
                <Icon name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon>
            )
        }} />
    </SearchParkingStack.Navigator>
);