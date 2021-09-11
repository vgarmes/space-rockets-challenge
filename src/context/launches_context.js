import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/launches_reducer';
import {
  UPDATE_SORT,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_FILTERS,
} from '../constants/actions';

const initialState = {
  sort: 'launch_date_utc',
  order: 'desc',
  grid_view: true,
  filters: {
    launch_success: ['successful', 'failed'],
    site_id: 'all',
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

  return (
    <LaunchesContext.Provider
      value={{ ...state, updateSort, setGridView, setListView, updateFilters }}
    >
      {children}
    </LaunchesContext.Provider>
  );
};

export const useLaunchesContext = () => {
  return useContext(LaunchesContext);
};
