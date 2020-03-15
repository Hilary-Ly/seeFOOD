import * as React from 'react';
import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import SubmitBar from './ingredientSubmitBar';

export function Ingredients(props) {
   const [selected, setSelected] = React.useState(new Map());
   const { ingredients } = props;

   const extractKey = ({ id }) => id;
   function Item({ id, name, selected, onSelect }) {
      return (
         <TouchableOpacity
            onPress={() => onSelect(name)}
            style={[
               styles.item,
               { backgroundColor: selected ? '#BC9698' : '#F7CC8F' }
            ]}
         >
            <Text style={styles.ingredientsText}>{name}</Text>
            <Ionicons
               name={
                  selected
                     ? 'ios-remove-circle-outline'
                     : 'ios-add-circle-outline'
               }
               size={25}
               style={{ marginBottom: -7, marginTop: -5 }}
               color='#fff'
            />
         </TouchableOpacity>
      );
   }
   const onSelect = React.useCallback(
      name => {
         const newSelected = new Map(selected);
         newSelected.set(name, !selected.get(name));
         setSelected(newSelected);
      },
      [selected]
   );
   return (
      <View style={styles.container}>
         <Text style={styles.container}>Select ingredients</Text>
         <FlatList
            style={styles.flatlist}
            data={ingredients}
            renderItem={({ item }) => (
               <Item
                  id={item.id}
                  name={item.name}
                  selected={!!selected.get(item.name)}
                  onSelect={onSelect}
               />
            )}
            keyExtractor={extractKey}
            extraData={selected}
         />
         <SubmitBar selected={selected} />
      </View>
   );
}

const mapState = state => {
   return {
      ingredients: state.ingredients
   };
};

export default connect(mapState)(Ingredients);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      marginBottom: 10,
      textAlign: 'center'
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
