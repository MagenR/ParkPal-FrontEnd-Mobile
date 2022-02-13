import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight, Dimensions } from "react-native"
import MapView, { Marker, Circle } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';

const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo'

export default function SearchParkingPage({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [date, setDate] = useState(new Date());

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };


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

  return (
    <View style={SearchParkingStyles.container}>
      <View style={SearchParkingStyles.header}>
        <View >
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
            <Marker
              coordinate={{
                longitude: mapRegion.longitude,
                latitude: mapRegion.latitude
              }}
            ></Marker>
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
      </View>
      <View style={SearchParkingStyles.footer}>
        <Text style={SearchParkingStyles.text_header}>Choose a date and a time</Text>
        <View>
          <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
            <Icon style={{ marginRight: 10 }} size={24} type='font-awesome-5' name="sign-in-alt" />
            <Text style={dateTimePickerStyles.header}>Entrance:</Text>
            <DateTimePicker
              style={dateTimePickerStyles.entranceDateTime}
              value={date}
              mode='datetime'
              onChange={changeDate}
            >
            </DateTimePicker>
          </View>
          <View style={{ flexDirection: 'row', alignContent: 'space-around', paddingTop: 20 }}>
            <Icon style={{ marginRight: 10 }} size={24} type='font-awesome-5' name="sign-out-alt" />
            <Text style={dateTimePickerStyles.header}>Exit:</Text>
            <DateTimePicker
              style={dateTimePickerStyles.exitDateTime}
              value={date}
              mode='datetime'
              onChange={changeDate}
            >
            </DateTimePicker>
          </View>
          <TouchableHighlight>
            <Button
              title="Reserve a parking"
              onPress={() => navigation.navigate('PaymentPage')}
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
      </View>
    </View>
  )
}

const SearchParkingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
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
    height: Dimensions.get("window").height * 0.5,
  },
})


const searchInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    paddingTop: 60,
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