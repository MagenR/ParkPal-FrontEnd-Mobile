import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import DrawerNavigation from './src/navigation/DrawerNavigator';
// import HomeScreen from './src/screens/HomeScreen';
// import SignUp from './src/screens/SignupScreen';
// import LogIn from './src/screens/LoginScreen';
 import SearchParkingScreen from './src/screens/SearchParkingScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import EditProfileScreen from './src/screens/ProfileEditScreen';
// import PaymentScreen from './src/screens/PaymentScreen';

//import Auction from './Screens/Auction';

//const Stack = createNativeStackNavigator(); 

export default function App() {
  return (   
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="DrawerNavigation">
    //     <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
    //     <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
    //     <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }}/>
    //     <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }}/>
    //     <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }}/>
    //     <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
    //     <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }}/>
    //     <Stack.Screen name="SearchParkingScreen" component={SearchParkingScreen} options={{ headerShown: false }}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    //<SearchParkingScreen />
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchParkingScreen />
    </GestureHandlerRootView>
    
  );
}
