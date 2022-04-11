import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import UploadImage from './upFile';
import Results from './Results';

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  
  // async function takeAndUploadPhotoAsync() {
  //   // Display the camera to the user and wait for them to take a photo or to cancel
  //   // the action
  //   let result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });
  
  //   if (result.cancelled) {
  //     return;
  //   }
  
  //   // ImagePicker saves the taken photo to disk and returns a local URI to it
  //   let localUri = result.uri;
  //   let filename = localUri.split('/').pop();
  
  //   // Infer the type of the image
  //   let match = /\.(\w+)$/.exec(filename);
  //   let type = match ? `image/${match[1]}` : `image`;
  
  //   // Upload the image using the fetch and FormData APIs
  //   let formData = new FormData();
  //   // Assume "photo" is the name of the form field the server expects
  //   formData.append('photo', { uri: localUri, name: filename, type });
  
  //   return await fetch(YOUR_SERVER_URL, {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   });
  // }

  async function uploadIt() {
    let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    let uriFromCameraRoll = result.uri;
    console.log(uriFromCameraRoll)
    serverURL = 'http://172.21.12.234:19000/backend/images/'
    var photo = {
      uri: uriFromCameraRoll,
      type: 'image/jpeg',
      name: 'photo.jpg',
  };
  
  // var body = new FormData();
  // body.append('authToken', 'secret');
  // body.append('photo', photo);
  // body.append('title', 'A beautiful photo!');
  
  // var xhr = new XMLHttpRequest();
  // xhr.open('POST', serverURL);
  // xhr.send(body);
      // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', photo);
  
    return await fetch('http://172.21.12.234:19006/backend/images/', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }


  const [value,setValue]=useState(0)
  async function getVal(){
    axios.get('http://172.21.12.234:5000/').then((response)=>{
    console.log(response.data)
    setValue(value + 1)
    });
  }

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Upload" component={UploadImage} />
        <Stack.Screen name="Results" component={Results} />
        {/* <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width:"90%",
    backgroundColor:'red',
    height:'100'
  }
});
