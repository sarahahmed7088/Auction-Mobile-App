import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Details from "./screens/Auctiondetails";
import Login from "./screens/Login";
import Home from "./screens/home";
import Auctions from "./screens/auctions";
import Products from "./screens/products";
import Signup from "./screens/Signup";
import productdetails from "./screens/productdetails";
import Logout from "./screens/signout";
import Auctiondetails from "./screens/Auctiondetails";
import Welcome from "./screens/Welcome";

const Stack = createStackNavigator();

const FisrstNavigator=()=>{
    return(
        <Stack.Navigator >
            <Stack.Screen name="Home" component={Home} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}/>
            <Stack.Screen name="Auction details" component={Auctiondetails} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}/>

<Stack.Screen name="Product details" component={productdetails} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}/>
        </Stack.Navigator>
    );
}

export  {FisrstNavigator};

const SecondNavigator=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home} options={{
             headerStyle: {
             backgroundColor: '#34A2DA',
                },
                headerTintColor: 'white',
                
                }}/>
        </Stack.Navigator>
    );
}
export {SecondNavigator};

const ThirdNavigator=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Auctions" component={Auctions} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}/>
            <Stack.Screen name="Auction details" component={Auctiondetails} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}/>
        </Stack.Navigator>
    );
}
export {ThirdNavigator};


const FourthNavigator=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Products" component={Products} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}/>
            <Stack.Screen name="Product details" component={productdetails} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}/>
        </Stack.Navigator>
    );
}
export {FourthNavigator};


const FifthNavigator=()=>{
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="SignUp" component={Signup}/>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    );
}
export {FifthNavigator};


//Start Authentication Code
const signoutNavigator=()=>{
  return(
      <Stack.Navigator headerMode="none">
          <Stack.Screen name="Signout" component={Logout}/>
          <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
  );
}
export {signoutNavigator};
//End Authentication Code

const ProfileStack=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Welcome} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}>

 </Stack.Screen>
      <Stack.Screen name="Auction details" component={Auctiondetails} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}>
 </Stack.Screen>

 <Stack.Screen name="Product details" component={productdetails} options={{
   
   headerStyle: {
     backgroundColor: '#34A2DA',
   },
   headerTintColor: 'white',
   
 }}>
 </Stack.Screen>
  </Stack.Navigator>
  );
}
export {ProfileStack};



