import * as React from 'react';
import {
   Image,
   Platform,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
// import * as ImagePicker from 'expo-image-picker';
// import * as Sharing from 'expo-sharing';
// import {getIngredientsThunk} from '../redux/reducers';
// import { connect } from 'react-redux';
import Title from '../components/Title';
import TabBarInfo from '../components/TabBarInfo';
import Upload from '../components/Upload';


export default function HomeScreen(props) {
   // console.log('props', props);
   // const handleSubmit = () => {
   //    const foodImageUrl = 'https://samples.clarifai.com/food.jpg';
   //    props.getIngredientsThunk(foodImageUrl);
   // };

   // let [selectedImage, setSelectedImage] = React.useState(null);
   // let openImagePickerAsync = async () => {
   //    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
   //    if (permissionResult.granted === false) {
   //       alert('Permission to access camera roll is required!');
   //       return;
   //    }

   //    let pickerResult = await ImagePicker.launchImageLibraryAsync();
   //    if (pickerResult.cancelled === true) {
   //       return;
   //    }
   //    setSelectedImage({ localUri: pickerResult.uri });
   // };

   
   
   // 
   // if (selectedImage !== null) {
   //    return (
   //       <View style={styles.container}>
   //          <View style={styles.welcomeContainer}>
   //             <Image
   //                source={{ uri: selectedImage.localUri }}
   //                style={styles.thumbnail}
   //             />

   //             <TouchableOpacity onPress={handleSubmit} style={styles.button}>
   //                <Text style={styles.buttonText}>Share this photo</Text>
   //             </TouchableOpacity>
   //          </View>
   //       </View>
   //    );
   // }




   return (
      <View style={styles.container}>
         <Title />
         {/* <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
         > */}

<Upload />
            {/* <View style={styles.getStartedContainer}>
               <Text style={styles.getStartedText}>
                  To share a photo from your phone with a friend, just press the
                  button below!
               </Text>

            </View>
            <View style={styles.getStartedContainer}>
               <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                  <Text style={styles.buttonText}>Pick a photo</Text>
               </TouchableOpacity>
            </View> */}


            <View style={styles.helpContainer}>
            <DevelopmentModeNotice />
               <TouchableOpacity
                  onPress={handleHelpPress}
                  style={styles.helpLink}
               >
                  <Text style={styles.helpLinkText}>
                     Help, it didn’t automatically reload!
                  </Text>
               </TouchableOpacity>
            </View>
         {/* </ScrollView> */}
         <TabBarInfo />
      </View>
   );
}

// const mapDispatch = dispatch => ({
//    getIngredientsThunk: foodImageUrl => {
//       dispatch(getIngredientsThunk(foodImageUrl));
//    }
// });

// export default connect(null, mapDispatch)(HomeScreen);

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
            Development mode is enabled: your app will be slower but you can use useful development tools. {learnMoreButton}
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
   // contentContainer: {
   //    paddingTop: 30
   // },
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
