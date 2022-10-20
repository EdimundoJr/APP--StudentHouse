import React from 'react';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { HStack,IconButton, VStack, useTheme, Image, FlatList, Text, Row,Center } from 'native-base';
import { useNavigation,  useRoute } from '@react-navigation/native';
import {  SignOut, ArrowLeft, UserCircle, CurrencyDollar } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_feed.svg';
import LogoButton from '../assets/logo_buttom.svg';
import { Loading } from '../components/Loading';

export function DetailsFeed() {
  const [feed, setFeed ] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const { colors } = useTheme()
  const navigation = useNavigation();
  const route = useRoute()
  const { feedId } = route.params
  
 

   

  function handlePayment() {
    navigation.navigate('home')
  }

  function handleRefresh() {
    navigation.navigate('feed')
  }

  function handleUser() {
    navigation.navigate('user')
  }
  function handleGoBack() {
    navigation.goBack()
  }
    
 async function carregarfeed(feedId, shouldRefresh= false)  {
  setLoading(true)
  const response = await fetch(`http://localhost:3000/feed?id=${feedId}`)
  const data = await response.json()
  setFeed(shouldRefresh ? data : [...feed, ...data])

  setLoading(false)
}

useEffect(()=>{
      
  refreshList()
 },[])

 async function refreshList(){
  setRefreshing(true)
  await carregarfeed(feedId, true)
  setRefreshing(false)
}
function handleLogout() {
  auth()
    .signOut()
    .catch(error => {
      console.log(error);
      return Alert.alert('Sair', 'Não foi possível sair.');
    });
}

    
      return (
        <VStack flex={1} bg="gray.100">
     <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <IconButton
          icon={<ArrowLeft
            weight="thin"
            size={26} 
            color={colors.gray[300]}
            />}
           onPress={handleGoBack}
        />
        <Logo 
        />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>
      <HStack
      >
      <Text
      >{feedId}</Text>
      </HStack>
      
      
        
      <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"           
      bg="gray.600"
      borderTopRadius={10}
      
      px={6}
      
      >
        <IconButton
          icon={<UserCircle
            weight="thin"
            size={36} 
            color={colors.gray[300]}
            />}
           onPress={handleUser}
        />
        <IconButton
          icon={<LogoButton
            onPress={handleRefresh}
            width={40}
            height={40}
          />}
    
          
        />
        
        <IconButton
          icon={<CurrencyDollar
            weight="thin"
            size={36} 
            color={colors.gray[300]}
            
            />}
         onPress={handlePayment}
          
        />
        

        

      </HStack>
      
    </VStack>
  );
    
  };

 



