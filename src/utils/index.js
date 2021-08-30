export const isFavorite = (favorites, itemId) => {
  return favorites.find(({ id }) => id === itemId);
};
