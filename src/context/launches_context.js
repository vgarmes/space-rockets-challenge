import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/launches_reducer';
import {
  UPDATE_SORT,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
} from '../constants/actions';

const initialState = {
  sort: 'launch_date_utc',
  order: 'desc',
  grid_view: true,
  filters: {
    launch_success: ['successful', 'failed'],
    site_id: 'all',
    date_range: { start: '', end: '' },
  },
};

const LaunchesContext = React.createContext();

export const LaunchesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSort = (value) => {
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateFilters = (name, value) => {
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS, payload: initialState.filters });
  };

  return (
    <LaunchesContext.Provider
      value={{
        ...state,
        updateSort,
        setGridView,
        setListView,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </LaunchesContext.Provider>
  );
};

export const useLaunchesContext = () => {
  return useContext(LaunchesContext);
};
