import { NavigationContainer } from '@react-navigation/native';
import HomePage from './Pages/HomePage';
import LogInPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import DrawerNavigator from './ClassComponents/DrawerNavigator';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='DrawerNavigation'>
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="LogInPage" component={LogInPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

