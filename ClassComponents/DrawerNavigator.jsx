import SearchParkingPage  from '../Pages/searchParkingPage';
import HomePage from '../Pages/HomePage';
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../Pages/DrawerContent'
import ProfilePage from '../Pages/ProfilePage'

const Drawer =  createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Drawer.Screen name="searchParkingPage" component={SearchParkingPage} options={{ headerShown: false }}/>
        <Drawer.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );
}
