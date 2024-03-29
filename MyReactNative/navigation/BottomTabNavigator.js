import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
   // Set the header title on the parent stack navigator depending on the
   // currently active tab. Learn more in the documentation:
   // https://reactnavigation.org/docs/en/screen-options-resolution.html

   // i think navigation is how you get around the tabs (the button/link)
   navigation.setOptions({ headerTitle: getHeaderTitle(route) });

   return (
      <BottomTab.Navigator initialRouteName={HomeScreen}>
         <BottomTab.Screen
            name='Home'
            component={HomeScreen}
            options={{
               title: 'Home',
               tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} name='md-restaurant' />
               )
            }}
         />
         <BottomTab.Screen
            name='Links'
            component={LinksScreen}
            options={{
               title: 'Credits',
               tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} name='md-book' />
               )
            }}
         />
      </BottomTab.Navigator>
   );
}

function getHeaderTitle(route) {
   const routeName =
      route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

   switch (routeName) {
      case 'Home':
         return 'Analyze';
      case 'Links':
         return 'Credits';
   }
}
