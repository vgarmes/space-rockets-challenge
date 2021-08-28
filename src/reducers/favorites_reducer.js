import { ADD_TO_FAVORITES, REMOVE_FAVORITE_ITEM } from '../constants/actions';

const favorites_reducer = (state, action) => {
  if (action.type === ADD_TO_FAVORITES) {
    const { id, category } = action.payload;
    let tempFavorites = { ...state.favorites };

    if (category === 'launch') {
      tempFavorites.launches = [...tempFavorites.launches, id];
    }

    if (category === 'launch_pad') {
      tempFavorites.launch_pads = [...tempFavorites.launch_pads, id];
    }

    return { ...state, favorites: tempFavorites };
  }

  if (action.type === REMOVE_FAVORITE_ITEM) {
    const { id, category } = action.payload;
    let tempFavorites = { ...state.favorites };

    if (category === 'launch') {
      tempFavorites.launches = tempFavorites.launches.filter(
        (launch_id) => launch_id !== id
      );
    }

    if (category === 'launch_pad') {
      tempFavorites.launch_pads = tempFavorites.launch_pads.filter(
        (launch_pad_id) => launch_pad_id !== id
      );
    }

    return { ...state, favorites: tempFavorites };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default favorites_reducer;
