import * as React from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { webScraperThunk } from '../redux/reducers'

export function Recipes(props) {
   const [selectedLink, setLink] = React.useState(null);
   const [selectedTitle, setTitle] = React.useState(null);
   
   const { recipes, navigation, webScraperThunk } = props;

   const handleSubmit = async () => {
       // need to move this to reducers later..
      const quantifiedIngredients = await axios.post(
         `http://192.168.1.151:8081/scrape/?url=${selectedLink}`
      );
      const ingredientsArr = quantifiedIngredients.data
    await webScraperThunk(ingredientsArr)
    await navigation.navigate('OneRecipe');
   };

   const extractKey = ({ href }) => href;
   const renderItem = ({ item }) => {
      return (
         <View key={item.href}>
            <TouchableOpacity
            keyExtractor={extractKey}
               style={styles.item}
               onPress={() => {
                  setLink(item.href)
                  setTitle(item.title)
                  handleSubmit()
               }}
            >
               <Text style={styles.itemName}>{item.title.trim()}</Text>
               <Text style={styles.itemText}>({item.ingredients})</Text>
               <Text style={styles.itemName}>({item.href})</Text>
            </TouchableOpacity>
         </View>
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

const mapDispatch = dispatch => ({
   webScraperThunk: (url) => {
      dispatch(webScraperThunk(url));
   }
});

export default connect(mapState, mapDispatch)(Recipes);

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
   item: {
      margin: 15,
      marginVertical: 5,
      marginHorizontal: 30
   }
});
