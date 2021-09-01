import React from 'react';
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

const Sort = () => {
  const sort = 'launch-date';
  return (
    <Box d="flex" alignItems="center" justifyContent="space-between">
      <ButtonGroup spacing={2}>
        <IconButton
          aria-label="Grid view"
          icon={IoGrid}
          fontSize="1.25rem"
          variant="outline"
          size="sm"
        />
        <IconButton
          aria-label="List view"
          icon={IoList}
          fontSize="1.25rem"
          variant="outline"
          size="sm"
        />
      </ButtonGroup>
      <Divider flexGrow="1" mx={2} />
      <form onSubmit={(e) => e.preventDefault}>
        <FormControl display="flex" alignItems="center">
          <FormLabel
            htmlFor="sort"
            flexShrink="0"
            py="0"
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
            value={sort}
            fontSize="sm"
          >
            <option value="launch-date-asc">launch date (asc)</option>
            <option value="launch-date-desc">launch date (desc)</option>
            <option value="mission-name-a">mission name (a-z)</option>
            <option value="mission-name-z">mission name (z-a)</option>
          </Select>
        </FormControl>
      </form>
    </Box>
  );
};

export default Sort;
