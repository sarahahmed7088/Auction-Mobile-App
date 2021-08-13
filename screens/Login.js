import React, { useState, useContext,useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';


import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from '../components/styles';
// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

import {View,TextInput } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;



// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';



// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';




const Login=({navigation})=>{
  const [hidePassword, setHidePassword] = useState(true);
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const [formData,setFormData]=useReducer(
    (oldState, updates) => ({ ...oldState, ...updates }),
    {

      email: "",
      password: "",
  
    }
  
  );
  const handleSubmit=()=>{

    // alert(JSON.stringify(formData));
    axios.post("https://iti-alauno.vercel.app/api/login",formData)
    .then(async(response)=>{
      let data= await response.data;
      if(data.success){
        AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(data.data))
        .then(() => {

          setStoredCredentials(data.data);
          
          // alert(data.data);
          // alert(JSON.stringify(data.data))
        
           
        })
        .catch((error) => {
        console.log(error);
    
        });
      }

    })
    .catch((err)=>{
     console.log(err)
    })
 
  }

  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
      <PageLogo resizeMode="contain" source={require('../assets/images/Ala-uno-logo.png')} />
        <PageTitle>ALa-uno</PageTitle>
        <SubTitle>
          Account Login
          {/* {JSON.stringify(storedCredentials)} */}
          </SubTitle>

            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                placeholder="andyj@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={(text)=>setFormData({email:text})}
                onBlur={()=>{}}
                value={formData.email}
                keyboardType="email-address"
                icon="mail"
              />

              <MyTextInput
                label="Password"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={(text)=>setFormData({password:text})}
                onBlur={()=>{}}
                value={formData.password}
                secureTextEntry={hidePassword}
                icon="lock"
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}


              />

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() =>  navigation.navigate('SignUp')}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>

            </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  </KeyboardAvoidingWrapper>

  );
   }

   const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons fname={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
     
      </View>
    );
  };
  
   export default Login;