import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Pages/HomePage';
import SignUp from './Pages/SignUp';
import logIn from './Pages/logIn';
import DrawerNavigation from './ClassComponents/DrawerNavigator';


const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="DrawerNavigation">
      <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen name="logIn" component={logIn} options={{ headerShown: false }}/>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

