import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo';
const hostURL = 'https://proj.ruppin.ac.il/bgroup52/test2/tar6/api/parkinglots/SearchByCoordinatesAndTimeSlot?';

export default function SearchParkingScreen() {

  const [searchParams, setParams] = useState({
   //  latitude: 32.07473275692371,
   //  longitude: 34.792109182901896,

    latitude: 32.815635078809784,
    longitude: 34.99974171574337,

    entranceDateTime: '2022-06-01T00:00:00',
    exitDateTime: '2022-06-01T12:00:00'
  });

  const [parkingLots, setParkingLots] = useState([]);

  // At screen load, and every new initial point, search for lots around.
  useEffect(() => { 
    getParkingLots();
  }, [searchParams]);

  const getParkingLots = () => {
    fetch(hostURL + 'latitude=' + searchParams.latitude + '&longitude=' + searchParams.longitude + '&startTime=' + searchParams.entranceDateTime + '&endTime=' + searchParams.exitDateTime, {
      method: 'GET',
      body: JSON.stringify(),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8'
      })
    })
      .then(res => {
        //console.log('res=', JSON.stringify(res));
        //console.log('res.status=', JSON.stringify(res.status));
        //console.log('res.ok=', JSON.stringify(res.ok));
        return res.json(parkingLots);
      })
      .then(
        (result) => {
          //console.log("fetch GET= ", JSON.stringify(result));
          setParkingLots(result);
          console.log(parkingLots);
        },
        (error) => {
          console.log("err GET=", error);
        });
  }


  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.container}>
        
        {/* Map */}
        <MapView
        style={styles.container}
        initialRegion={{
          latitude: searchParams.latitude,
          longitude: searchParams.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {parkingLots.length > 0 &&  parkingLots.map((parkingLot, index) => (
          <Marker
            key={parkingLot.Id}
            coordinate={{latitude: parkingLot.Latitude, longitude: parkingLot.Longitude}}
            title={parkingLot.Name}
            //description={parkingLot.HourlyTariff}
          />
        ))}
        </MapView>
         
        {/* SearchBox */}
        <View style={styles.searchBox}>
          <TextInput 
            placeholder="Search here"
            placeholderTextColor="#000"
            autoCapitalize="none"
            style={{flex:1,padding:0}}
          />
          {/* <Ionicons name="ios-search" size={20} /> */}
        </View> 

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 30, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});