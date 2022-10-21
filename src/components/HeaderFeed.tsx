import React from 'react';
import { Alert } from 'react-native';
import { HStack, IconButton, useTheme } from 'native-base';
import {  SignOut, ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_feed.svg';


export function HeaderFeed() {
  const { colors } = useTheme()
  const navigation = useNavigation();


  function handleGoBack() {
    navigation.goBack()
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
    <HStack
        
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
            color={colors.gray[600]}
            />}
           
        />
        <Logo 
        />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>
  );
}