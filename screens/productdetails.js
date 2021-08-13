import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView,View,SafeAreaView } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Box,
  Center,
  Image,
  Stack,
  Text,
  NativeBaseProvider,
  Badge,
  Divider,
  Flex,
  Heading,
} from "native-base";
import { useState } from "react/cjs/react.development";
import axios from "axios";


export default function productdetails() {
  const {params} = useRoute();
  const {item} = params

  const [productOwner,setProductOwner]=useState({});

  useEffect(()=>{
     axios.get(`https://iti-alauno.vercel.app/api/users/${item.owner}`)
     .then(async (response) => {
      let x = await response.data;
      let res=await x.data;
      setProductOwner(res);
          
     })
     .catch((err) => console.log(err));
  },[]);

  const insets = useSafeAreaInsets();
  return (
    <>
    <StatusBar style="light" />
    <NativeBaseProvider>
      <ScrollView>
    <Center flex={1}>
    <Box
    
    rounded="lg"
    width="90%"
    paddingBottom="10"
    paddingTop="10"
 
  >
   
    <Image source={{
                      uri: `${item.images[0]}`,
                  }} alt="image base" resizeMode="cover" height={280} roundedTop="md" />
    
    <Stack space={4} p={[4, 4, 8]} >
    
      <Heading size={["md", "lg", "md"]} noOfLines={2}>
        {item.title}
      </Heading>
    
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} fontWeight='bold' color="gray.700">
       Description : </Text> 
        {item.descreption}
      </Text>
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} fontWeight='bold' color="gray.700">
       Category : </Text> 
       {item.options}
      </Text>

      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} fontWeight='bold' color="gray.700">
       Price : </Text> 
       {item.price}
      </Text>
    
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} fontWeight='bold' color="gray.700">
       Status : </Text> 
       {item.status}
      </Text>
    </Stack>
    <View style={{paddingHorizontal:10,marginVertical:10}}>
     <Badge  style={{padding:10,borderRadius:10,backgroundColor:'#ffffff'}}>
       <Heading style={{fontSize:16,color:'#043641',paddingHorizontal:10}}>Contact owner</Heading>
       <Divider my={2} style={{backgroundColor:'#666666'}}/>
       <Box style={{marginTop:20}} >
    
       <Text mx="auto">{productOwner.first_name+" "} {productOwner.last_name}</Text>
       <Divider my={2} style={{backgroundColor:'#34A2DA',padding:1,width:200,alignSelf:'center'}}/>
          <Flex mx={3} direction="row" justify="space-evenly">
          <Text>{productOwner.email} </Text>
            <Divider orientation="vertical" style={{backgroundColor:'#34A2DA',padding:1}}/>
            <Text> {productOwner.phone_number} </Text>    
           </Flex>
           </Box>
       </Badge>
    </View>
    </Box>
  </Center>
  </ScrollView>
  </NativeBaseProvider>
  </>
  );
}
