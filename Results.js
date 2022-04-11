import react, { useState } from "react";
import { Button, View , StyleSheet, Text} from "react-native";
import axios from "axios";
export default function Results(){

    const [value,setValue]=useState("")

    async function getVal(){
        axios.get('http://172.21.12.234:5000/').then((response)=>{
        console.log(response.data)
        setValue(response.data)
        });
      }

    return(
        <View style={styles.container}>
            <Button title="Fetch Results" onPress={getVal} style={styles.button}/>
            <Text style={styles.textS}>{value}</Text>
        </View>
    );
}

const styles=StyleSheet.create({

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
          },
          textS:{
              fontWeight:'100'
          }
    
})
