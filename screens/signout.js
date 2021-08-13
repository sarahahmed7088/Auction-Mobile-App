import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { TouchableOpacity,Text, View } from 'react-native';


const Logout=()=>{

    const signOut=()=>{
        AsyncStorage.removeItem('flowerCribCredentials');
    }
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{signOut()}}>
        <Text style={{color:'blue'}}>Sign Out</Text>
        </TouchableOpacity>
        </View>
    );
}
//End Authentication Code
export default Logout;