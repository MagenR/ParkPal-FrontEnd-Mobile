import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainStackNavigator } from '../navigation/StackNavigator';
 
// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchParkingScreen from '../screens/SearchParkingScreen';

//Screen names
const Search = "Search";
const ProfileName = "Profile";
const HomeName = 'Home';

const Tab = createBottomTabNavigator();


function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={HomeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === Search) {
              iconName = focused ? 'search' : 'map-search-outline';
            } else if (rn === ProfileName) {
              iconName = focused ? 'info' : 'info';

            }  else if (rn === HomeName) {
                iconName = focused ? 'home' : 'home';
  
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70},
        }}>

        <Tab.Screen name={HomeName} component={MainStackNavigator} options={{ headerShown: false, tabBarStyle: { display: 'flex' } }} />
        <Tab.Screen name={Search} component={SearchParkingScreen} options={{ headerShown: false, tabBarStyle: { display: 'flex' } }}/>
        <Tab.Screen name={ProfileName} component={ProfileScreen} options={{tabBarStyle: { display: 'none' }}}/>
       

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;