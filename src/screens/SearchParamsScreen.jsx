import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Searchbar, Button } from 'react-native-paper';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function SearchParamsScreen({ navigation, route }) {

  const [searchParams, setSearchQuery] = React.useState({
    searchQuery: null,

    latitude: null,
    longitude: null,

    enterDate: null,
    enterTime: null,

    exitDate: null,
    exitTime: null
  });

  const [DTP, setDTP] = useState({
    show: false,
    pickerType: 'Start'
  });

  const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo';

  // --------------------------- Funcs ---------------------------------------

  // Set comitted search parameters.
  const onChangeSearch = query => setSearchQuery(query);

  const prepareDate = (dateObj) => { // formats date object for payment calculations
    return new Date(`${dateObj.date}T${dateObj.time}`);
  }

  // Opens the date time picker.
  const configureDateTime = (set) => {
    setDTP({
      pickerType: set,
      show: true
    })
  }
  useEffect(() => {
    console.log(searchParams)
  }, [searchParams]);

  // called when user confirms datetimepicker.
  const handleDateChange = (selectedDate) => {
    console.log("Date before format:" + selectedDate);
    let date = selectedDate.toISOString().split('T')[0];
    let time = selectedDate.toLocaleTimeString();

    DTP.pickerType === 'Start' ?
      setSearchQuery({
        ...searchParams,
        enterDate: date,
        enterTime: time
      }) :
      setSearchQuery({
        ...searchParams,
        exitDate: date,
        exitTime: time
      })

    setDTP({
      ...searchParams,
      show: false
    })

  }

  const NavigateBack = () => {
    route.params.onReturn({
      Query: searchParams.searchQuery,
      Latitude: searchParams.latitude,
      Longitude: searchParams.longitude,
      EnterDate: searchParams.enterDate,
      EnterTime: searchParams.enterTime,
      ExitDate: searchParams.exitDate,
      ExitTime: searchParams.exitTime
    });
    navigation.goBack();
  }

  // const canReserveParkingSpot = entrance.date && entrance.time && exit.date && exit.time;

  return (
    <View style={styles.container}>

      <GooglePlacesAutocomplete
        placeholder="Search for Location"
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        onPress={(data, details = null) => {
          // console.log(data, details)
          console.log(details);
          setSearchQuery({
            ...searchParams,
            searchQuery: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
          })

        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          // types: "establishment",
          components: 'country:il',
          // location: `${mapRegion.latitude}, ${mapRegion.longitude}`
        }}
        textInputProps={{ placeholderTextColor: '#009387' }}
        styles={searchInputBoxStyles}
      />

      <View style={styles.entranceContainer}>

        <View style={styles.IndivItem}>
          <Text style={styles.dateDetail}>Entrance date: {searchParams.enterDate}</Text>
          <Text style={styles.dateDetail}>Entrance time: {searchParams.enterTime?.slice(0, 5)}</Text>
        </View>

        <Button
          style={{ height: 40, margin: 15 }}
          mode="contained"
          onPress={() => configureDateTime('Start')}
        >
          Set Enter Date
        </Button>

      </View>

      <View style={styles.entranceContainer}>

        <View style={styles.IndivItem}>
          <Text style={styles.dateDetail}>Exit date: {searchParams.exitDate}</Text>
          <Text style={styles.dateDetail}>Exit time: {searchParams.exitTime?.slice(0, 5)}</Text>
        </View>

        <Button
          style={{ height: 40, margin: 15 }}
          mode="contained"
          onPress={() => configureDateTime('Exit')}
          disabled={searchParams.enterDate === null} // disabled if no entry date is set.
        >
          Set Exit Date
        </Button>

      </View>

      <Button
        style={{ height: 40, margin: 15 }}
        mode="contained"
        onPress={() => NavigateBack()}
        disabled={searchParams.searchQuery === null ||
          searchParams.latitude === null ||
          searchParams.longitude === null ||
          searchParams.enterDate === null ||
          searchParams.enterTime === null ||
          searchParams.exitDate === null ||
          searchParams.exitTime === null}
      >
        Search
      </Button>

      <View>
        <DateTimePickerModal
          isVisible={DTP.show}
          mode="datetime"
          minimumDate={(DTP.pickerType == 'Start') ? new Date() : new Date(searchParams.enterDate)}
          onConfirm={(dateTime) => handleDateChange(dateTime)}
          onCancel={() => setDTP(prevState => { return { ...prevState, show: false } })}
        />
      </View>

    </View >)
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 20
  },
  IndivItem: {
    margin: 15,
  },
  dateDetail: {
    margin: 10
  }
});

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
  }
});