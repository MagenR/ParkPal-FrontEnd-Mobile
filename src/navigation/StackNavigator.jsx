import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import DrawerNavigation from './DrawerNavigator';

import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/SignupScreen';
import LogIn from '../screens/LoginScreen';
import SearchParamsScreen from '../screens/SearchParamsScreen'
import SearchParkingScreen from '../screens/SearchParkingScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import ProfileEditScreen from '../screens/ProfileEditScreen';
// import PaymentScreen from './screens/PaymentScreen';
// import Auction from './screens/Auction';

const Stack = createNativeStackNavigator(); 

export default function StackNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DrawerNavigation">   
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />     
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />        
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} /> */}
        <Stack.Screen name="SearchParkingScreen" component={SearchParkingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchParamsScreen" component={SearchParamsScreen} options={{ headerShown: true }} />
        {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  )

}