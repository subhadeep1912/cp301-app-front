import React, { Component , useState, useEffect} from "react";
import { Button,
  SafeAreaView, 
  View , FlatList, StyleSheet, Text, Dimensions,
  StatusBar, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import toServer from "./toServer";

const {height, width} = Dimensions.get("window")

export class UploadImage extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        cameraRollPer: null,
        disableButton: false,
        cards: false,
      };
    }
    async componentDidMount() {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      this.setState((state, props) => {
        return {
          cameraRollPer: status === "granted",
          disableButton: false,
        };
      });
    }
  
    uriToBase64 = async (uri) => {
      let base64 = await FS.readAsStringAsync(uri, {
        encoding: FS.EncodingType.Base64,
      });
      return base64;
    };
  
    pickMedia = async () => {
      this.setState((state, props) => {
        return {
          cameraRollPer: state.cameraRollPer,
          disableButton: true,
        };
      });
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
      });
      if (result.cancelled) {
        return;
      }
      if (result.type == "image") {
        // await this.toServer({
        await toServer({
          type: result.type,
          base64: result.base64,
          uri: result.uri,
        });
      } else {
        let base64 = await this.uriToBase64(result.uri);
        await toServer({
          type: result.type,
          base64: base64,
          uri: result.uri,
        });
      }

      this.props.navigation.navigate('Results')

    };

    render() {
      return (
        <SafeAreaView style={styles.homecontainer}>

            <View style={styles.homebuttons}>

                {this.state.cameraRollPer ? (  
                  <TouchableOpacity

                  onPress={async () => {
                        await this.pickMedia();
                        this.setState((s, p) => {
                          return {
                            cameraRollPer: s.cameraRollPer,
                            disableButton: false,
                          };
                        });
                      }}>
                        <View style={{flex:1, justifyContent:"center", alignContent:"center", alignItems:"center", padding:5}}>
                        <Text style={styles.text}>Upload {this.props.route.params.bru}</Text>
                        <Text style={styles.text}>UPLOAD IMAGE</Text>
                <Icon
                    name="image" 
                    // backgroundColor="purple" 
                    size={100}
                    // width={50}
                    style={{alignSelf:"center"}}
                    // onPress={async ()=> navigation.navigate('Gallery')}
                    />
                        </View>
                    </TouchableOpacity>  
                    ):(
                        <Text style={styles.buttonText}>Pick Image</Text>
                    )
                    }
                </View>
        </SafeAreaView>
      );
    }
  }
  const styles = StyleSheet.create({
    homecontainer: {
      flex: 1,
      backgroundColor: 'black',
      paddingTop:StatusBar.currentHeight,
      justifyContent:"center"
    },
    imgContainer: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
        height:null,
        width:null,
        resizeMode:'contain'
    },
    homebuttons:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end",
  
        padding:10,
        // alignItems:"center",
        // paddingHorizontal:30,
        position:"absolute",
         backgroundColor:"#303030",
        height: height/3,
        width:width/2,
        alignSelf :"center",
        borderRadius:10
        // alignContent:"flex-end"
    },
    homebutton:{
      position:"relative",
      right:15,
      left:5,
      top:5,
      bottom:15,
      height:50,
      width:150,
      backgroundColor:'red'
    },
    container: {
        flex: 1,
        // backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        
      },
      button:{
        // backgroundColor:"#FB3E00",
        width:"100%",
        padding: 150,
        borderRadius:10,
        alignItems:"center"
    },
    icons:{
        flexDirection: "row",
      justifyContent: "space-evenly",
      width: 120
    },
    cardContainer:{
      flex:1,
      padding:5
    },
    text:{
      fontSize:20,
      alignSelf:"center",
      color:"#b3b3b3"
    }
  });

  export default UploadImage;