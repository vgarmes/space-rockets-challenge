import { ADD_TO_FAVORITES, REMOVE_FAVORITE_ITEM } from '../constants/actions';

const favorites_reducer = (state, action) => {
  if (action.type === ADD_TO_FAVORITES) {
    const { id, name, category } = action.payload;
    let tempFavorites = { ...state.favorites };
    const newItem = { id, name };

    if (category === 'launch') {
      tempFavorites.launches = [...tempFavorites.launches, newItem];
    }

    if (category === 'launch_pad') {
      tempFavorites.launch_pads = [...tempFavorites.launch_pads, newItem];
    }

    return { ...state, favorites: tempFavorites };
  }

  if (action.type === REMOVE_FAVORITE_ITEM) {
    const { id, category } = action.payload;
    let tempFavorites = { ...state.favorites };

    if (category === 'launch') {
      tempFavorites.launches = tempFavorites.launches.filter(
        ({ id: launch_id }) => launch_id !== id
      );
    }

    if (category === 'launch_pad') {
      tempFavorites.launch_pads = tempFavorites.launch_pads.filter(
        ({ id: launchpad_id }) => launchpad_id !== id
      );
    }

    return { ...state, favorites: tempFavorites };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default favorites_reducer;
