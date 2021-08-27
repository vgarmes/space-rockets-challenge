import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/favorites_reducer';
import { ADD_TO_FAVORITES, REMOVE_FAVORITE_ITEM } from '../constants/actions';

const getLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    return JSON.parse(localStorage.getItem('favorites'));
  } else {
    return [];
  }
};

const initialState = {
  favorites: getLocalStorage(),
};

const FavoritesContext = React.createContext();

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToFavorites = (item) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: { item },
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
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};
