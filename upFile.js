import React, { Component , useState, useEffect} from "react";
import { Button,
  SafeAreaView, 
  View , FlatList, StyleSheet, Text, 
  StatusBar} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import toServer from "./toServer";

const styles = StyleSheet.create({
    homecontainer: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop:StatusBar.currentHeight
    },
    imgContainer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
        height:null,
        width:null,
        resizeMode:'contain'
    },
    homebuttons:{
   
        flexDirection:"row",
        justifyContent:"flex-end",
        bottom:50,
        // alignItems:"center",
        // paddingHorizontal:30,
        position:"absolute",
        right:30
        // alignContent:"flex-end"
    },
    homebutton:{paddingLeft:15,},
    container: {
        flex: 1,
        // backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        
      },
      button:{
        // backgroundColor:"#FB3E00",
        width:"60%",
        padding: 15,
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
    }
  });

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
                <Icon.Button 
                    name="image" 
                    backgroundColor="#42c0fb" 
                    size={30}
                    style={styles.homebutton}
                    // onPress={async ()=> navigation.navigate('Gallery')}
                    onPress={async () => {
                        await this.pickMedia();
                        this.setState((s, p) => {
                          return {
                            cameraRollPer: s.cameraRollPer,
                            disableButton: false,
                          };
                        });
                      }}
                    />
                    ):(
                        <Text style={styles.buttonText}>Pick Image</Text>
                    )
                    }
                </View>
        </SafeAreaView>
      );
    }
  }

  export default UploadImage;