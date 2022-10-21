import React from 'react';
import { HStack, IconButton,  useTheme,  } from 'native-base';
import {   UserCircle, CurrencyDollar } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import LogoButton from '../assets/logo_buttom.svg';


export function FooterBar() {
  const navigation = useNavigation();
  const { colors } = useTheme()

  function handlePayment() {
    navigation.navigate('home')
  }

  function handleFeed() {
    navigation.navigate('feed')
  }

  function handleUser() {
    navigation.navigate('user')
  }
  
  return (
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
            onPress={handleFeed}
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
  );
}