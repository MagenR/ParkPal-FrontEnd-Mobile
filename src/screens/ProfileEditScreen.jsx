import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useTheme, TouchableRipple } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const hostURL = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/users/';
const emailValidationApi = 'ValidateEmail';
const UsernameValidationApi = 'ValdiateUsername';
const updateApi = 'update';

export default function ProfileEditScreen({ navigation, route }) {
  const { Id, UserName, Email, FirstName, LastName  } = route.params;
  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username_validity: null,
    email_validity: null,
    password_validty: null,
    secureTextEntry: true,
    readyToPost: false

  })

  // const [image, setImage] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    setData({
      ...data,
      readyToPost: checkAllFields()
    });
  }, [data.username,data.firstName, data.lastName, data.username_validity, data.password_validty, data.email_validity]);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const textInputChange = (textDat, fieldname) => {
    setData({
      ...data,
      [fieldname]: textDat
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const getUser = (apiUrl, validityField) => {
    console.log("get called! URL: " + apiUrl)
    fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        //console.log('res=', JSON.stringify(res));
        console.log('res.status=', JSON.stringify(res.status));
        console.log('res.ok=', JSON.stringify(res.ok));

        setData({
          ...data,
          [validityField]: res.ok
        })

        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch GET= ", JSON.stringify(result));
        },
        (error) => {
          console.log("err GET=", error);
        });
  }

  const postUser = (user) => {
    fetch(hostURL + updateApi , {
      method: 'PUT',
      body: JSON.stringify(user),
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
          console.log("fetch PUT=", JSON.stringify(result));
          navigation.navigate('ProfilePage', {Id: user.Id, UserName: user.UserName, Email: user.Email, FirstName: user.FirstName, LastName: user.LastName});
        },
        (error) => {
          console.log("err POST=", error);
        });
  }

  const updateUser = () => {
    let user = {
      Id: Id,
      UserName: data.username,
      Email: data.email,
      Password: data.password,
      FirstName: data.firstName,
      lastName: data.lastName
    }
    postUser(user);
  }

  const valdiateEmail = (email) => {
    if(email===Email) 
    {
    data.email_validity=true;
    renderV('email_validity');
    }
    getUser(hostURL + email + "/" + emailValidationApi, 'email_validity');
  }

  const valdiateUsername = (username) => {
    if(username===UserName)
    {
      data.username_validity=true;
      return;
    }
    getUser(hostURL + username + "/" + UsernameValidationApi, 'username_validity');
  }

  const validatePassword = (password) => {
    setData({
      ...data,
      password_validty: (password.length >= 8) ? true : false
    });
  }

  const checkAllFields = () => {
    if (
      data.username_validity === true &&
      data.password_validty === true &&
      data.email_validity === true &&
      data.firstName != '' &&
      data.lastName != '')
      return true;
    return false;
  }

  const renderV = (field) => {
    console.log(data[field]);
    if (data[field] === true)
      return (
        <Animatable.View
          animation="bounceIn"
        >
          <Feather
            name="check-circle"
            color="green"
            size={20}
          />
        </Animatable.View>
      )

    else if (data[field] === false)
      return (
        <Animatable.View
          animation="bounceIn"
        >
          <Feather
            name="check-circle"
            color="red"
            size={20}
          />
        </Animatable.View>
      )
  }

  return (
    <View style={styles.container}>
      <TouchableRipple style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 50 }}
        onPress={() => navigation.openDrawer()}>
        <FontAwesome name="bars" color="#777777" size={20} />
      </TouchableRipple>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
          {/* <TouchableRipple onPress={pickImage}>
            <Avatar.Icon style={{ backgroundColor: '#009387' }}
              icon='camera'
              size={80}
            />
          </TouchableRipple> */}
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
            onChangeText={(val) => textInputChange(val, 'username')}
            onEndEditing={(e) => valdiateUsername(e.nativeEvent.text)}
          />
          {renderV('username_validity')}
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
            onChangeText={(val) => textInputChange(val, 'firstName')}
          />
          {data.check_firstNameInputChange ?
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
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
            onChangeText={(val) => textInputChange(val, 'lastName')}
          />
          {data.check_lastNameInputChange ?
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
            : null}
        </View>
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
            onChangeText={(val) => textInputChange(val, 'email')}
            onEndEditing={(e) => valdiateEmail(e.nativeEvent.text)}
          />
          {renderV('email_validity')}
        </View>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={text => textInputChange(text, 'password')}
            onEndEditing={(e) => validatePassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ?
              <Feather name="eye-off" color="grey" size={20} />
              :
              <Feather name="eye" color="grey" size={20} />
            }
          </TouchableOpacity>
        </View>
        {(data.password_validty === false) ?
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
          </Animatable.View>
          : null}
        <View style={styles.button}>
          <TouchableOpacity
            disabled={data.readyToPost ? null : true}
            onPress={updateUser}
            style={data.readyToPost ?
              [styles.signUp, { borderColor: '#009387', borderWidth: 1 }]
              :
              [styles.signUp, { borderColor: 'grey', borderWidth: 1 }]
            }
          >
            {data.readyToPost ?
              <Text style={[styles.textSign, { color: '#009387' }]}>Edit</Text>
              :
              <Text style={[styles.textSign, { color: 'grey' }]}>Edit</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
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
  button:
  {
    alignItems: 'center',
    marginTop: 50

  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
signUp: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
},
});