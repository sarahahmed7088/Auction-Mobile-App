import React, { useState,useContext,useEffect } from 'react';
import { SafeAreaView,ScrollView,View,StyleSheet,Text, Image, Pressable} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Box } from 'native-base';
import {

  VStack,
  Spinner,
  HStack,

} from "native-base";
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import { useNavigation } from "@react-navigation/native";
import CardProduct from '../shared/card-product';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Home({navigation}){

  const nav = useNavigation();
    const insets = useSafeAreaInsets();
    const [isloading,setIsLoading]=useState(true);

    //Start get Live Auctions
    const [liveAuctions,setAuctionStatus]=useState([]);
    const [nextAuction,setNextAuction]=useState();
    useEffect(() => {
        axios
          .get("https://iti-alauno.vercel.app/api/auctions")
          .then((response) => response.data)
          .then((response) => {
            let newLiveAuctions = response.data.filter(a => {
                return new Date(a.start_date) < new Date() && new Date(a.end_date) > new Date();  
            })
            let newNextAuctions = response.data.filter(a => {
                return new Date(a.start_date) > new Date()  
            })
            setAuctionStatus(newLiveAuctions.slice(0, 3))
            setNextAuction(newNextAuctions.slice(0, 3))
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      }, [navigation]);
     //End get Live Auctions
      
     //product data
      const [myProduct,setMyProduct]=useState([]); 
     useEffect(()=>{
      axios.get("https://iti-alauno.vercel.app/api/products")
      .then(async(response)=>{
        let x = await response.data;
        let res=await x.data;
        setMyProduct(res);
      })
      .catch((error)=>console.log(error));
     },[]);
   

    return(
        <>
    <StatusBar style="light" />
    <NativeBaseProvider>
    <View style={{ flex: 1,paddingTop: insets.top,paddingBottom: insets.bottom,backgroundColor:'white'}}>
    <SafeAreaView style={{flex: 1}}>
         
    <ScrollView
      flex={1} 
      _contentContainerStyle={{
        w: "100%",
   
      }} 
    >
  
        <Text style={{color:'#34A2DA',fontWeight:'bold',fontSize:23,marginTop:20,marginLeft:20}}>Happening Now...</Text>
          <View style={styles.contain}>
              <Image source={require('../assets/icons/auction-live-icon.png')} resizeMode="contain" />
              <Text style={styles.txt}>Live Auctions</Text>       
           </View>


           {isloading?(

          <HStack space={3}style={{  
            marginTop:150,
          flex: 1,
          padding:10,
          justifyContent: 'center',
          alignItems:'center',
          alignContent:'center'}}
          >
          <Spinner color="#34A2DA" size="lg" style={{flex: 1,alignSelf:'center'}}/>
          </HStack>

          ):(
     
        <VStack style={{marginTop:30}} >
          <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
        {liveAuctions.map((item,index) => (
        <View style={{marginBottom:10,marginTop:10}} key={index}>
          <Pressable onPress={() =>  nav.navigate("Auction details", { item })}>
          <ImagedCarouselCard
               style={styles.cardAuct}
              text={item.title}
              source={{
                uri: `${item.images[0]}`,
            }}
            
            />
            </Pressable>
        {/* <CardAuction item={item} /> */}
        </View>
         
        ))}
        </ScrollView>
    </VStack>
          )}
         <View style={styles.containProduct}>
           <Text style={styles.txt}>
              <FontAwesome5 name="store" size={30} color="#34A2DA" />
              <Text style={{marginHorizontal:10}}>Shop Now</Text>
              </Text>
         {myProduct.map((item,index) => (
                             <View style={{marginVertical:15,}} key={index}>
                              <CardProduct item={item}/>
                              </View>
                              ))}
         </View>
   </ScrollView>
     </SafeAreaView>
       
    </View>
    </NativeBaseProvider>
    </>
     );
 
}

const styles = StyleSheet.create({

    txt:{
        fontWeight:'bold',
        fontSize:23,
        
    },
    contain:{
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingHorizontal:20,
        marginTop:35
        
    },
    containProduct:{
      flexDirection:'column',
      justifyContent:'center',
      paddingHorizontal:20,
      marginTop:35
    },
    cardAuct:{
      width: 300,
      height: 300,
      borderRadius: 16,
      shadowColor: "#666666",
      marginLeft:16,
      shadowColor:"#051934",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 7
    }
});

    