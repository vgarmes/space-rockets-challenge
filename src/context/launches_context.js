import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/launches_reducer';
import { SORT_ITEMS, UPDATE_SORT } from '../constants/actions';

const initialState = {
  sort: 'launch_date_utc',
  order: 'desc',
};

const LaunchesContext = React.createContext();

export const LaunchesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSort = (value) => {
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  return (
    <LaunchesContext.Provider value={{ ...state, updateSort }}>
      {children}
    </LaunchesContext.Provider>
  );
};

export const useLaunchesContext = () => {
  return useContext(LaunchesContext);
};
