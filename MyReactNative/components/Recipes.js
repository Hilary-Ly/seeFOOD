import * as React from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { connect } from 'react-redux';

export function Recipes (props) {
    const { recipes } = props
     const extractKey = ({ id }) => id;
     const renderItem = ({ item }) => {
        return <Text style={styles.row}>{item.title}</Text>;
     };
     return (
        <View style={styles.container}>
           <FlatList
              style={styles.container}
              data={recipes}
              renderItem={renderItem}
              keyExtractor={extractKey}
           />
        </View>
     );
}

const mapState = state => {
   return {
      recipes: state.recipes
   };
};

export default connect(mapState)(Recipes);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      marginBottom: 10,
      textAlign: 'center'
   },
   row: {
      padding: 15,
      marginBottom: 5,
      backgroundColor: 'skyblue'
   },
   flatlist: {
      backgroundColor: '#fff',
      marginBottom: 90,
      textAlign: 'center'
   },
   ingredientsText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)'
   },
   item: {
      padding: 15,
      marginTop: 5,
      marginBottom: 5,
      marginHorizontal: 30,
      justifyContent: 'space-between',
      flexDirection: 'row'
   }
});