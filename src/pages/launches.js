import React from 'react';
import { useSpaceXPaginated } from '../utils/use-space-x';
import {
  Breadcrumbs,
  LoadMoreButton,
  Filter,
  Sort,
  GridView,
  ListView,
} from '../components';
import { useLaunchesContext } from '../context/launches_context';
import { filters2params } from '../utils';
import { PAGE_SIZE } from '../constants';

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
      {grid_view ? (
        <GridView data={data} error={error} />
      ) : (
        <ListView data={data} error={error} />
      )}
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
