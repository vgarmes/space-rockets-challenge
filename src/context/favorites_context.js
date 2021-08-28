import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/favorites_reducer';
import { ADD_TO_FAVORITES, REMOVE_FAVORITE_ITEM } from '../constants/actions';

const getLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    return JSON.parse(localStorage.getItem('favorites'));
  } else {
    return { launches: [], launch_pads: [] };
  }
};

const initialState = {
  favorites: getLocalStorage(),
};

const FavoritesContext = React.createContext();

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToFavorites = (id, category) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: { id, category },
    });
  };

  const removeFavorite = (id, category) => {
    dispatch({
      type: REMOVE_FAVORITE_ITEM,
      payload: { id, category },
    });
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        ...state,
        addToFavorites,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};
