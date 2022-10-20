import React from 'react';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import { HStack,IconButton, VStack, useTheme, Image, FlatList, Text, Row,Center } from 'native-base';
import {   TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {  SignOut, ArrowLeft, UserCircle, CurrencyDollar } from 'phosphor-react-native';



import Logo from '../assets/logo_feed.svg';

import LogoButton from '../assets/logo_buttom.svg';
import { Loading } from '../components/Loading';
import { NavigationEvents } from 'react-navigation';

export function Feed() {
  const [feed, setFeed ] = useState([])
  const [page, setPage ] = useState(1)
  const [total, setTotal ] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { colors } = useTheme()
  const navigation = useNavigation();


  function handlePayment() {
    navigation.navigate('home')
  }

  
  
  function handleUser() {
    navigation.navigate('user')
    
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error);
        return Alert.alert('Sair', 'Não foi possível sair.');
      });
  }
 
  async function loadPage(pageNumber = page, shouldRefresh= false) {
    if(total && pageNumber > total) return
    
    setLoading(true)

    const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`)

    const data = await response.json()
    const totalItens = response.headers.get(`X-Total-Count`)

    setTotal(Math.floor(totalItens / 5))
    setFeed(shouldRefresh ? data : [...feed, ...data])
    setPage(pageNumber + 1)
    setLoading(false)

  }

  useEffect(()=>{
      
   loadPage()
  },[])

  async function refreshList(){
    setRefreshing(true)
    await loadPage(1, true)
    setRefreshing(false)
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
        <></>         
         
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>
      
      <FlatList
      data={feed}
      keyExtractor={post => String(post.id)}
      onEndReached={()=> loadPage()}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Loading />}
      onRefresh={refreshList}
      refreshing={refreshing}
      renderItem={({ item }) => (
        
        <VStack marginTop={6}>
          <Row
          padding={2}
          alignItems="center"            
          >
            <Image      
            style={{width: 50, height: 50, borderRadius:25, marginRight:10}}
            
            alt="avatar"
            source={{ uri : item.author.avatar}}/>
            <Text
            style={{color:"#333", fontWeight:"bold", fontSize:20}}
            >{item.author.name}</Text>
           
          </Row>
          <TouchableOpacity 
          onPress={()=>
            
            navigation.navigate('feedDetails',{feedId: item.id})}
          >
          <Image 
          style={{width: 400, height: 400, borderBottomRightRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50, margin:5}}
          
          alt="imagem"
          source={{ uri : item.image }} />
          </TouchableOpacity>
          
          <Text
          style={{padding: 10, lineHeight:18}}
          >
            
          {item.author.name} {": "}
          {item.description}
                           
          </Text>

        </VStack>
        )}
     
      />
      
        
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
       <LogoButton
            
            width={40}
            height={40}
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
  
}



