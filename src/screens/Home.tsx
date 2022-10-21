import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { ArrowLeft, SignOut } from 'phosphor-react-native';

import { dateFormat } from '../utils/firestoreDateFormat';

import Logo from '../assets/logo_feed.svg'
import Logo2 from '../assets/Logo.svg'


import { Filtter } from '../components/Filtter';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';
import { FooterBar } from '../components/FooterBar';
import { HeaderFeed } from '../components/headerFeed';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

 
  
  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }



  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          }
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1}  bg="gray.700">
      <HeaderFeed/>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Contas 
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filtter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filtter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {
          isLoading ? <Loading /> :
            <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Center>
                  <Logo2 color={colors.gray[300]}  />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                    Você ainda não possui {'\n'}
                    contas  {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                  </Text>
                </Center>
              )}
            />
        }

        <Button title="Nova Conta" onPress={handleNewOrder} marginBottom={3}/>
      </VStack>
      <FooterBar/>
    </VStack>
    
  );
}