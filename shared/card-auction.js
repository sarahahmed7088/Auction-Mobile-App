import React,{useState,useReducer,useEffect} from 'react';

import { VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
  AspectRatio, Center, Box, Stack, Heading,View,Button } from "native-base";
import { useNavigation } from "@react-navigation/native";


const CardAuction = ({item,typeAuction}) => {
  
  const nav = useNavigation();
  const [timing, setTiming] = useReducer(
    (oldState, updates) => ({ ...oldState, ...updates }),
    {
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
    }
  );

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


  useEffect(() => {
    const timer = setInterval(() => {
      let delta = 0;
      if (typeAuction === "Schedule") {
        delta = Math.abs(Date.parse(item.start_date) - Date.now()) / 1000;
      }
      else if(typeAuction==='Expired'){
          setTiming(    {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
          });
      }
      else {
        delta = Math.abs(Date.parse(item.end_date) - Date.now()) / 1000;
      }
      let days = Math.floor(delta / 86400);
      delta -= days * 86400;
      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      let seconds = delta % 60;
      setTiming({ days, hours, minutes, seconds: Math.floor(seconds) });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [item.end_date, item.start_date, typeAuction]);


  return (
    <NativeBaseProvider>
    <Center flex={1}>
    <Box
    bg="white"
    shadow={2}
    rounded="lg"
    borderColor="#666666"
    borderWidth={0.3}
    width="80%"
 
  >
    <Image source={{
                      uri: `${item.images[0]}`,
                  }} alt="image base" resizeMode="cover" height={170} roundedTop="md" />
    
    <Stack space={4} p={[4, 4, 8]}>
      <View style={{flexDirection:'row'}}>
      <Text color="gray.400" marginLeft="3">Days: {timing.days}</Text>
      <Text color="gray.400" marginLeft="3">Hours: {timing.hours}</Text>
      <Text color="gray.400" marginLeft="3">Minutes: {timing.minutes}</Text>
      </View>
      <Heading size={["md", "lg", "md"]} noOfLines={2}>
        {item.title}
      </Heading>
      <Button style={{backgroundColor: "#34A2DA",width:100,marginLeft:190}} onPress={() =>  nav.navigate("Auction details", { item })}>Details</Button>
    
    </Stack>
    </Box>
  </Center>
  </NativeBaseProvider>
  );
};

export default CardAuction;
