import * as React from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios'

export function Recipes(props) {
    // console.log('props in recipes comp', props)
    const { recipes, navigation } = props;
    const handleSubmit = async () => {
        const url = 'http://www.food.com/recipe/creamy-tomato-sauce-for-pasta-233460'
        console.log('recipe component uses scrape', url)

        const quantifiedIngredients = await axios.post(
           `http://192.168.1.151:8081/scrape/?url=${url}`
        );
        console.log('web scraper reuslts quantifiedIngredients.data', quantifiedIngredients.data);

    }
   const extractKey = ({ id }) => id;
   const renderItem = ({ item }) => {
      return (
         <TouchableOpacity style={styles.item} key={item.href} onPress={handleSubmit}>
            <Text style={styles.itemName}>{item.title.trim()}</Text>
            <Text style={styles.itemText}>({item.ingredients})</Text>
            <Text style={styles.itemName}>({item.href})</Text>
         </TouchableOpacity>
      );
   };
   return (
      <View style={styles.container}>
         <Text style={styles.container}>
            Select a recipe below for nutrional information
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
   itemName: {
      padding: 5,
      backgroundColor: '#7F99A7',
      color: '#fff'
   },
   itemText: {
      padding: 5,
      backgroundColor: '#7F99A7',
      color: '#fff',
      fontStyle: 'italic'
   },
   //    flatlist: {
   //       backgroundColor: '#fff',
   //       marginBottom: 90,
   //       textAlign: 'center'
   //    },
   item: {
      margin: 15,
      marginVertical: 5,
      marginHorizontal: 30
   },
});
