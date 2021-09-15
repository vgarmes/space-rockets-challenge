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
  Input,
  Button,
} from '@chakra-ui/core';
import { useLaunchesContext } from '../context/launches_context';
import { useSpaceX } from '../utils/use-space-x';
import { validateDate } from '../utils';

const Filter = () => {
  const { filters, updateFilters, clearFilters } = useLaunchesContext();
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
          <SimpleGrid columns={['1', '2']} spacing="4">
            <SuccessCheckbox filters={filters} updateFilters={updateFilters} />
            <SiteSelect filters={filters} updateFilters={updateFilters} />
            <DateSelect filters={filters} updateFilters={updateFilters} />
          </SimpleGrid>
          <Box d="flex" justifyContent="center">
            <Button variantColor="red" onClick={clearFilters} mt="8">
              Clear all
            </Button>
          </Box>
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

const DateSelect = ({ filters: { date_range }, updateFilters }) => {
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updateFilters('date_range', validateDate(name, value, date_range));
  };
  return (
    <SimpleGrid columns="2" spacing="2">
      <Box>
        <Text fontSize="sm" fontWeight="bold" mb="2">
          Start date:
        </Text>
        <Input
          size="sm"
          type="date"
          id="start"
          name="start"
          value={date_range.start}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="bold" mb="2">
          End date:
        </Text>
        <Input
          size="sm"
          type="date"
          id="end"
          name="end"
          value={date_range.end}
          onChange={handleChange}
        />
      </Box>
    </SimpleGrid>
  );
};

export default Filter;
