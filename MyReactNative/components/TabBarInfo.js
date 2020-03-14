import * as React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { MonoText } from '../components/StyledText';

export default function TabBarInfo() {
   return (
      <View style={styles.tabBarInfoContainer}>
         <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
         </Text>
         <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
               navigation/BottomTabNavigator.js
            </MonoText>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)'
   },
   codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4
   },
   tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
         ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3
         },
         android: {
            elevation: 20
         }
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20
   },
   tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center'
   },
   navigationFilename: {
      marginTop: 5
   }
});
