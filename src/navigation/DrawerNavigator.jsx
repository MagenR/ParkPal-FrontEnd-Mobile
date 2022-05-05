import HomeScreen from '../screens/HomeScreen';
import SearchParkingScreen from '../screens/SearchParkingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';

const Drawer =  createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false , swipeEnabled: false,}} />
        <Drawer.Screen name="SearchParkingScreen" component={SearchParkingScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false ,  swipeEnabled: false,}}/>
        <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false , swipeEnabled: false,}}/>
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="ProfileEditScreen" component={ProfileEditScreen} options={{ headerShown: false }}/>
        {/* <Drawer.Screen name="History" component={History} options={{ headerShown: false }}/> */}
      </Drawer.Navigator>
  );
}
