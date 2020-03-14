import axios from 'axios';
import '../secrets';

const GET_INGREDIENTS = 'GET_INGREDIENTS';

const getIngredients = ingredients => {
   return {
      type: GET_INGREDIENTS,
      ingredients
   };
};

export const getIngredientsThunk = foodImageUrl => {
    return async dispatch => {
        // console.log('foodImageUrl passed into reducer file');
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
         console.log('data', data.outputs[0].data.concepts)
         const possIngredients = data.outputs[0].data.concepts;
         dispatch(getIngredients(possIngredients));
      } catch (error) {
         console.error(error);
      }
   };
};

const initialState = [];

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_INGREDIENTS:
         return action.ingredients;
      default:
         return state;
   }
};

export default reducer;
