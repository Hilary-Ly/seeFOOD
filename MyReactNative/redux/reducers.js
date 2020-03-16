import axios from 'axios';
import '../secrets';

const GET_INGREDIENTS = 'GET_INGREDIENTS';
const SUBMIT_INGREDIENTS = 'SUBMIT_INGREDIENTS';
const GET_NUTRITION = 'GET_NUTRITION';
const GET_RECIPE = 'GET_RECIPE'

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
   };
};

const getNutrition = nutrition => ({
   type: GET_NUTRITION,
   nutrition
});

const getOneRecipe = recipe => ({
   type: GET_RECIPE,
   recipe
});

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
      //   console.log('ingredientsStr in thunk', ingredientsStr);
      // loop to get 3 pages of results
      let recipes = [];
      for (let i = 1; i <= 3; i++) {
         const { data } = await axios.post(
            `http://www.recipepuppy.com/api/?i=${ingredientsStr}&p=${i}`
         );
         recipes.push(...data.results);
      }
      const filteredRecipes = recipes.filter(recipe =>
         recipe.href.startsWith('http://www.recipezaar.com/')
      );
      dispatch(submitIngredients(filteredRecipes));
   };
};

export const getNutritionThunk = (recipeTitle, ingredientsArr) => {
   return async dispatch => {
      try {
         console.log('data fed into thunk', recipeTitle, ingredientsArr);
         const {
            data
         } = await axios.post(
            `https://api.edamam.com/api/nutrition-details?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&force`,
            { title: recipeTitle, ingr: ingredientsArr }
         );
         //   console.log('data from edamam request', data)
         dispatch(getNutrition(data)); //
      } catch (error) {
         console.error(error);
      }
   };
};

export const webScraperThunk = ingredientsArr => {
   return async dispatch => {
      // try {
      console.log('ingredientsArr for  new state', ingredientsArr);
      dispatch(getOneRecipe(ingredientsArr));
      // } catch (error) {
      //     console.error(error)
      // }
   };
};

const initialState = {
   ingredients: [],
   recipes: [],
   nutrition: {},
   oneRecipe: []
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_INGREDIENTS:
         return { ...state, ingredients: action.ingredients };
      case SUBMIT_INGREDIENTS:
         return { ...state, recipes: action.recipes };
      case GET_NUTRITION:
         console.log('state change', action.nutrition);
         return { ...state, nutrition: action.nutrition };
      case GET_RECIPE:
         console.log('state change', action.recipe);
         return { ...state, oneRecipe: action.recipe };
      default:
         return state;
   }
};

export default reducer;
