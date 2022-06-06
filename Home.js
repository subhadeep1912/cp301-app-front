import React from 'react'
import {SafeAreaView,View, Text, Button, StyleSheet, StatusBar, Dimensions} from 'react-native' 
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get("window")


export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.homecontainer}>
        {/* <Text>Bruh</Text> */}

        <View style={styles.homebuttons}>
        <View style = {{justifyContent:"center"}}>
        <Text style={styles.text}>Select the Part of body you want to analyse the xray of:</Text>
        </View>
        {/* <View style={[{height:"40"}]}> */}
        <Button title='Lungs' onPress={()=> navigation.navigate('Uploads', {bru:'Xray of Lungs'})} style= {styles.button} color="#0000"/>
        {/* </View> */}
        <Button title='Brain' onPress={()=> navigation.navigate('Uploads', {bru:'Mri of Brain'})} style= {styles.button} color="#0000"/>
        <Button title='Kidney Stones' onPress={()=> navigation.navigate('Uploads', {bru:'CT Scan of Kidney Stones'})} style= {styles.button} color="#0000"/>
        {/* <TouchableOpacity style={{ height: 100, marginTop: 10 }}>
    <Text>My button</Text>
</TouchableOpacity> */}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
      width:"90%",
      backgroundColor:'#0000',
      color:'#0000',
      height:'100',
      position:'relative',
      top:'100'
    },
    homecontainer: {
      flex: 1,
      backgroundColor: 'black',
      paddingTop: StatusBar.currentHeight,
      justifyContent: "center",
      alignItems:"center"
    },
    homebuttons: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
  
      padding: 10,
      // alignItems:"center",
      // paddingHorizontal:30,und
      position: "absolute",
      backgroundColor: "#303030",
      height: height/3,
      width: width / 1.2,
      alignSelf: "center",
      borderRadius: 10
      // alignContent:"flex-end"
    },
    text: {
      fontSize:20,
      alignSelf: "center",
      color: "#b3b3b3",
      justifyContent:"center"
      
    }
  });
