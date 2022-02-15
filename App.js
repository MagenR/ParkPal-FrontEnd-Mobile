import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Pages/HomePage';
import SignUp from './Pages/SignUp';
import logIn from './Pages/logIn';
import SearchParkingPage from './Pages/searchParkingPage';
import ProfilePage from './Pages/ProfilePage';
import EditProfilePage from './Pages/EditProfilePage';
import DrawerNavigation from './ClassComponents/DrawerNavigator';
import PaymentPage from './Pages/PaymentPage';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="DrawerNavigation">
      <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen name="logIn" component={logIn} options={{ headerShown: false }}/>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }}/>
      <Stack.Screen name="PaymentPage" component={PaymentPage} options={{ headerShown: false }}/>
      <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} options={{ headerShown: false }}/>
      <Stack.Screen name="SearchParkingPage" component={SearchParkingPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

