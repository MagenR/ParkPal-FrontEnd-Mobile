import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Platform, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
// import Icon from 'react-native-elements';

const apiUrl = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/users/loginUser'

export default function LoginScreen({ navigation }) {

  const { colors } = useTheme();

  const [data, setData] = useState({
    usernameORemail: '',
    password: '',
    secureTextEntry: true,
  });

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

  const loginHandle = () => {
    //console.log(apiUrl + "?login=" + data.usernameORemail + "&password=" + data.password);
    fetch(apiUrl + "?login=" + data.usernameORemail + "&password=" + data.password, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        //console.log('res=', res);
        return res.json();
      })
      .then(
        (result) => {
          //console.log("fetch GET= ", result);
          if (result === "Error. Login failed. no such user exists.")
            return;
          else
            navigation.navigate('ProfileScreen', { Id: result.Id, UserName: result.UserName, Email: result.Email, FirstName: result.FirstName, LastName: result.LastName });
          //console.log(result.Id);
        },
        (error) => {
          //console.log("err GET=", error);
          //return(
          //    <View style={{flexDirection: 'row'}}>
          //        <Icon size={20} type='font-awesome-5' name="exclamation-circle" color='red' />
          //        <Text>Oops, that's not a match</Text>
          //    </View>
          //)
        });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
            <Text style={[styles.text_footer, { color: colors.text }]}>Email/Username</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                placeholder="Your UserName/Email"
                placeholderTextColor="#666666"
                style={[styles.textInput, { color: colors.text }]}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val, 'usernameORemail')}
              />
            </View>
            <Text style={[styles.text_footer, { color: colors.text }]}>Password</Text>
            <View style={styles.action}>
              <Feather name="lock" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[styles.textInput, { color: colors.text }]}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val, 'password')}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ?
                  <Feather name="eye-off" color="grey" size={20} />
                  :
                  <Feather name="eye" color="grey" size={20} />
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={{ color: '#009387', marginTop: 15 }}>Don't have an accunt? Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={loginHandle}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Login</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
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
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 15
  },
  signIn: {
    marginTop: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#009387',
    borderWidth: 1
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009387'
  }
});