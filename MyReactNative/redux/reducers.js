import axios from 'axios';

const GET_INGREDIENTS = 'GET_INGREDIENTS'

const getIngredients = ingredients => {
    return {
        type: GET_INGREDIENTS,
        ingredients
    }
}

export const getIngredientsThunk = foodImageUrl => {
    return async dispatch => {
        // trycatch
        const { data } = await axios.post(
           'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs', foodImageUrl);
        dispatch(getIngredientsd(data))
    }
}

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return action.ingredients
        default:
            return state
    }
}

export default reducer