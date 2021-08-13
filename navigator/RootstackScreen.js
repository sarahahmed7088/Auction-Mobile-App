import React,{useState, useContext} from 'react';

//colors
import { Colors } from '../components/styles';
const { darkLight, brand, primary, tertiary, secondary } = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/home';
import Welcome from '../screens/Welcome';

//icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//custom Navigation
import {FisrstNavigator,ThirdNavigator,FourthNavigator,ProfileStack} from '../customNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';



const RootStack = () => {
  const {storedCredentials, setStoredCredentials} =useContext(CredentialsContext);
  // alert(storedCredentials);
  return (
    <CredentialsContext.Consumer>
      {() => (
        <NavigationContainer style={{ backgroundColor: 'red' }}>
         
            {storedCredentials ? (

              <Tab.Navigator>
                        <Tab.Screen name="Home"
                            component={FisrstNavigator}
                            options={{
                              tabBarIcon: ({ color }) => (
                                <FontAwesome5 name="home" size={24} color={color} />
                              ),
                            }}/>
                  
                            <Tab.Screen name="Auctions"
                            component={ThirdNavigator}
                            options={{
                              tabBarIcon: ({ color }) => (
                                <FontAwesome5 name="hammer" size={24} color={color} />
                              ),
                            }}/>
                            <Tab.Screen name="Products"
                            component={FourthNavigator}
                            options={{
                              tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="shopping" size={24} color={color} />
                              ),
                            }}
                          />
                           <Tab.Screen
                            name="Profile"
                            component={ProfileStack}
                            options={{
                              tabBarIcon: ({ color }) => (
                                <FontAwesome5 name="user-alt" size={24} color={color} />
                              ),
                            }}
                          />
                        </Tab.Navigator>
                   
            ) : (
              <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: 'transparent',
                },
                headerTintColor: tertiary,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                  paddingLeft: 20,
                },
              }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={Signup} />
                <Stack.Screen name="Home" component={Home}/>
                </Stack.Navigator>
           
            )}
        
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
