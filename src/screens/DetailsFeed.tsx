import React from 'react';
import { useState, useEffect } from 'react';
import { HStack, Image, VStack, FlatList, Text, Row } from 'native-base';


import {   useRoute } from '@react-navigation/native';

import { Loading } from '../components/Loading';
import { HeaderFeed } from '../components/headerFeed';
import { FooterBar } from '../components/FooterBar';
import { Header } from '../components/Header';


export function DetailsFeed() {
  const [feed, setFeed ] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  
 
  const route = useRoute()
  const { feedId } = route.params
  
   
    
 async function carregarfeed(feedId, shouldRefresh= false)  {
  setLoading(true)
  const response = await fetch(`http://localhost:3000/feed?id=${feedId}&_expand=author`)
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

    
      return (
      <VStack flex={1} bg="gray.100">
      <Header
      title="Detalhe do Feed"/>

      <HStack
      flex={1}
      >
      <FlatList
      data={feed}
      keyExtractor={post => String(post.id)}
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
          
          <Image 
          style={{width: 500, height: 400}}
          
          alt="imagem"
          source={{ uri : item.image }} />
          
          
          <Text
          style={{padding: 10, lineHeight:18}}
          >
            
          {item.author.name} {": "}
          {item.description}
                           
          </Text>

        </VStack>
        )}
     
      />
      </HStack>
      
      <FooterBar/>
        
     
      
    </VStack>
  );
    
}