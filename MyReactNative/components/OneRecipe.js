import * as React from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';

export function OneRecipe(props) {
   const { recipe } = props;

   console.log('recipe props', recipe);
   const listObj = []
   recipe.map((item, i) => {
       listObj.push({id: i, text: item})
   })
   console.log('listObj', listObj);
   const extractKey = ({ id }) => id;

const renderItem = ({ item }) => {
   return <Text style={styles.item}>{item.text}</Text>;
};

//    const lines = recipe.map(i => {
//        return (<Text>i</Text>)
//    })
//    function Item({ title }) {
//       return (
//          <View style={styles.item}>
//             <Text style={styles.title}>{title}</Text>
//          </View>
//       );
//    }

   return (
      <View style={styles.container}>
         <FlatList
            style={styles.container}
            data={listObj}
            renderItem={renderItem}
            keyExtractor={extractKey}
         />
      </View>
   );
}

const mapState = state => ({
   recipe: state.oneRecipe
});

export default connect(mapState)(OneRecipe);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      flex: 1
   },
   item: {
      margin: 15,
      marginVertical: 5,
      marginHorizontal: 30
   },
   itemName: {
      padding: 5,
      //   backgroundColor: '#7F99A7',
      color: '#fff'
   }
});
