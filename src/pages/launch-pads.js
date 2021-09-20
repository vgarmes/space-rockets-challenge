import React from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import {
  Breadcrumbs,
  LaunchPadItem,
  LoadMoreButton,
  Error,
} from '../components';
import { useSpaceXPaginated } from '../utils/use-space-x';
import { PAGE_SIZE } from '../constants';

export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    '/launchpads',
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: 'Home', to: '/' }, { label: 'Launch Pads' }]}
      />
      <SimpleGrid my={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
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
