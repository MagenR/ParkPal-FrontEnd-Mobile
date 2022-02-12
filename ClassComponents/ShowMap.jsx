import React from "react";
import { Dimensions, StyleSheet, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView from "react-native-maps"

const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo'

export default function ShowMap() {
  const [region, setRegion] = React.useState({
    latitude: 32.109333,
    longitude: 34.855499,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search for Location"
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details)
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          types: "establishment",
          location: `${region.latitude}, ${region.longitude}`
        }}
        textInputProps={{ placeholderTextColor: '#fff' }}
        styles={searchInputBoxStyles}
      />
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta
        }}
      >
      </MapView>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height 
  }
})

const searchInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#34495e',
    paddingBottom: 0
  },
  textInput: {
    backgroundColor: "#34495e",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingBottom: 0
  },
});
