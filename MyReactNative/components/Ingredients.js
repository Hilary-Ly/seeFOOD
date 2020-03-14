import * as React from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { connect } from 'react-redux';

export function Ingredients(props) {
   console.log('props.ingredients', props.ingredients);
   const { ingredients } = props;

   const rows = ingredients.map(ingredient => {
      return { id: ingredient.id, text: ingredient.name };
   });
   const extractKey = ({ id }) => id;

   const renderItem = ({ item }) => {
      return (
            <Text style={styles.row}>{item.text}</Text>
      );
   };
   return (
      <View style={styles.container}>
         <Text style={styles.ingredientsText}>Select ingredients</Text>
         <FlatList
            style={styles.container}
            data={rows}
            renderItem={renderItem}
            keyExtractor={extractKey}
         />
      </View>
   );
}

const mapState = state => {
   return {
      ingredients: state
   };
};

export default connect(mapState)(Ingredients);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      marginBottom: 10
   },
   row: {
      padding: 15,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 0,
      marginBottom: 10,
      backgroundColor: '#F7CC8F'
   },
   uploadButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   ingredientsText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
      marginBottom: 10
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
   }
});
