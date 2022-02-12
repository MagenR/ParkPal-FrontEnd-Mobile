import searchParkingPage from './Pages/searchParkingPage';
import PaymentPage from './Pages/PaymentPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="searchParkingPage">
        <Stack.Screen name="searchParkingPage" component={searchParkingPage} options={{ title: 'Search for Parking' }} />
        <Stack.Screen name="PaymentPage" component={PaymentPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

