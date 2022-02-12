import * as React from 'react'
import MapView, { Marker, Circle } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const { useState, useEffect } = React
const GOOGLE_MAPS_APIKEY = 'AIzaSyArFZoGYuzS-L1_XOqAP7KfwXVEzhwqfwo'

export default function MapScreen() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);

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
        return <Text style={{margin: 50}}>{errorMsg}</Text>
    }

    if (location === null) {
        return <Text style={{margin: 50}}>Finding your current location...</Text>
    }

    if (mapRegion === null) {
        return <Text style={{margin: 50}}>Map region doesn't exist.</Text>
    }

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
                textInputProps={{ placeholderTextColor:'#009387' }}
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
    )
}

MapScreen.navigationOptions = {
    header: null
}

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
        paddingTop:60,
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
