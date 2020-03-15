import axios from 'axios';
import '../secrets';

const GET_INGREDIENTS = 'GET_INGREDIENTS';
const SUBMIT_INGREDIENTS = 'SUBMIT_INGREDIENTS'

const getIngredients = ingredients => {
   return {
      type: GET_INGREDIENTS,
      ingredients
   };
};

const submitIngredients = recipes => {
    return {
        type: SUBMIT_INGREDIENTS,
        recipes
    }
}

export const getIngredientsThunk = foodImageUrl => {
    return async dispatch => {
      try {
         const options = {
            headers: {
               Authorization: process.env.CLARIFAI_API_KEY,
               'Content-Type': 'application/json'
            }
         };
         const { data } = await axios.post(
            'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
            {
               inputs: [
                  {
                     data: {
                        image: { url: foodImageUrl }
                     }
                  }
               ]
            },
            options
         );
         const possIngredients = data.outputs[0].data.concepts;
         dispatch(getIngredients(possIngredients));
      } catch (error) {
         console.error(error);
      }
   };
};

export const submitIngredientsThunk = ingredientsStr => {
    return async dispatch => {
        console.log('ingredientsStr in thunk', ingredientsStr);
        const { data } = await axios.post(`http://www.recipepuppy.com/api/?i=${ingredientsStr}`);
        console.log('axios response', data.results)
        dispatch(submitIngredients(data.results))
    }
}



const initialState = { ingredients: [], recipes: []};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_INGREDIENTS:
         return {...state, ingredients: action.ingredients}
        case SUBMIT_INGREDIENTS:
            return {...state, recipes: action.recipes}
      default:
         return state;
   }
};

export default reducer;
