import React, { useState, useEffect,useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Picker,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput
} from "react-native";
import axios from "axios";
import CardAuction from "../shared/card-auction";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/cards";
import { NativeBaseProvider, Box } from 'native-base';
import {
  Select,
  CheckIcon,
  Button,
  VStack,
  Spinner,
  HStack,

} from "native-base";
import { flex } from "styled-system";



export default function Auctions({ navigation }) {


  const insets = useSafeAreaInsets();
  const [isloading,setIsLoading]=useState(true);
 

  const [Auctions, setAuction] = useState([]);
  const [filtered,setFiltered]=useState([]);
  const [formInfo, setFormInfo] = useReducer(
    (oldState, updates) => ({ ...oldState, ...updates }),
    {
      category: "",
      minPrice: "",
      maxPrice: "",
    }
  );

  
  useEffect(() => {
    axios
      .get("https://iti-alauno.vercel.app/api/auctions")
      .then(async (response) => {
        let x = await response.data;
        let res=await x.data;
        res = await res.filter((d) => new Date() < new Date(d.end_date));
        setAuction(res);
        setFiltered(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

  }, []);


  const filter = (list) => {
    let { category, minPrice, maxPrice } = formInfo;

    if (category !== "") {
      list = list.filter(
        (p) => p.options.indexOf(formInfo.category) !== -1 && p
      );
    }

    if (minPrice !== "") {
      list = list.filter((p) => p.start_price >= minPrice);
    }

    if (maxPrice !== "") {
      list = list.filter((p) => p.start_price <= maxPrice);
    }

    return list;
  };

  const handleSearch = async () => {
    setFiltered([]);
    let list = await filter(Auctions);
    if (list.length !== 0) setFiltered(list);
  };



  return (
    <>
    <StatusBar style="light" />
    <NativeBaseProvider>
  <SafeAreaView style={{flex:1}}>
  <View style={{
              flex: 1,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            }}
          >
  <ScrollView
      flex={1}
      px={90}
      _contentContainerStyle={{

        w: "100%",
      }} 
    >
      <View style={{paddingHorizontal:20}}>
      <Select 
          selectedValue={formInfo.category}
          style={{backgroundColor: '#043641', margin: 10,color:'white',}}
          placeholderTextColor="white"
          accessibilityLabel="Select category"
          placeholder="Select category"
          onValueChange={(itemValue) => setFormInfo({category:itemValue})}
          _selectedItem={{
            bg: "#5CB4E1",
            endIcon: <CheckIcon size={4}/>,
          }}
        >
          <Select.Item label="Select Category" value="" />
          <Select.Item label="Cars" value="Cars" />
          <Select.Item label="Accessories" value="Accessories" />
          <Select.Item label="Clothes" value="Clothes" />
          <Select.Item label="Mobile" value="Mobile" />
          <Select.Item label="Electronic devices" value="Electronic devices" />

        </Select>
        </View>

      <View style={{marginHorizontal:25,flexDirection:'row',}}>
        <TextInput
          style={{paddingVertical:10,fontSize:16,paddingHorizontal: 30,borderColor:'black',backgroundColor:'white',borderRadius:5,margin:10,}}
          onChangeText={(itemValue) => setFormInfo({minPrice:Number(itemValue)})}
          value={String(formInfo.minPrice)}
          placeholder="Enter min price"
          keyboardType="numeric"
        />

      <TextInput
          style={{paddingVertical:10,fontSize:16,paddingHorizontal: 30,borderColor:'black',backgroundColor:'white',borderRadius:5,margin:10,}}
          onChangeText={(itemValue) => setFormInfo({maxPrice:Number(itemValue)})}
          value={String(formInfo.maxPrice)}
          placeholder="Enter max price"
          keyboardType="numeric"
        />
     </View>
      
      <View style={{justifyContent:'center',alignItems:'center'}}>
     <Button onPress={() => handleSearch()}
      style={{backgroundColor:'#043641',width:130,borderRadius:20,margin:10,}}>
        Search
     </Button>
     </View>
    
    {/* End select box */}
   
    <VStack style={{marginTop:30}} > 
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

          ):[(filtered.length !=0 ?(

            filtered.map((item,index) => (
            <View style={{marginBottom:10,marginTop:10}} key={index}>
            <CardAuction item={item}  typeAuction={new Date(item.start_date) < new Date() && new Date(item.end_date) > new Date() ? "Active" : new Date(item.start_date) > new Date() ? "Scheduled" : "Expired"}/>
            </View>
         
        ))
        ): (<Text style={{color:'#666666',textAlign:'center',fontSize:18,marginTop:100}}>Not Found</Text>)
        ),] 
      }  
    </VStack>

         
          </ScrollView>
          </View>
      </SafeAreaView>
   </NativeBaseProvider>
   </>
  );
}

