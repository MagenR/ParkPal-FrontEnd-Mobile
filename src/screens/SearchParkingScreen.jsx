import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import BottomInfoPanel from "../components/BottomInfoPanel";

const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo';
const hostURL = 'https://proj.ruppin.ac.il/bgroup52/test2/tar6/api/parkinglots/SearchByCoordinatesAndTimeSlot?';

export default function SearchParkingScreen({ navigation }) {

  const [searchParams, setParams] = useState({
    latitude: 32.07473275692371,
    longitude: 34.792109182901896,

    // latitude: 32.815635078809784,
    // longitude: 34.99974171574337,

    // entranceDateTime: '2022-06-01T00:00:00',
    // exitDateTime: '2022-06-01T12:00:00'

    entranceDateTime: '2022-04-01T07:00:00',
    exitDateTime: '2022-04-01T12:10:00'
  });
  const [parkingLots, setParkingLots] = useState([]);
  const [bookInfo, setBookInfo] = useState(null);
  const [bookDialogueOpen, setOpenBookingDialogue] = useState(false);


  // Test if parking lot was selected.
  useEffect(() => {
    console.log('Bookinfo:' + bookInfo);
    if (bookInfo === null)
      setOpenBookingDialogue(false);
  }, [bookInfo]);

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
      .then(response => {
        //console.log('response=', JSON.stringify(res));
        //console.log('response.status=', JSON.stringify(res.status));
        //console.log('response.ok=', JSON.stringify(res.ok));
        return response.json(parkingLots);
      })
      .then(data => {
        //console.log("fetch GET= ", JSON.stringify(data));
        setParkingLots(data === 'No matching parking lots found.' ? [] : data);
        //console.log(parkingLots);   
      },
        (error) => {
          console.log("error GET=", error);
        });
  }

  const setMarkerColor = (givenType) => {
    switch (givenType) {
      case 'full': return '#dc143c';
      case 'auctioned': return '#0000ff';
      case 'empty': return '#90ee90';
    }
  }

  const makeParkChoice = (id) => {
    console.log("key = " + id);
    setBookInfo({
      ...bookInfo,
      chosenPark: parkingLots.find(park => park.Id === id)
    });
    if(!bookDialogueOpen)
      setOpenBookingDialogue(true);
  }

  const closeBottomInfoPanel = () => {
    setOpenBookingDialogue(false);
  }

  const handleMapPress = () => {
    console.log('empty click!!')
    Keyboard.dismiss();
    setBookInfo(null);
  }

  return (
    //<TouchableWithoutFeedback onPress={() => { handleEmptyClick() }}>
      <View style={styles.container}>

        {/* Map */}
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: searchParams.latitude,
            longitude: searchParams.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={()=>handleMapPress()}
          onRegionChangeComplete={(region) => setParams({
            ...searchParams,
            latitude: region.latitude,
            longitude: region.longitude
          })}>

          {parkingLots.length > 0 && parkingLots.map((parkingLot, index) => (
            <Marker
              key={parkingLot.Id}
              coordinate={{ latitude: parkingLot.Latitude, longitude: parkingLot.Longitude }}
              title={parkingLot.Name}
              pinColor={setMarkerColor(parkingLot.Type)}
              onPress={() => makeParkChoice(parkingLot.Id)}
            // onPress={()=>console.log(parkingLot.Id)}
            //description={parkingLot.HourlyTariff}
            />
          ))}
        </MapView>

        {/* SearchBox */}
        <View style={styles.searchBox}>

          <TouchableOpacity
            onPress={() => navigation.navigate('SearchParamsScreen')}
          >
            <Text style={{ paddingVertical: 5 }}>Search Here</Text>
          </TouchableOpacity>
          {/*<TextInput
            placeholder="Search here"
            placeholderTextColor="#000"
            autoCapitalize="none"
            style={{ flex: 1, padding: 0 }}
          />
           <Ionicons name="ios-search" size={20} /> */}
        </View>

        {bookDialogueOpen &&
          <BottomInfoPanel
            {...bookInfo}
            closePanel={closeBottomInfoPanel}
          />

          // <Animatable.View
          //   animation="fadeInUpBig"
          //   style={[styles.footer]}
          // >
          //   <Text>Name: {bookInfo.chosenPark.Name}</Text>
          //   <Text>Address: {bookInfo.chosenPark.Address}</Text>
          //   <Text>Hourly Tariff: {bookInfo.chosenPark.HourlyTariff}</Text>

          //   <View style={{ marginTop: 10, justifyContent: 'space-between', flex: 2, flexDirection: 'row' }}>
          //     <Button
          //       style={{ height: 40 }}
          //       icon="close"
          //       mode="contained"
          //       onPress={() => setOpenBookingDialogue(false)}>
          //       cancel
          //     </Button>
          //     <Button
          //       style={{ height: 40 }}
          //       icon="check"
          //       mode="contained"
          //       onPress={() => console.log("Create booking function")}>
          //       Book this lot
          //     </Button>
          //   </View>

          // </Animatable.View>
        }
      </View>
    //</TouchableWithoutFeedback>
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
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },

});