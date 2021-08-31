import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/favorites_reducer';
import {
  ADD_FAVORITE_LAUNCH,
  REMOVE_FAVORITE_LAUNCH,
  ADD_FAVORITE_LAUNCHPAD,
  REMOVE_FAVORITE_LAUNCHPAD,
} from '../constants/actions';

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

  const addFavoriteLaunch = (id, name) => {
    dispatch({
      type: ADD_FAVORITE_LAUNCH,
      payload: { id, name },
    });
  };

  const removeFavoriteLaunch = (id) => {
    dispatch({
      type: REMOVE_FAVORITE_LAUNCH,
      payload: { id },
    });
  };

  const addFavoriteLaunchPad = (id, name) => {
    dispatch({
      type: ADD_FAVORITE_LAUNCHPAD,
      payload: { id, name },
    });
  };

  const removeFavoriteLaunchPad = (id) => {
    dispatch({
      type: REMOVE_FAVORITE_LAUNCHPAD,
      payload: { id },
    });
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        ...state,
        addFavoriteLaunch,
        removeFavoriteLaunch,
        addFavoriteLaunchPad,
        removeFavoriteLaunchPad,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};
