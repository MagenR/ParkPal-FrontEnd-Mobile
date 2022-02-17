import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight, Dimensions } from "react-native"
import MapView, { Marker, Circle } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo'
const apiUrl = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/parkinglots/SearchVacant';

export default function SearchParkingPage({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [dates, setDate] = useState({
    entranceDate: new Date(),
    exitDate: new Date()
  });
  const [nearestParkingLot, setNearestParkingLot] = useState(null);
  const[show, setShow] = useState({
    entrancePicker: false,
    exitPicker: false
  });

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

  const onChange = (event, selectedDate, date) => {
    const currentDate = selectedDate || dates[date];
    setShow(Platform.OS === 'ios');
    setDate ({
      ...dates,
      [date]: currentDate
    });
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    console.log(fDate);
  }

  const formatDateToText = (date) => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  const onChangeEntrance = (event, selectedDate) => {
    onChange(event, selectedDate, 'entranceDate')
   }

  const onChangeExit = (event, selectedDate) => {
    onChange(event, selectedDate, 'exitDate')
   }

  const showMode = (currentMode) => {
    setShow({
      ...show,
      [currentMode]: true});
  }

  const destination = () => {
    let destination = {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      startTime: entranceDate,
      endTime: exitDate
    }
    getParkingLot(destination)
  }

  const parseDate = (date) => {
    return DateTime.ParseExact(date, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
  }

  const getParkingLot = (apiUrl, destination) => {
    console.log("get called! URL: " + apiUrl)
    fetch(hostURL, {
        method: 'GET',
        body: JSON.stringify(destination),
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
                setNearestParkingLot({
                  result
              })
            },
            (error) => {
                console.log("err GET=", error);
            });

            navigation.navigate('PaymentPage', nearestParkingLot);
  };
//SearchVacant?startTime={startTime}&endTime={endTime}
  const getParkingLots = () => {
    //console.log(dates.entranceDate.toISOString().slice(0, 19).replace('T', ' '));
    //return;
    fetch(apiUrl + "?startTime=" + dates.entranceDate.toISOString() + "&endTime=" + dates.exitDate.toISOString(), {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
        })
      })
        .then(res => {
          console.log('res=', res);
          return res.json();
        })
        .then(
          (result) => {
            console.log("fetch GET= ", result);
          },
          (error) => {
            console.log("err GET=", error);
          });
}


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
        <View style={{marginTop: 5, alignItems: 'flex-start', paddingLeft: 10, paddingBottom: 5}}>
        <TouchableHighlight onPress={() => navigation.openDrawer()}>
          <Icon type='font-awesome-5' name="bars" color="#777777" size={20} />
        </TouchableHighlight>
        </View>

        <Animatable.View
                animation="fadeInUpBig"
                style={[SearchParkingStyles.footer]}
            >
        <Text >Choose a date</Text>
        <View>
          <View style={{ flexDirection: 'row', alignContent: 'space-around' }} > 
            <Button title="Pick start" onPress={() => showMode('entrancePicker')}></Button>
            <Icon style={{ marginRight: 10 }} size={24} type='font-awesome-5' name="sign-in-alt" />
            <Text style={dateTimePickerStyles.header}>Entrance:</Text>
            <Text style={dateTimePickerStyles.header}>{formatDateToText(dates.entranceDate)}</Text>
            {show.entrancePicker && (
            <DateTimePicker
              value={dates.entranceDate}
              onChange={onChangeEntrance}
            />)}

          </View>
          <View style={{ flexDirection: 'row', alignContent: 'space-around', paddingTop: 20 }}>
            <Button title="Pick exit" onPress={() => showMode('exitPicker')}></Button>
            <Icon style={{ marginRight: 10 }} size={24} type='font-awesome-5' name="sign-out-alt" />
            <Text style={dateTimePickerStyles.header}>Exit:</Text>
            <Text style={dateTimePickerStyles.header}>{formatDateToText(dates.exitDate)}</Text>        
            {show.exitPicker && (
            <DateTimePicker
              value={dates.exitDate}
              onChange={onChangeExit}
            />)}
          </View>
          <TouchableHighlight>
            <Button
              title="Search Parking"
              onPress={getParkingLots}
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
    height: Dimensions.get("window").height * 0.5,
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