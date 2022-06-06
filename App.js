import { StyleSheet} from 'react-native';
import UploadImage from './upFile';
import Results from './Results';
import Home from './Home'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer style={styles.container}>

      <Stack.Navigator style={styles.container}>
        <Stack.Screen name="Xray Analyser" component={Home}/>
        <Stack.Screen name="Uploads" component={UploadImage} style={styles.container} options={{headerShown:false}} />
        <Stack.Screen name="Results" component={Results} options={{headerShown:false}}/>

      </Stack.Navigator>  
    </NavigationContainer>
  );
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
    backgroundColor:'red',
    height:'100',
    position:'relative',
    top:'100'
  }
});
