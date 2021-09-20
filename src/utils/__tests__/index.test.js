import { isFavorite, filters2params } from '..';

test('favorites array contains a favorite item', () => {
  const favorites_array = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' },
  ];
  const item_id = 2;

  expect(isFavorite(favorites_array, item_id)).toBeTruthy();
});

test('favorites array does not contain a favorite item', () => {
  const favorites_array = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' },
  ];
  const item_id = 4;

  expect(isFavorite(favorites_array, item_id)).toBeFalsy();
});

test('filters are converted to query strings 1', () => {
  const filters = {
    launch_success: ['successful', 'failed'],
    site_id: 'all',
    date_range: { start: '', end: '' },
  };

  const expected = {};

  expect(filters2params(filters)).toEqual(expected);
});

test('filters are converted to query strings 2', () => {
  const filters = {
    launch_success: ['successful'],
    site_id: 'ccafs_slc_40',
    date_range: { start: '2020-01-01', end: '2021-01-01' },
  };

  const expected = {
    launch_success: 'true',
    site_id: 'ccafs_slc_40',
    start: '2020-01-01',
    end: '2021-01-01',
  };

  expect(filters2params(filters)).toEqual(expected);
});
