import HomePage from '../Pages/HomePage';
import SignUp from '../Pages/SignUp';
import logIn from '../Pages/logIn';
import SearchParkingPage from '../Pages/searchParkingPage';
import ProfilePage from '../Pages/ProfilePage';
import EditProfilePage from '../Pages/EditProfilePage';
import PaymentPage from '../Pages/PaymentPage';
import History from '../Pages/History'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../Pages/DrawerContent'

const Drawer =  createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Drawer.Screen name="searchParkingPage" component={SearchParkingPage} options={{ headerShown: false }}/>
        <Drawer.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }}/>
        <Drawer.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Drawer.Screen name="logIn" component={logIn} options={{ headerShown: false }}/>
        <Drawer.Screen name="PaymentPage" component={PaymentPage} options={{ headerShown: false }}/>
        <Drawer.Screen name="EditProfilePage" component={EditProfilePage} options={{ headerShown: false }}/>
        <Drawer.Screen name="History" component={History} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );
}
