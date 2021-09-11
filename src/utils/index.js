import { todayISO } from './format-date';

export const isFavorite = (favorites, itemId) => {
  return favorites.find(({ id }) => id === itemId);
};

export const filters2params = (filters) => {
  let params = {};
  Object.keys(filters).forEach((key) => {
    if (key === 'launch_success' && filters[key].length === 1) {
      const value = filters[key][0] === 'successful' ? 'true' : 'false';
      params = { ...params, launch_success: value };
    }
    if (key === 'site_id' && filters[key] !== 'all') {
      params = { ...params, site_id: filters[key] };
    }
    if (key === 'date_range' && filters[key].start && filters[key].end) {
      params = { ...params, start: filters[key].start, end: filters[key].end };
    }
  });

  return params;
};

export const validateDate = (name, value, currentDateRange) => {
  let newDateRange = { ...currentDateRange, [name]: value };
  if (name === 'start' && currentDateRange.end < value) {
    newDateRange = {
      ...newDateRange,
      start: value,
      end: value > todayISO() ? value : todayISO(),
    };
  }
  if (
    name === 'end' &&
    (currentDateRange.start === '' || currentDateRange.start > value)
  ) {
    newDateRange = {
      ...newDateRange,
      start: value,
      end: value,
    };
  }
  return newDateRange;
};
