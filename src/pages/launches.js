import React from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { useSpaceXPaginated } from '../utils/use-space-x';
import {
  Breadcrumbs,
  Error,
  LoadMoreButton,
  Filter,
  LaunchItem,
} from '../components';
import { useFavoritesContext } from '../context/favorites_context';
import { isFavorite } from '../utils';

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    '/launches/past',
    {
      limit: PAGE_SIZE,
      order: 'desc',
      sort: 'launch_date_utc',
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
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
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
