import React, { useState,useEffect,useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TextInput,ScrollView, Alert } from "react-native";
import styles from "../styles/cards";
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Flex,
  Box,
Button,
  Center,
  Image,
  Stack,
  Text,
  Heading,
  NativeBaseProvider,
  Badge
} from "native-base";
import { Line } from "../components/styles";
import { FontAwesome } from '@expo/vector-icons';
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Auctiondetails() {

  const { storedCredentials, setStoredCredentials } =useContext(CredentialsContext);

  const { first_name, last_name, _id, email, profile_image,phone_number ,auctions_participant,wallet} =
    storedCredentials;

  const {params} = useRoute();
  const {item} = params
  const [auctionX,setAuctionX]=useState(item);
  const insets = useSafeAreaInsets();
  const [isPrice,setIsPrice]=useState(0);


  useEffect(()=>{
   if(isPrice==0){
     if(auctionX.possible_winner.price){
     setIsPrice(auctionX.possible_winner.price);
   }
   else{
     setIsPrice(auctionX.start_price);
  }
   }

  },[]);
  const handlePayment=()=>{

  
      const newParticipant = {
          userID: storedCredentials._id,
          name: `${storedCredentials.first_name} ${storedCredentials.last_name}`,
          price:isPrice,
          pay_date: Date.parse(new Date())
      }

      if(isPrice<=auctionX.possible_winner.price || isPrice<=auctionX.start_price){
        Alert.alert('Your bid should be more than the last auction price ! ');
        return false;

     }
      if((new Date() < new Date(auctionX.end_date))) {

      if(storedCredentials.money > isPrice ) {

              setAuctionX({ ...auctionX, participants: [newParticipant, ...auctionX.participants] })
            axios.put(`https://iti-alauno.vercel.app/api/auctions/${auctionX._id}`, 
              {  participants: [newParticipant, ...auctionX.participants],possible_winner:newParticipant })
              .then(async (response) => {
                  const data = await response.data;
                  await setAuctionX(data.data);
                  console.log("auction data changed");
                })
              .then(async ()=>{
                  const UserDataChnged = await {
                    auctions_participant: [...storedCredentials.auctions_participant, auctionX._id ],
                      wallet: {
                          balance:storedCredentials.balance, 
                          payments: storedCredentials.wallet.payments + 5
                      } 
                      
                  }
                 
                  axios.put(`https://iti-alauno.vercel.app/api/users/${storedCredentials._id}`,
                  {...UserDataChnged })
                  .then(async (res) => {
                      let data = await res.data;
                      setStoredCredentials(data.data);
                      if(data.success){
                        AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(data.data));
                        setStoredCredentials(data.data);

                      }
                  
                  })
              })
              .catch(error => console.log("err", error))
          }
       
      }
  }

  const dateFormat = (x) => {
    let today = new Date(x);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };



  return (
    <>
    <StatusBar style="light" />
    <NativeBaseProvider>
      <ScrollView>
    <Center flex={1}>
    <Box
    paddingTop="10"
    paddingBottom="10"
    rounded="lg"
    width="90%"
  >
    <Image source={{
    uri: `${auctionX.images[0]}`,
    }} alt="image base" resizeMode="cover" height={280} roundedTop="md" />
    
    <Stack space={4} p={[4, 4, 8]} >
    
      <Heading size={["md", "lg", "md"]} noOfLines={2}>
        {auctionX.title}
      </Heading>
    
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} fontWeight='bold' color="gray.700">
       Description : </Text> 
        {auctionX.descreption}
      </Text>
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} fontWeight='bold' color="gray.700">
       Price : </Text> 
       {auctionX.possible_winner.price || auctionX.start_price} EGP
      </Text>
      <View style={{flexDirection:'column'}}>
      <Text color="gray.400" marginLeft="3">Start Date:  {dateFormat(auctionX.start_date)}</Text>
      <Text color="gray.400" marginLeft="3">End Date:  {dateFormat(auctionX.end_date)}</Text>

      </View>
     
     {auctionX.owner!==storedCredentials._id && new Date()>new Date(auctionX.start_date) &&  new Date()<new Date(auctionX.end_date) &&
     
      <View style={{flexDirection:'row',justifyContent:'space-between',border:1,borderColor:'#666666',marginTop:20}}>
     
        <Button onPress={()=>setIsPrice(isPrice-auctionX.price_step)} style={{backgroundColor:'red',width:50}}>
         <Text style={{fontWeight:'bold',color:'white'}}>-</Text> 
          </Button>
        <TextInput onChangeText={()=>{}}        
       value={String(isPrice)}
       style={{
        width:200,
        marginHorizontal:10,
        height: 40,
        padding:5,
        borderRadius:5,
        backgroundColor:'#DCDCDC',
        }}
      />
        <Button onPress={()=>setIsPrice(isPrice+auctionX.price_step)} style={{backgroundColor:'#34A2DA',width:50}}>+</Button>
      </View>
}

{auctionX.owner!==storedCredentials._id && new Date()>new Date(auctionX.start_date) &&  new Date()<new Date(auctionX.end_date) &&


      <Badge style={{borderRadius:10,backgroundColor:'#ffc107',marginTop:20}}>
        <Text style={{color:'#043641',fontSize:14,paddingHorizontal:10}}>
        Five pounds will be deducted for participation in the auction
        </Text>
        </Badge>
}

{auctionX.owner!==storedCredentials._id && new Date()>new Date(auctionX.start_date) &&  new Date()<new Date(auctionX.end_date) &&

      <Button onPress={()=>handlePayment()} style={{backgroundColor:'#34A2DA'}}>Submit</Button>

     }

     { new Date()<new Date(auctionX.start_date) && <Badge colorScheme='info' style={{borderRadius:10,marginTop:20,padding:15}}>
         <Text style={{color:'black',fontSize:16,paddingHorizontal:10,}}>  Awaiting Auction</Text>
         <Line/>
        <Text style={{fontSize:16,paddingHorizontal:10,color:'#666'}}>
          A few hours left and the auction will start.Stay tuned!
        </Text>
        </Badge>}

      <Text style={{fontSize:18,fontWeight:'bold',marginTop:30}}>Last Bids</Text>

      {auctionX.participants.length!==0?(
       <View style={{width:'100%',flexDirection:'column'}}>
       {auctionX.participants.map((item,index) => (
         <View key={index}>
                             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                             
                              <Text><FontAwesome name="user" size={24} color="black" /> </Text>
                              <Text style={{textTransform:'capitalize',marginRight:110}}>{item.name}</Text>
                           
                              <Text>{item.price} EGP</Text>
                            </View>
                            <View style={{marginLeft:50}}>
                              <Text color="gray.400" >{dateFormat(item.pay_date)}</Text>
                            </View>
                            <Line/>
          </View>
                            ))}
     
       </View>
       ):(
         <View style={{flexDirection:'row'}}>
        <FontAwesome name="user-times" size={24} color="gray" />
       <Text color="gray.400" style={{marginLeft:10}} >No bids</Text>
       </View>
       )
       }
    </Stack>
    </Box>
  </Center>
  </ScrollView>
  </NativeBaseProvider>
  </>
  );

}

