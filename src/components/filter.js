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
  Text,
  Select,
  SimpleGrid,
} from '@chakra-ui/core';
import { useLaunchesContext } from '../context/launches_context';
import { useSpaceX } from '../utils/use-space-x';

const Filter = () => {
  const { filters, updateFilters } = useLaunchesContext();
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
          <SimpleGrid columns={['1', '3']} spacing="4">
            <SuccessCheckbox filters={filters} updateFilters={updateFilters} />
            <SiteSelect filters={filters} updateFilters={updateFilters} />
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const SuccessCheckbox = ({ filters: { launch_success }, updateFilters }) => {
  const handleChange = (newValues) => {
    let tempValues = [...newValues];
    if (newValues.length === 0) {
      tempValues =
        launch_success[0] === 'successful' ? ['failed'] : ['successful'];
    }
    updateFilters('launch_success', tempValues);
  };
  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold" mb="2">
        Launch success:
      </Text>
      <CheckboxGroup
        isInline
        spacing={4}
        size="sm"
        name="launch_success"
        value={launch_success}
        onChange={handleChange}
      >
        <Checkbox value="successful">Successful</Checkbox>
        <Checkbox value="failed">Failed</Checkbox>
      </CheckboxGroup>
    </Box>
  );
};

const SiteSelect = ({ filters: { site_id }, updateFilters }) => {
  const { data, error } = useSpaceX('/launchpads');
  const handleChange = (e) => {
    const value = e.target.value;
    updateFilters('site_id', value);
  };
  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold" mb="2">
        Launch site:
      </Text>

      <Select
        variant="outline"
        size="sm"
        name="sort"
        id="sort"
        fontSize="sm"
        placeholder={site_id}
        value={site_id}
        onChange={handleChange}
      >
        {error && <option disabled>There was an error</option>}
        {data &&
          data
            .flat()
            .sort((a, b) => a.site_name_long.localeCompare(b.site_name_long))
            .map((launchPad) => (
              <option key={launchPad.id} value={launchPad.site_id}>
                {launchPad.site_name_long}
              </option>
            ))}
      </Select>
    </Box>
  );
};

export default Filter;
