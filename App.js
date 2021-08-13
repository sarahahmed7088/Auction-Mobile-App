import React, { useState,useEffect,useContext } from 'react';

// React navigation stack
import RootStackScreen from "./navigator/RootstackScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// apploading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/CredentialsContext';

// screens

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/home';
import RootStack from './navigator/RootstackScreen';

export default function App(){

  const [IsfirstLaunchState,setFirstLaunchState]=useState(null);
  useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setFirstLaunchState(true);

      }
      else{
       setFirstLaunchState(false);
      }
    })
  },[]);

  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('flowerCribCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }


  const Stack = createStackNavigator();

  

    return(
      <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
         <RootStackScreen/>
      </CredentialsContext.Provider>
      );
   
  }


