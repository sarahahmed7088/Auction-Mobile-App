
import React, { useState, useContext,useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';



import {
  StyledContainer,
  PageTitle,
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
  SubTitle,
  Colors,
} from '../components/styles';
import { View, TouchableOpacity, ActivityIndicator,StyleSheet,Text,TextInput,Alert } from 'react-native';
import axios from "axios";

//colors
const { darkLight, brand, primary } = Colors;
// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';


// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { backgroundColor } from 'styled-system';


const SignUp=({navigation})=>{
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);

  const [formData,setFormData]=useReducer(
  (oldState, updates) => ({ ...oldState, ...updates }),
  {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_name: "",
  }

);
const handleSubmit=()=>{
  setFormData({user_name:formData.email});
  axios.post("https://iti-alauno.vercel.app/api/register",formData)
  .then(async(response)=>{
    let data= await response.data;
    data.success &&   Alert.alert('Account Created Successfully');
  })
  .catch((err)=>{
    console.log(err);
  })

}


  return(
    <KeyboardAvoidingWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>

        <PageTitle>ALa-uno</PageTitle>
        <SubTitle>
          Account Signup 
          {/* {formData.first_name} */}
          </SubTitle>
            <StyledFormArea>
              <MyTextInput
                label="First Name"
                placeholder="Richard Barnes"
                placeholderTextColor={darkLight}
                onChangeText={(text)=>setFormData({first_name:text})}
                onBlur={()=>{}}
                value={formData.first_name}
                icon="person"
              />
               <MyTextInput
                label="Last Name"
                placeholder="Barnes"
                placeholderTextColor={darkLight}
                onChangeText={(text)=>setFormData({last_name:text})}
                onBlur={()=>{}}
                value={formData.last_name}
                icon="person"
              />

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
                  <ButtonText>Signup</ButtonText>
                </StyledButton>

              <Line />
              <ExtraView>
                <ExtraText>Already have an account? </ExtraText>
                <TextLink onPress={() => navigation.navigate('Login')}>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>


      </InnerContainer>
    </StyledContainer>
  </KeyboardAvoidingWrapper>
  );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {!isDate && <StyledTextInput {...props} />}

      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  ErrorMsg: {
    fontWeight: "bold",
    color: "crimson",
  },
});