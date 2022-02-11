import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import searchParking from './Pages/searchParking';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SearchParking">
      <Stack.Screen name="SearchParking" component={searchParking} options={{ title: 'Search for Parking' }}/>
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
