import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import axios from 'axios'

export default function HomeScreen() {

   const handlePress1 = async () => {
      fetch('https://data.advance88.hasura-app.io/v1/query', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            type: 'select',
            args: {
               table: 'author',
               columns: ['name'],
               limit: '1'
            }
         })
      })
         .then(response => response.json())
         .then(responseJson => {
            Alert.alert('Author name at 0th index:  ' + responseJson[0].name);
         })
         .catch(error => {
            console.error(error);
         });
   };
     const handlePress = async () => {

           const data = await axios.get(
              'http://127.0.0.1:3000/api/products/'
           );
           console.log(data)
        
         //   headers: {
         //      'Content-Type': 'application/json'
         //   }
         //   body: JSON.stringify({
         //      type: 'select',
         //      args: {
         //         table: 'author',
         //         columns: ['name'],
         //         limit: '1'
         //      }
         //   })
        
         //   .then(response => response.json())
         //   .then(responseJson => {
         //      alert('Author name at 0th index:  ' + responseJson);
         //   })
         //   .catch(error => {
         //      console.error(error);
         //   });
     };

   let [selectedImage, setSelectedImage] = React.useState(null);
   let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      if (permissionResult.granted === false) {
         alert('Permission to access camera roll is required!');
         return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
         return;
      }
      setSelectedImage({ localUri: pickerResult.uri });
   };

   let openShareDialogAsync = async () => {
      if (!(await Sharing.isAvailableAsync())) {
         alert(`Uh oh, sharing isn't available on your platform`);
         return;
      }

      Sharing.shareAsync(selectedImage.localUri);
   };

   if (selectedImage !== null) {
      return (
         <View style={styles.container}>
            <View style={styles.welcomeContainer}>
               <Image
                  source={{ uri: selectedImage.localUri }}
                  style={styles.thumbnail}
               />

               <TouchableOpacity
                  onPress={openShareDialogAsync}
                  style={styles.button}
               >
                  <Text style={styles.buttonText}>Share this photo</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
   return (
      <View style={styles.container}>
         <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
         >
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
            <View style={styles.getStartedContainer}>
               <Text style={styles.getStartedText}>
                  To share a photo from your phone with a friend, just press the
                  button below!
               </Text>

               <TouchableOpacity
                  // onPress={openImagePickerAsync}
                  onPress={handlePress}
                  style={styles.button}
               >
                  <Text style={styles.buttonText}>Pick a photo</Text>
               </TouchableOpacity>
            </View>

            <DevelopmentModeNotice />

            <View style={styles.helpContainer}>
               <TouchableOpacity
                  onPress={handleHelpPress}
                  style={styles.helpLink}
               >
                  <Text style={styles.helpLinkText}>
                     Help, it didn’t automatically reload!
                  </Text>
               </TouchableOpacity>
            </View>
         </ScrollView>

         <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>
               This is a tab bar. You can edit it in:
            </Text>

            <View
               style={[
                  styles.codeHighlightContainer,
                  styles.navigationFilename
               ]}
            >
               <MonoText style={styles.codeHighlightText}>
                  navigation/BottomTabNavigator.js
               </MonoText>
            </View>
         </View>
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
   contentContainer: {
      paddingTop: 30
   },
   welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20
   },
   welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10
   },
   getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50
   },
   homeScreenFilename: {
      marginVertical: 7
   },
   codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)'
   },
   codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4
   },
   getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center'
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
   },
   button: {
      backgroundColor: 'grey',
      padding: 20,
      borderRadius: 5
   },
   buttonText: {
      fontSize: 20,
      color: '#fff'
   },
   thumbnail: {
      width: 300,
      height: 300,
      resizeMode: 'contain'
   }
});
