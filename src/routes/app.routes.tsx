import {createNativeStackNavigator} from '@react-navigation/native-stack'

import { Home } from "../screens/Home";
import { Feed } from '../screens/Feed'

import { Details } from "../screens/Details";
import { Register } from "../screens/Register";
import { User } from '../screens/User';
import { DetailsFeed } from '../screens/DetailsFeed';

const { Navigator, Screen} = createNativeStackNavigator()

export function AppRoutes(){

  return(
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen name="feed" component={Feed} />
      <Screen name="feedDetails" component={DetailsFeed} />
      <Screen name="user" component={User} />
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
    </Navigator>

  )
}
