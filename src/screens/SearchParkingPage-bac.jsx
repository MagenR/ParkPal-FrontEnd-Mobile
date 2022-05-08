import React, { useEffect, useState } from "react";
// import {StatusBar} from 'expo-status-bar'
import { View, StyleSheet, Text, TouchableHighlight, Dimensions, Platform } from "react-native"
import MapView, { Marker, Circle } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo';
const hostURL = 'https://proj.ruppin.ac.il/bgroup52/test2/tar6/api/parkinglots/SearchByCoordinatesAndTimeSlot?';

export default function SearchParkingPage({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [entranceDateTime, setEntranceDateTime] = useState(new Date());
  const [exitDateTime, setExitDateTime] = useState(new Date());
  // const [searchParams, setParams] = useState ({
  //   entranceDateTime: new Date(),
  //   exitDateTime: new Date(),
  // });
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [markers, setMarkers] = useState([]);

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  }

  const changeEntraceDate = (event, selectedDate) => {
    const currentDateTime = selectedDate || entranceDateTime;
    setShowPicker(Platform.OS === "ios");
    setEntranceDateTime(currentDateTime);
    
    let tempDate = new Date(currentDate);
  };

  const changeExitDate = (event, selectedDate) => {
    const currentDateTime = selectedDate || exitDateTime;
    setShowPicker(Platform.OS === "ios");
    setExitDateTime(currentDateTime);
  };

  const changeMarkers = (newMarkers, items) => {
    newMarkers.map(newM =>
      setMarkers([...items,
      {
        title: newM.Name,
        coordinate: {
          longitude: newM.Longitude,
          latitude: newM.Latitude
        },
      }]))
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421
      });
    })();
  }, []);

  if (errorMsg) {
    return <Text style={{ margin: 50 }}>{errorMsg}</Text>
  }

  if (location === null) {
    return <Text style={{ margin: 50 }}>Finding your current location...</Text>
  }

  if (mapRegion === null) {
    return <Text style={{ margin: 50 }}>Map region doesn't exist.</Text>
  }

  const getMacth = () => {
    fetch(hostURL + 'latitude=' + mapRegion.latitude + '&longitude=' + mapRegion.longitude + '&startTime=' + entranceDateTime + '&endTime=' + exitDateTime, {
      method: 'GET',
      body: JSON.stringify(),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        //console.log('res=', JSON.stringify(res));
        console.log('res.status=', JSON.stringify(res.status));
        console.log('res.ok=', JSON.stringify(res.ok));
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch GET= ", JSON.stringify(result));
          changeMarkers(result, markers)
          //navigation.navigate('PaymentPage', {pName:result.Name, pAdress:result.Adress})
        },
        (error) => {
          console.log("err GET=", error);
        });
  }

  const renderInner = () => (
    <View>   
      {/* Location top search bar */} 
      <GooglePlacesAutocomplete
        placeholder="Search for Location"
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details)
          setMapRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          types: "establishment",
          location: `${mapRegion.latitude}, ${mapRegion.longitude}`
        }}
        textInputProps={{ placeholderTextColor: '#009387' }}
        styles={searchInputBoxStyles}
      />

      <Icon style={{ marginRight: 10 }} size={24} type='font-awesome-5' name="sign-in-alt" />     
      <Button title='Entrance Date' onPress={() => showMode('date')}></Button>
      {/*<Text style={dateTimePickerStyles.header}>Entrance:</Text>*/}
      <Text style={dateTimePickerStyles.header}>Entrance:</Text>
      
      <TouchableHighlight>
        <Button
          title="Reserve a parking"
          onPress={getMacth}
          buttonStyle={{
            backgroundColor: '#009387',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
            margin: 20
          }}
        />
      </TouchableHighlight>

  </View>

  );

  const renderHeader = () => (
    <Text>Testino</Text>
  );

  return (
    <View style={SearchParkingStyles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      >

      </BottomSheet>
      
      <Button title='Search' onPress={() => bs.current.snapPoints(0)}></Button>
      {/* Drawer (burger menu) */}
      {/* <View style={{ marginTop: 50, alignItems: 'flex-start', paddingLeft: 10, paddingBottom: 5 }}> */}
      <View>
        <TouchableHighlight onPress={() => navigation.openDrawer()}>
          <Icon type='font-awesome-5' name="bars" color="#777777" size={20} />
        </TouchableHighlight>
        <Button ></Button>
      </View>
     
      <View>
        {/* Map panel */}
        <MapView
          style={mapStyles.map}
          region={mapRegion}
          initialRegion={{
            "latitude": 32.109333,
            "latitudeDelta": 0.0922,
            "longitude": 34.855499,
            "longitudeDelta": 0.0421,
          }}
          onRegionChange={region => setMapRegion(region)}
        >
          <MapView.Marker
            coordinate={{
              longitude: mapRegion.longitude,
              latitude: mapRegion.latitude
            }}
            title="Your Location"
          />
          {markers.map(marker => (
            <MapView.Marker
              coordinate={{
                longitude: marker.coordinates.longitude,
                latitude: marker.coordinates.latitude
              }}
              title={marker.title}
            />
          ))}

          {/* Radius circle */}
          <Circle
            center={{
              longitude: mapRegion.longitude,
              latitude: mapRegion.latitude
            }}
            radius={1000}
            strokeColor="transparent"
            fillColor="rgba(255,0,0,0.3)"
          ></Circle>
        </MapView>
      </View>

      {/* Below map controllers */}
      <Animatable.View
        animation="fadeInUpBig"
        style={[SearchParkingStyles.footer]}
      >
        <Text style={SearchParkingStyles.text_header}>Choose a date and a time</Text>
        
        <View>

          <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>

            {showPicker && <DateTimePicker
            testID = 'datetimepicker'
              style={dateTimePickerStyles.entranceDateTime}
              value={entranceDateTime}
              mode={mode}
              onChange={changeEntraceDate}
            >
            </DateTimePicker>}
          </View>

          {/* <View style={{ flexDirection: 'row', alignContent: 'space-around', paddingTop: 20 }}>
            <Icon style={{ marginRight: 10 }} size={24} type='font-awesome-5' name="sign-out-alt" />
            <Text style={dateTimePickerStyles.header}>Exit:</Text>
            <DateTimePicker
              style={dateTimePickerStyles.exitDateTime}
              value={exitDateTime}
              mode={mode}
              onChange={changeExitDate}
            >
            </DateTimePicker>
          </View> */}


        </View>
      </Animatable.View>
    </View>
  )
}

const SearchParkingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 0,
    paddingTop: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  text_header: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1
  },
});

const mapStyles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})

const searchInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    paddingTop: 5,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: '#009387',
    borderWidth: 2,
    fontSize: 15,
    fontWeight: 'bold'
  },
});

const dateTimePickerStyles = StyleSheet.create({
  header: {
    marginRight: 10,
    padding: 1,
    fontSize: 20
  },
  entranceDateTime: {
    alignSelf: 'center',
    width: 200,
  },
  exitDateTime: {
    alignSelf: 'center',
    width: 245,
  },
});
