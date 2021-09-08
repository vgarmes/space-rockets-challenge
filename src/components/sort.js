import React, { useState } from 'react';
import {
  Box,
  Divider,
  ButtonGroup,
  IconButton,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/core';
import { IoGrid, IoList } from 'react-icons/io5';
import { useLaunchesContext } from '../context/launches_context';

const Sort = () => {
  const [sortValue, setSortValue] = useState('launch-date-desc');
  const { updateSort, grid_view, setGridView, setListView } =
    useLaunchesContext();
  const handleChange = (e) => {
    const value = e.target.value;
    updateSort(value);
    setSortValue(value);
  };

  return (
    <Box d="flex" alignItems="center" justifyContent="space-between">
      <ButtonGroup spacing={2}>
        <IconButton
          aria-label="Grid view"
          icon={IoGrid}
          fontSize="1.25rem"
          variant="outline"
          size="sm"
          isActive={grid_view}
          onClick={setGridView}
        />
        <IconButton
          aria-label="List view"
          icon={IoList}
          fontSize="1.25rem"
          variant="outline"
          size="sm"
          isActive={!grid_view}
          onClick={setListView}
        />
      </ButtonGroup>
      <Divider flexGrow="1" mx={2} />
      <form onSubmit={(e) => e.preventDefault}>
        <FormControl display="flex" alignItems="center">
          <FormLabel
            htmlFor="sort"
            flexShrink="0"
            p="0"
            mr={2}
            fontSize="sm"
            display={['none', 'block']}
          >
            Sort by
          </FormLabel>
          <Select
            variant="outline"
            size="sm"
            name="sort"
            id="sort"
            fontSize="sm"
            value={sortValue}
            onChange={handleChange}
          >
            <option value="launch-date-asc">launch date (asc)</option>
            <option value="launch-date-desc">launch date (desc)</option>
            <option value="mission-name-a">mission name (a-z)</option>
            <option value="mission-name-z">mission name (z-a)</option>
            <option value="launch-site-a">launch site (a-z)</option>
            <option value="launch-site-z">launch site (z-a)</option>
            <option value="rocket-a">rocket (a-z)</option>
            <option value="rocket-z">rocket (z-a)</option>
          </Select>
        </FormControl>
      </form>
    </Box>
  );
};

export default Sort;
