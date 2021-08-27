import { ADD_TO_FAVORITES, REMOVE_FAVORITE_ITEM } from '../constants/actions';

const favorites_reducer = (state, action) => {
  if (action.type === ADD_TO_FAVORITES) {
    const { favorite } = action.payload;
    return { ...state, favorites: [...state.favorites, favorite] };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default favorites_reducer;
