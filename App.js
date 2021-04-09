import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Chatroom from './src/screens/Chatroom';
import firebase from '@react-native-firebase/app';
console.disableYellowBox = true;
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyB8bEMYDghQRJGnK3fiNjm5IvLgOkcbJcc',
  authDomain: 'codeeditorchat.firebaseapp.com',
  databaseURL: 'https://codeeditorchat.firebaseio.com',
  projectId: 'codeeditorchat',
  storageBucket: 'codeeditorchat.appspot.com',
  messagingSenderId: '14629640878',
  appId: '1:14629640878:web:3eac1eb67413adbd6d2b3f',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chatroom"
          component={Chatroom}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
