import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getIngredientsThunk } from '../redux/reducers';
import { connect } from 'react-redux';

export function Upload(props) {
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

   const handleSubmit = () => {
      const foodImageUrl = 'https://samples.clarifai.com/food.jpg';
      props.getIngredientsThunk(foodImageUrl);
      props.navigation.navigate('Ingredients');
   };

   return (
      <View style={styles.getStartedContainer}>
         <Text style={styles.getStartedText}>
            Upload a photo of a meal or snack to start analyzing!
         </Text>

         {selectedImage !== null ? (
            <View style={styles.welcomeContainer}>
               <Image
                  source={{ uri: selectedImage.localUri }}
                  style={styles.thumbnail}
               />
               <View style={styles.uploadButtons}>
                  <TouchableOpacity
                     onPress={openImagePickerAsync}
                     style={styles.button}
                  >
                     <Text style={styles.buttonText}>Choose a new photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={handleSubmit}
                     style={styles.button}
                  >
                     <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
               </View>
            </View>
         ) : (
            <TouchableOpacity
               onPress={openImagePickerAsync}
               style={styles.button}
            >
               <Text style={styles.buttonText}>Choose a photo</Text>
            </TouchableOpacity>
         )}
      </View>
   );
}

const mapDispatch = dispatch => ({
   getIngredientsThunk: foodImageUrl => {
      dispatch(getIngredientsThunk(foodImageUrl));
   }
});

export default connect(null, mapDispatch)(Upload);

const styles = StyleSheet.create({
   uploadButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: '#fff'
   },
   getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
      backgroundColor: '#fff'
   },
   homeScreenFilename: {
      marginVertical: 7
   },
   getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center'
   },
   button: {
      backgroundColor: 'grey',
      padding: 20,
      margin: 10,
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
