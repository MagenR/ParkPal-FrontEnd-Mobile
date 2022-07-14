import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, StatusBar, Platform, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const hostURL = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/users/';
const emailValidationApi = 'ValidateEmail';
const UsernameValidationApi = 'ValdiateUsername';
const signupApi = 'signup';

export default function SignupScreen({ navigation }) {

  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username_validity: null,
    password_validty: null,
    email_validity: null,
    secureTextEntry: true,
    readyToPost: false
  });

  useEffect(() => {
    setData({
      ...data,
      readyToPost: checkAllFields()
    });
  }, [data.firstName, data.lastName, data.username_validity, data.password_validty, data.email_validity]);

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
    fetch(hostURL + signupApi, {
      method: 'POST',
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
          console.log("fetch POST=", JSON.stringify(result));
        },
        (error) => {
          console.log("err POST=", error);
        });
  }

  const signupUser = () => {
    let user = {
      UserName: data.username,
      Email: data.email,
      Password: data.password,
      FirstName: data.firstName,
      lastName: data.lastName
    }
    postUser(user);
    navigation.navigate('LogIn');
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

  const valdiateEmail = (email) => {
    getUser(hostURL + email + "/" + emailValidationApi, 'email_validity');
  }

  const valdiateUsername = (username) => {
    getUser(hostURL + username + "/" + UsernameValidationApi, 'username_validity');
  }

  const validatePassword = (password) => {
    setData({
      ...data,
      password_validty: (password.length >= 8) ? true : false
    });
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
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val, 'username')}
              onEndEditing={(e) => valdiateUsername(e.nativeEvent.text)}
            />
            {renderV('username_validity')}
          </View>
          <Text style={styles.text_footer}>First name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your first name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val, 'firstName')}
            />
            {data.check_firstNameInputChange ?
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
              : null}
          </View>
          <Text style={styles.text_footer}>Last name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your last name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val, 'lastName')}
            />
            {data.check_lastNameInputChange ?
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
              : null}
          </View>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val, 'email')}
              onEndEditing={(e) => valdiateEmail(e.nativeEvent.text)}
            />
            {renderV('email_validity')}
          </View>
          <Text style={[styles.text_footer, {}]}>Password</Text>
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
            : null
          }
          <View style={styles.button}>
            <TouchableOpacity
              disabled={data.readyToPost ? null : true}
              onPress={signupUser}
              style={data.readyToPost ?
                [styles.signUp, { borderColor: '#009387', borderWidth: 1 }]
                :
                [styles.signUp, { borderColor: 'grey', borderWidth: 1 }]
              }
            >
              {data.readyToPost ?
                <Text style={[styles.textSign, { color: '#009387' }]}>Sign up</Text>
                :
                <Text style={[styles.textSign, { color: 'grey' }]}>Sign up</Text>
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  button:
  {
    alignItems: 'center',
    marginTop: 50

  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});