import { useState, useEffect } from 'react';
import { Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, View, Image, Text, Center } from 'native-base';
import { ArrowLeft, SignOut } from 'phosphor-react-native';


import Logo from '../assets/logo_feed.svg'


export function User() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [user, setUser] = useState({
    "id": 1,
    "name": "Edimundo_Jr",
    "avatar": "https://avatars0.githubusercontent.com/u/94170467"
  })


  function handleGoBack() {
    navigation.goBack();
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
     <VStack flex={1} pb={6} bg="gray.700">
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
      <Center>
      <View 
      marginTop={50}>
              <Image style={{width: 100, height: 100, borderRadius:50, marginRight:10}}
                     alt="avatar"
            source={{ uri: user.avatar }} />
            </View>
            <Text 
            color="gray.100"
            style={{ fontWeight:"bold", fontSize:20}}>{user.name}</Text>
      </Center>
    </VStack>
   
  );
}