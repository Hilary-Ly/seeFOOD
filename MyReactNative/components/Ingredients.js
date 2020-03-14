import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

export function Ingredients(props) {
   console.log('props.ingredients', props.ingredients);
   const {ingredients} = props
   return (
      <ScrollView
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
      >
         <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Ingredients</Text>
            {ingredients.map(ingredient => {
               return (
                  <Text style={styles.getStartedText}>{ingredient.name}</Text>
               );
            })}
         </View>
      </ScrollView>
   );
}

const mapState = state => {
    return {
        ingredients: state
    }
}

export default connect(mapState)(Ingredients);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff'
   },
   contentContainer: {
      paddingTop: 5
   },
   uploadButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20
   },
   getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50
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
