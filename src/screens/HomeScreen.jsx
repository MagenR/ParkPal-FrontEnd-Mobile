import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
// import Icon from 'react-native-elements'

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.centerImage}>
        <Image
          source={require('../images/signage.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>ParkPal</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.signUp}
          >
            <Text style={styles.text_footer}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen')}
            style={styles.signUp}
          >
            <Text style={styles.text_footer}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  centerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    backgroundColor: '#fff',
    borderWidth: 2
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 90,
    marginTop: -80
  },
  logo: {
    width: 200,
    height: 300,
    //marginLeft: 15,
    //marginTop: 50,
    marginBottom: 20
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  // buttonStyle: {
  //     width: '100%',
  //     height: 50,
  // },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 100,
  },
  text_footer: {
    // color: '#05375a',
    color: '#009387',
    fontSize: 30,
    fontWeight: 'bold'
  }
});