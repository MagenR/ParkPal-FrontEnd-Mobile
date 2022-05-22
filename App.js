import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackNavigator from './src/navigation/StackNavigator'
//import SearchParamsScreen from './src/screens/SearchParamsScreen';
//import SearchParkingScreen from './src/screens/SearchParkingScreen';

export default function App() {
  return (

    //<StackNavigator />
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <SearchParkingScreen />
    // </GestureHandlerRootView>

    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigator />
    </GestureHandlerRootView>

    //<SearchParamsScreen />

  );
}
