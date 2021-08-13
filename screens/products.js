import React, { useState, useEffect,useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  View,
  ScrollView,
Text,
  TextInput,
  FlatList,

} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
// import SearchComponent from "../components/SearchComponent";
import styles from "../styles/cards";
import { NativeBaseProvider } from 'native-base';
import {
  Select,
  VStack,
  CheckIcon,
  Button,
  Spinner,
  HStack,
  Center
} from "native-base";
import CardProduct from "../shared/card-product";


export default function Products() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
 
  const [isloading,setIsLoading]=useState(true);

  const [products, setProduct] = useState([]);
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
      .get("https://iti-alauno.vercel.app/api/products")
      .then(async (response) => {
        let x = await response.data;
        let res=await x.data;
        setProduct(res);
        setFiltered(res);
        setIsLoading(false);
      
      })
      .catch((err) => console.log(err));
   
  }, []);

  const filter = (list) => {
    let { category, maxPrice,minPrice } = formInfo;

    if (category !== "") {
      list = list.filter(
        (p) => p.options.indexOf(formInfo.category) !== -1 && p
      );
    }
    if (minPrice !== "") {
      list = list.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== "") {
      list = list.filter((p) => p.price <= maxPrice);
    }

 

    return list;
  };

  const handleSearch = async () => {
    setFiltered([]);
    let list = await filter(products);
    if (list.length !== 0) setFiltered(list);
  };


  return (
    <>
    <StatusBar style="light" />
    <NativeBaseProvider>
  
      <SafeAreaView style={{flex:1}}>
      
          <View
            style={{
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

        <View style={{marginHorizontal:25,flexDirection:'row'}}>
        <TextInput
          style={{paddingVertical:10,paddingHorizontal:30,borderColor:'black',backgroundColor:'white',borderRadius:5,margin:10,fontSize:16}}
          onChangeText={(itemValue) => setFormInfo({minPrice:Number(itemValue)})}
          value={String(formInfo.minPrice)}
          placeholder="Enter min price"
          keyboardType="numeric"
        />

        <TextInput
          style={{paddingVertical:10,paddingHorizontal:30,borderColor:'black',backgroundColor:'white',borderRadius:5,margin:10,fontSize:16}}
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





     <VStack style={{marginTop:30}} >

        {isloading?(

          <HStack space={3}style={{  
            marginTop:100,
          flex: 1,
          padding:10,
          justifyContent: 'center',
          alignItems:'center',
          alignContent:'center'}}
          >
          <Spinner color="#34A2DA" size="lg" style={{flex: 1,alignSelf:'center'}}/>
          </HStack>

          ):[
            (filtered.length !=0 ?(

         filtered.map((item,index) => (
        <View style={{marginBottom:10,marginTop:10}} key={index}>
          <CardProduct item={item}  />
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
