import { UPDATE_SORT, SET_GRIDVIEW, SET_LISTVIEW } from '../constants/actions';

const launches_reducer = (state, action) => {
  if (action.type === UPDATE_SORT) {
    let { sort: newSort, order: newOrder } = state;
    const value = action.payload;

    if (value === 'launch-date-asc') {
      newSort = 'launch_date_utc';
      newOrder = 'asc';
    }

    if (value === 'launch-date-desc') {
      newSort = 'launch_date_utc';
      newOrder = 'desc';
    }

    if (value === 'mission-name-a') {
      newSort = 'mission_name';
      newOrder = 'asc';
    }

    if (value === 'mission-name-z') {
      newSort = 'mission_name';
      newOrder = 'desc';
    }

    if (value === 'launch-site-a') {
      newSort = 'site_name';
      newOrder = 'asc';
    }

    if (value === 'launch-site-z') {
      newSort = 'site_name';
      newOrder = 'desc';
    }

    if (value === 'rocket-a') {
      newSort = 'rocket_name';
      newOrder = 'asc';
    }

    if (value === 'rocket-z') {
      newSort = 'rocket_name';
      newOrder = 'desc';
    }

    return { ...state, sort: newSort, order: newOrder };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default launches_reducer;
