import React from "react";
import { VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
  AspectRatio, Center, Box, Stack, Heading,View,Button } from "native-base";
  import { useNavigation } from "@react-navigation/native";

const CardProduct = ({item}) => {
 
  const nav = useNavigation();
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
   <View>
    <Image source={{
                      uri: `${item.images[0]}`,
                  }} alt="image base" resizeMode="cover" height={170} roundedTop="md" />
    
    <Stack space={4} p={[4, 4, 8]}>
     
      <Heading size={["md", "lg", "md"]} noOfLines={2}>
        {item.title}
      </Heading>
     
      <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
       Price: {item.price}
      </Text>
      <Button style={{backgroundColor: "#34A2DA",width:150,marginLeft:120}} onPress={() =>  nav.navigate("Product details", { item })}>View Details</Button>
      <View style={{flexDirection:'row'}}>
      <Text color="gray.400" marginLeft="3">Status: {item.status}</Text>

      </View>
    </Stack>
    </View>
    </Box>
  </Center>
  </NativeBaseProvider>
  );
};

export default CardProduct;
