import React from 'react';
import {
  Breadcrumbs,
  LaunchPadItem,
  LoadMoreButton,
  GridView,
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
      <GridView data={data} error={error} keyName="site_id">
        <LaunchPadItem />
      </GridView>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
