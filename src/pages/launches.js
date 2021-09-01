import React from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { useSpaceXPaginated } from '../utils/use-space-x';
import {
  Breadcrumbs,
  Error,
  LoadMoreButton,
  Filter,
  Sort,
  LaunchItem,
} from '../components';
import { useFavoritesContext } from '../context/favorites_context';
import { useLaunchesContext } from '../context/launches_context';
import { isFavorite } from '../utils';

const PAGE_SIZE = 12;

export default function Launches() {
  const { sort, order } = useLaunchesContext();
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    '/launches/past',
    {
      limit: PAGE_SIZE,
      order: order,
      sort: sort,
    }
  );

  const {
    favorites: { launches },
    addFavoriteLaunch,
    removeFavoriteLaunch,
  } = useFavoritesContext();

  return (
    <div>
      <Breadcrumbs
        items={[{ label: 'Home', to: '/' }, { label: 'Launches' }]}
      />
      <Filter />
      <Sort />
      <SimpleGrid my={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem
                launch={launch}
                key={launch.flight_number}
                isFavorite={isFavorite(launches, launch.flight_number)}
                addFavorite={addFavoriteLaunch}
                removeFavorite={removeFavoriteLaunch}
              />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
