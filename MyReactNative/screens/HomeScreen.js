import * as React from 'react';
import {
   Image,
   Platform,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Title from '../components/Title';
import Upload from '../components/Upload';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ingredients from '../components/Ingredients';
import Recipes from '../components/Recipes';
import OneRecipe from '../components/OneRecipe';

export default function HomeScreen() {
   const Stack = createStackNavigator();

   return (
      <View style={styles.container}>
         <Title />
         <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Upload'>
               <Stack.Screen
                  name='Upload'
                  component={Upload}
                  options={{
                     headerShown: false,
                     cardStyle: { backgroundColor: 'transparent' }
                  }}
               />
               <Stack.Screen
                  name='Ingredients'
                  component={Ingredients}
                  options={{
                     headerShown: false,
                     cardStyle: { backgroundColor: 'transparent' }
                  }}
               />
               <Stack.Screen
                  name='Recipes'
                  component={Recipes}
                  options={{
                     headerShown: false,
                     cardStyle: { backgroundColor: 'transparent' }
                  }}
               />
               <Stack.Screen
                  name='OneRecipe'
                  component={OneRecipe}
                  options={{
                     headerShown: false,
                     cardStyle: { backgroundColor: 'transparent' }
                  }}
               />
            </Stack.Navigator>
         </NavigationContainer>
      </View>
   );
}

HomeScreen.navigationOptions = {
   header: null
};

function DevelopmentModeNotice() {
   if (__DEV__) {
      const learnMoreButton = (
         <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
            Learn more
         </Text>
      );

      return (
         <Text style={styles.developmentModeText}>
            Development mode is enabled: your app will be slower but you can use
            useful development tools. {learnMoreButton}
         </Text>
      );
   } else {
      return (
         <Text style={styles.developmentModeText}>
            You are not in development mode: your app will run at full speed.
         </Text>
      );
   }
}

function handleLearnMorePress() {
   WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/workflow/development-mode/'
   );
}

function handleHelpPress() {
   WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff'
   },
   developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center'
   },
   helpContainer: {
      marginTop: 15,
      alignItems: 'center'
   },
   helpLink: {
      paddingVertical: 15
   },
   helpLinkText: {
      fontSize: 14,
      color: '#2e78b7'
   }
});
