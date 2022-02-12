import searchParkingPage from './Pages/searchParkingPage';
import PaymentPage from './Pages/PaymentPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from './Pages/DrawerContent';

const Drawer =  createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="searchParkingPage" component={searchParkingPage} options={{ headerShown: false }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

