import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, FlatList,Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
//components

import axios from "axios";

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from "../components/styles";
import { NativeBaseProvider } from 'native-base';
import {
  Select,
  VStack,
  CheckIcon,
  Button,

} from "native-base";
// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


const Welcome = () => {
  
  const nav = useNavigation();
  // credentials context
  const { storedCredentials, setStoredCredentials } =useContext(CredentialsContext);

  const { first_name, last_name, _id, email, profile_image,phone_number ,auctions_participant,wallet} =
    storedCredentials;

    const [isInVisible, setIsInVisible] = useState(true);

    const toggleFunction = () => {
      setIsInVisible(!isInVisible);
    };
    const [isInvisibleAuct,setIsInVisibleAuct]=useState(true);

    const toggleAuctionFunction=()=>{
      setIsInVisibleAuct(!isInvisibleAuct);
    }
  
    const [isInvisibleProdcuct,setIsInvisibleProduct]=useState(true);

    const toggleProductsFunction=()=>{
      setIsInvisibleProduct(!isInvisibleProdcuct);
    }

  const clearLogin = () => {
    AsyncStorage.removeItem("flowerCribCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };
  

  //Start get userData
  const [userData, setUserData] = useState(storedCredentials);

//Auctions Owner
const [myAuction,setMyAuction]=useState([]);

//Auction data
const [auctionData, setAuctData] = useState([]);

//product data
const [myProduct,setMyProduct]=useState([]);

useEffect(() => {
  axios
    .get("https://iti-alauno.vercel.app/api/auctions")
    .then((response) => {
     return response.data;
     
    })
    .then((response) => {
      let list1=response.data.filter((a)=>userData.auctions_participant.includes(a._id));
      let list2=response.data.filter((a)=>userData._id===a.owner);

      return [list1,list2];
      // setAuctData(response.data);

    }).then((response)=> {
      setAuctData(response[0]);
      setMyAuction(response[1]);
    })
    .catch((err) => console.log(err));
    
    axios.get("https://iti-alauno.vercel.app/api/products")
    .then((response)=>{
      return response.data;
    })
    .then((response)=>{

      let list3=response.data.filter((a)=>userData._id===a.owner);
      return list3;
    }).then((response)=>{

        setMyProduct(response);

    }).catch((error)=>console.log(error));
}, []);



  return (
    <>
      <StatusBar style="light" />

      <NativeBaseProvider>
      <SafeAreaView style={{flex:1}}>
      <ScrollView
      flex={1}
      px={90}
      _contentContainerStyle={{

        w: "100%",
      }} 
    >
        <InnerContainer>
          {/* <WelcomeImage resizeMode="cover" source={require('./../assets/img/expo-bg2.png')} /> */}

          <View style={styles.containerimg}>
        
        <View style={{width:130,height:130,borderRadius:70,overflow:'hidden'}}>
          {profile_image ?(
            <Image source={{ 
                 uri: `${profile_image}`
                }}
                 resizeMode={"cover"}
                 style={{width:130,height:130,borderRadius:70}}
                   />
                   ):(
                     <View style={{width:130,height:130,borderColor:'#34A2DA',borderWidth:2,borderRadius:70,textAlign:'center'}}>
                         <Text style={{marginTop:35,marginLeft:30,fontSize:40,fontWeight:'bold',color:'#043641'}}>
                           {first_name.charAt(0).toUpperCase()}
                           {last_name.charAt(0).toUpperCase()}
                           </Text>
                     </View>
                   )}
        </View>
            
          <View style={{marginBottom:13}}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 20,
                textTransform: "capitalize",
              }}
              welcome={true}
            >
              {first_name?first_name+" ": "Olga Simpson"}
              { last_name?last_name: "Olga Simpson"}
            </Text>
            </View>

          <View>

            <View style={{alignContent:'center',flexDirection:'row',}}>
            <MaterialIcons name="email" size={24} color="black" />
            <Text style={{fontSize:16,marginLeft:7}}> {email}</Text>
            </View>

            <View style={{alignContent:'center',flexDirection:'row',marginTop:7}}>
            <MaterialIcons name="phone" size={24} color="black" />
            <Text style={{fontSize:16,marginLeft:7}}> {phone_number?phone_number:(
              <Text style={{fontSize:16,marginLeft:7}}>Not found</Text>
            )}
            </Text>
            </View>

            </View>

            {/* Start User Payment Data */}
       
               <View style={styles.cardContainer}>
                <Card style={styles.cardstyling}>
                  <FontAwesome5
                    name="shopping-bag"
                    size={24}
                    color="#666666"
                    style={{ textAlign: "center" }}
                  />
                  <Text style={styles.cardText}>Payments</Text>
                  <Text style={styles.cardInfo}>
                    {wallet.payments} EGP
                  </Text>
                </Card>
                <Card style={styles.cardstyling}>
                  <FontAwesome5
                    name="money-check-alt"
                    size={24}
                    color="#666666"
                    style={{ textAlign: "center" }}
                  />
                  <Text style={styles.cardText}>Balance</Text>
                  <Text style={styles.cardInfo}>
                    {wallet.balance} EGP
                  </Text>
                </Card>
            
              </View> 
          
            {/* End User Payment Data */}
          </View>
      
      
          <WelcomeContainer>
            <StyledFormArea>
                
         
                <VStack>
                 
                 <Pressable onPress={toggleFunction}>
                 <View style={{flexDirection:'row',paddingTop:10,width:'100%',backgroundColor:'white',padding:10,borderRadius:10,marginVertical:10}}>
                 <MaterialCommunityIcons name="offer" size={24} color="#34A2DA" />

                  <Text style={{marginTop:3,fontSize:16,fontWeight:'bold',marginLeft:10}}>
                     My Bid
                    </Text>
                  <Text style={{marginLeft:210}}><MaterialIcons name={isInVisible? 'keyboard-arrow-right':'keyboard-arrow-down'} size={24} color="black" /></Text> 
                  </View>
                 </Pressable>
                 
               
                    <View style={isInVisible ? styles.invisible : styles.visible}>
                    {auctions_participant.length !=0?(
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {auctionData.map((item,index) => (
                      <Card  style={styles.participatingCard} key={index}  onPress={() =>  nav.navigate("Auction details", { item })}>
                       <Text style={styles.participateText}>
                         {item.title}
                        </Text>
                      </Card>
                      ))}
                      </ScrollView>
                    ):(
                      <Text style={isInVisible? styles.invisible:styles.visibleText}> You are not participating in any auctions, browse Ala-uno to
                           find and bid on interesting auctions.</Text>
                    )}
                    </View> 
               </VStack> 
               <Line/>
         
                 {/* )} */}
                 <VStack>

                    <Pressable onPress={toggleAuctionFunction}>
                      <View style={{flexDirection:'row',paddingTop:10,width:'100%',backgroundColor:'white',padding:10,borderRadius:10,marginVertical:10}}>
                      <FontAwesome5 name="hammer" size={24} color="#34A2DA" />

                      <Text style={{marginTop:3,fontSize:16,fontWeight:'bold',marginLeft:10}}>
                          My Auctions
                        </Text>
                      <Text style={{marginLeft:170}}><MaterialIcons name={isInvisibleAuct? 'keyboard-arrow-right':'keyboard-arrow-down'} size={24} color="black" /></Text> 
                      </View>
                      </Pressable>
                        
                        {
                          myAuction.length !== 0 ?
                          <View style={isInvisibleAuct ? styles.invisible : styles.visible}>
                          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                          {myAuction.map((item,index) => (
                            <Card  style={styles.participatingCard} key={index}  onPress={() =>  nav.navigate("Auction details", { item })}>
                              <Text style={styles.participateText}>
                                {item.title}
                              </Text>
                            </Card>
                            ))}
                            </ScrollView>
                          </View> 
                          : <Text style={isInvisibleAuct?styles.invisible:styles.visibleText}>You have no auctions !</Text>
                        } 

                  </VStack> 
                  <Line/>

                    {/* My  Product  */}
                    <VStack>

                      <Pressable onPress={toggleProductsFunction}>
                        <View style={{flexDirection:'row',paddingTop:10,width:'100%',backgroundColor:'white',padding:10,borderRadius:10,marginVertical:10}}>
                        <FontAwesome5 name="store" size={24} color="#34A2DA" />
        
                        <Text style={{marginTop:3,fontSize:16,fontWeight:'bold',marginLeft:10}}>
                            My Products
                          </Text>
                        <Text style={{marginLeft:170}}><MaterialIcons name={isInvisibleProdcuct? 'keyboard-arrow-right':'keyboard-arrow-down'} size={24} color="black" /></Text> 
                        </View>
                        </Pressable>
                          
                          {
                            myProduct.length !== 0 ?
                            <View style={isInvisibleProdcuct ? styles.invisible : styles.visible}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {myProduct.map((item,index) => (
                              <Card  style={styles.participatingCard} key={index}  onPress={() =>  nav.navigate("Product details", { item })}>
                                <Text style={styles.participateText}>
                                  {item.title}
                                </Text>
                              </Card>
                              ))}
                              </ScrollView>
                            </View> 
                            : <Text style={isInvisibleProdcuct?styles.invisible:styles.visibleText}>You have no products !</Text>
                          } 

                  </VStack> 
 
                  <Line/>
                
           

              <StyledButton onPress={clearLogin} style={styles.logoutbtn}>
                <ButtonText>Logout</ButtonText>
              </StyledButton>
            </StyledFormArea>
          </WelcomeContainer>
        </InnerContainer>
        </ScrollView>
      </SafeAreaView>
</NativeBaseProvider>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  logoutbtn: {
    marginTop: 40,
    marginHorizontal: 100,

    height: 40,
  },
  avatar: {
    marginTop: 50,
  },
  containerimg: {
    padding: 10,
    alignItems: "center",
    width:'100%',
    justifyContent: "center",

  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
  },
  cardstyling: {
    width: 132,
    paddingVertical: 30,
    margin: 5,
    backgroundColor: "white",
    color: "#34A2DA",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#34A2DA",
  },
  cardText: {
    fontWeight: "bold",
    textAlign:'center',
    color: "#666666",
    fontSize: 15,
  },
  cardInfo: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#34A2DA",
  },

  participatingCard:{
    marginLeft:10,
    marginVertical:10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width:200,
    height:50,
    overflow:'hidden',
    padding:10,
    borderRadius:20,
    backgroundColor:'#5CB4E1'

  },
  participateText:{
    textAlign: "center",
    fontWeight:'bold',
    fontSize: 15,
    color: 'white',
    
  },
  invisible:{
    display:'none'
  },
  visible:{
    flexDirection:'row'
  },
  visibleText:{
    fontSize: 15,
    color: "#666666",
    marginHorizontal:20
  }
});
