import { formatDate, formatDateTime } from '../format-date';

const timestamp = '2006-03-25T10:30:00+12:00';

test('format date', () => {
  const expectedDate = 'Friday, March 24, 2006';
  expect(formatDate(timestamp)).toBe(expectedDate);
});

test('format datetime with local timezone', () => {
  const expectedDateTime = 'March 25, 2006, 10:30:00 AM GMT+12';
  expect(formatDateTime(timestamp, true)).toBe(expectedDateTime);
});
