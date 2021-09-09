import React from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { useSpaceXPaginated } from '../utils/use-space-x';
import {
  Breadcrumbs,
  Error,
  LoadMoreButton,
  Filter,
  Sort,
  LaunchCard,
  LaunchListItem,
} from '../components';
import { useLaunchesContext } from '../context/launches_context';
import { filters2params } from '../utils';

const PAGE_SIZE = 12;

export default function Launches() {
  const { sort, order, grid_view, filters } = useLaunchesContext();
  const filterParams = filters2params(filters);
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    '/launches/past',
    {
      limit: PAGE_SIZE,
      order: order,
      sort: sort,
      ...filterParams,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: 'Home', to: '/' }, { label: 'Launches' }]}
      />
      <Filter />
      <Sort />
      {grid_view && <GridView data={data} error={error} />}
      {!grid_view && <ListView data={data} error={error} />}
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

function GridView({ data, error }) {
  return (
    <SimpleGrid my={[2, null, 6]} minChildWidth="350px" spacing="4">
      {error && <Error />}
      {data &&
        data
          .flat()
          .map((launch) => (
            <LaunchCard launch={launch} key={launch.flight_number} />
          ))}
    </SimpleGrid>
  );
}

function ListView({ data, error }) {
  return (
    <SimpleGrid my={[2, null, 6]} columns="1" spacing="4">
      {error && <Error />}
      {data &&
        data
          .flat()
          .map((launch) => (
            <LaunchListItem launch={launch} key={launch.flight_number} />
          ))}
    </SimpleGrid>
  );
}
