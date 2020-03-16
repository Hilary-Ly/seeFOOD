import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Title () {
   return (
      <View style={styles.welcomeContainer}>
         <Image
            source={
               __DEV__
                  ? require('../assets/images/icons8-hamburger-64.png')
                  : require('../assets/images/icons8-hamburger-64.png')
            }
            style={styles.welcomeImage}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: '#fff'
   },
   welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10
   }
});
