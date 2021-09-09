import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/core';
import { useLaunchesContext } from '../context/launches_context';

const Filter = () => {
  return (
    <Accordion defaultIndex={[]} allowToggle mb={2}>
      <AccordionItem border="0">
        <AccordionHeader px="0">
          <Box
            flex="1"
            textAlign="left"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Filter
          </Box>
          <AccordionIcon />
        </AccordionHeader>
        <AccordionPanel pl={1} pb={4}>
          <SuccessCheckbox />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const SuccessCheckbox = () => {
  const { filters, updateFilters } = useLaunchesContext();
  const handleChange = (newValues) => {
    let tempValues = [...newValues];
    if (newValues.length === 0) {
      tempValues =
        filters.launch_success[0] === 'successful'
          ? ['failed']
          : ['successful'];
    }
    updateFilters('launch_success', tempValues);
  };
  return (
    <CheckboxGroup
      isInline
      spacing={4}
      size="sm"
      name="launch_success"
      value={filters.launch_success}
      onChange={handleChange}
    >
      <Checkbox value="successful">Successful</Checkbox>
      <Checkbox value="failed">Failed</Checkbox>
    </CheckboxGroup>
  );
};

export default Filter;
