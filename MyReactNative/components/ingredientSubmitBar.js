import * as React from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { submitIngredientsThunk } from '../redux/reducers'

export function SubmitBar(props) {
   // console.log('submit bar props', props)
   const handleSubmit = async () => {
      const { selected, submitIngredientsThunk } = props
      let selectionArr = []
      selected.forEach((value, key) => {
         if (value === true) selectionArr.push(key)
      })
      const selectionStr = selectionArr.join(',')
      console.log('selectionStr', selectionStr);
      submitIngredientsThunk(selectionStr)
   }
   return (
      <View style={styles.tabBarInfoContainer}>
         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Find recipes</Text>
         </TouchableOpacity>
      </View>
   );
}

const mapDispatch = dispatch => {
   return {
      submitIngredientsThunk: ingredientsStr => dispatch(submitIngredientsThunk(ingredientsStr))
   }
}

export default connect(null, mapDispatch)(SubmitBar)

const styles = StyleSheet.create({
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
      paddingBottom: 15
   },
});
