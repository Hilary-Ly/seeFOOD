import * as React from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { connect } from 'react-redux';

export function Recipes(props) {
   const { recipes } = props;
   const extractKey = ({ id }) => id;
   const renderItem = ({ item }) => {
      return (
         <TouchableOpacity style={styles.item}>
            <Text style={styles.row}>{item.title.trim()}</Text>
         </TouchableOpacity>
      );
   };
   return (
      <View style={styles.container}>
         <Text style={styles.container}>
            Select a recipe for nutrional information
         </Text>
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
      backgroundColor: '#7F99A7',
      color: '#fff'
   },
   //    flatlist: {
   //       backgroundColor: '#fff',
   //       marginBottom: 90,
   //       textAlign: 'center'
   //    },
   item: {
      marginVertical: 5,
      marginHorizontal: 30
   }
});
