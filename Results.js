import { useState } from "react";
import {Buffer} from 'buffer'
import { Button, View, StyleSheet, Text, ActivityIndicator, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView} from "react-native";
import axios from "axios";
const { height, width } = Dimensions.get("window")

export default function Results() {

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const [value, setValue] = useState("")
  const [visible, setVisible] = useState(true)

  async function getVal() {
    setVisible(false)
    axios.get('http://192.168.128.60:5000/').then((response) => {
      // let val = Buffer.from(response.data, 'binary').toString('base64')
      setValue(response.data)
    });
  }

  return (
  //   <ScrollView
  //   // scrollEventThrottle={400}
  // >
    <View style={styles.homecontainer}>

      {
        visible == true ?
          (<View style={styles.homebuttons}>


            <TouchableOpacity onPress={getVal}>
              <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center", padding: 5 }}>

                <Text style={styles.text}>
                  FETCH RESULTS
                </Text>

              </View>
            </TouchableOpacity>
          </View>)
          :
          (
            <ScrollView>
          <>

            {
              value === ""
                ?
                (<ActivityIndicator size={50} color="#303030" />)
                :

                (<Text style={styles.text}>{value}</Text>)
            }
            
          </>
          </ScrollView>
          )
      }
      {/* <View style={{ height:50,width:50, backgroundColor:"#303030"}}>

        <TouchableOpacity >

        </TouchableOpacity>
      </View> */}
    </View>
    // </ScrollView>  
  );
}


const styles = StyleSheet.create({
  homecontainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems:"center"
  },
  imgContainer: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: null,
    width: null,
    resizeMode: 'contain'
  },
  homebuttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",

    padding: 10,
    // alignItems:"center",
    // paddingHorizontal:30,
    position: "absolute",
    backgroundColor: "#303030",
    height: height / 3,
    width: width / 2,
    alignSelf: "center",
    borderRadius: 10
    // alignContent:"flex-end"
  },
  homebutton: {
    position: "relative",
    right: 15,
    left: 5,
    top: 5,
    bottom: 15,
    height: 50,
    width: 150,
    backgroundColor: 'red'
  },
  container: {
    flex: 1,
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",

  },
  button: {
    // backgroundColor:"#FB3E00",
    width: "100%",
    padding: 150,
    borderRadius: 10,
    alignItems: "center"
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  },
  cardContainer: {
    flex: 1,
    padding: 5
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: "#b3b3b3"
  }
})