import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import searchParking from './Pages/searchParking';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Pages/HomePage';
import SignUp from './Pages/SignUp';
import logIn from './Pages/logIn';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="SearchParking" component={searchParking} options={{ title: 'Search Parking' }}/>
      <Stack.Screen name="HomePage" component={HomePage} options={{ title: ' Home page' }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: ' Sign up' }}/>
      <Stack.Screen name="logIn" component={logIn} options={{ title: ' Login' }}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
