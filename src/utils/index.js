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
  });
  return params;
};
