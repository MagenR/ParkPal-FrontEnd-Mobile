import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchParamsScreen from '../screens/SearchParamsScreen'
import SearchParkingScreen from '../screens/SearchParkingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import ReserveParkingLotScreen from '../screens/ReserveParkingLotScreen';
import AuctionScreen from '../screens/AuctionScreen';
import AuctionRunLog from '../screens/AuctionRunLog';


const Stack = createNativeStackNavigator(); 

export default function StackNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">   
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />     
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />        
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchParkingScreen" component={SearchParkingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchParamsScreen" component={SearchParamsScreen} options={{ headerShown: true }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReserveParkingLot" component={ReserveParkingLotScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AuctionScreen" component={AuctionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AuctionRunLogScreen" component={AuctionRunLog} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}