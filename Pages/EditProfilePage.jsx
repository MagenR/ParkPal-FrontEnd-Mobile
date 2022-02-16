import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';

import { useTheme, Avatar, TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RotateInUpLeft } from 'react-native-reanimated';

export default function EditProfilePage({ navigation, route }) {
  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  })
  const [image, setImage] = useState(null);
  const { colors } = useTheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const textInputChange = (val) => {
    setData({
      ...data,
      username: val
    });
  }

  const firstNameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        firstName: val,
        check_firstNameInputChange: true,
      });
    } else {
      setData({
        ...data,
        firstName: val,
        check_firstNameInputChange: false,
      });
    }
  }

  const lastNameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        lastName: val,
        check_lastNameInputChange: true
      });
    } else {
      setData({
        ...data,
        lastName: val,
        check_lastNameInputChange: false
      });
    }
  }

  const emailInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_emailInputChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_emailInputChange: false
      });
    }
  }

  const valdiateEmail = (email) => {
    getUser(email, hostURL + emailValidationApi);
  }

  const valdiateUsername = (username) => {
    let response = getUser(username, hostURL + UsernameValidationApi);
  }

  return (
    <View style={styles.container}>
      <TouchableRipple style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 50 }}
        onPress={() => navigation.openDrawer()}>
        <FontAwesome name="bars" color="#777777" size={20} />
      </TouchableRipple>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
          <TouchableRipple onPress={pickImage}>
            <Avatar.Icon style={{ backgroundColor: '#009387' }}
              icon='camera'
              size={80}
            />
          </TouchableRipple>
        </View>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
          {route.FirstName} {route.LastName}
        </Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="User Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => valdiateUsername(e.nativeEvent.text)}
          />
          {data.username_validity ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />

            </Animatable.View>
            :
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="red"
                size={20}
              />

            </Animatable.View>}
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(val) => firstNameInputChange(val)}
          />
          {data.check_firstNameInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />

            </Animatable.View>
            : null}
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(val) => lastNameInputChange(val)}
          />
          {data.check_lastNameInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />

            </Animatable.View>
            : null}
        </View>
        {/* <View style={styles.action}>
        <Feather name="phone" color={colors.text} size={20} />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View> */}
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(val) => emailInputChange(val)}
            onEndEditing={(e) => valdiateEmail(e.nativeEvent.text)}
          />
          {data.check_emailInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />

            </Animatable.View>
            : null}
        </View>
        {/* <View style={styles.action}>
        <FontAwesome name="globe" color={colors.text} size={20} />
        <TextInput
          placeholder="Country"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} />
        <TextInput
          placeholder="City"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View> */}
        <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#009387',
    alignItems: 'center',
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginLeft: 10
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    color: '#05375a',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});