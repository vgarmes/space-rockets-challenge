import {
  ADD_FAVORITE_LAUNCH,
  REMOVE_FAVORITE_LAUNCH,
  ADD_FAVORITE_LAUNCHPAD,
  REMOVE_FAVORITE_LAUNCHPAD,
  TOGGLE_EXPANDED_MENU_ITEM,
} from '../constants/actions';

const favorites_reducer = (state, action) => {
  if (action.type === ADD_FAVORITE_LAUNCH) {
    const { id, name } = action.payload;

    const tempFavorites = {
      ...state.favorites,
      launches: [...state.favorites.launches, { id, name }],
    };

    return { ...state, favorites: tempFavorites };
  }

  if (action.type === REMOVE_FAVORITE_LAUNCH) {
    const { id } = action.payload;

    const tempFavorites = {
      ...state.favorites,
      launches: state.favorites.launches.filter(
        ({ id: launch_id }) => launch_id !== id
      ),
    };

    return { ...state, favorites: tempFavorites };
  }

  if (action.type === ADD_FAVORITE_LAUNCHPAD) {
    const { id, name } = action.payload;

    const tempFavorites = {
      ...state.favorites,
      launch_pads: [...state.favorites.launch_pads, { id, name }],
    };

    return { ...state, favorites: tempFavorites };
  }

  if (action.type === REMOVE_FAVORITE_LAUNCHPAD) {
    const { id } = action.payload;

    const tempFavorites = {
      ...state.favorites,
      launch_pads: state.favorites.launch_pads.filter(
        ({ id: launchpad_id }) => launchpad_id !== id
      ),
    };

    return { ...state, favorites: tempFavorites };
  }

  if (action.type === TOGGLE_EXPANDED_MENU_ITEM) {
    const newItems = state.expandedMenuItems.map((item, index) =>
      index === action.payload ? !item : item
    );

    return { ...state, expandedMenuItems: newItems };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default favorites_reducer;
