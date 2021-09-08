import React from 'react';
import { Badge, Box, SimpleGrid, Text, IconButton } from '@chakra-ui/core';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Error from './error';
import Breadcrumbs from './breadcrumbs';
import LoadMoreButton from './load-more-button';
import { useSpaceXPaginated } from '../utils/use-space-x';
import { useFavoritesContext } from '../context/favorites_context';
import { isFavorite } from '../utils';

const PAGE_SIZE = 12;

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
      <GridView data={data} error={error} />
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
  const {
    favorites: { launch_pads },
    addFavoriteLaunchPad,
    removeFavoriteLaunchPad,
  } = useFavoritesContext();
  return (
    <SimpleGrid my={[2, null, 6]} minChildWidth="350px" spacing="4">
      {error && <Error />}
      {data &&
        data
          .flat()
          .map((launchPad) => (
            <LaunchPadItem
              key={launchPad.site_id}
              launchPad={launchPad}
              isFavorite={isFavorite(launch_pads, launchPad.id)}
              addFavorite={addFavoriteLaunchPad}
              removeFavorite={removeFavoriteLaunchPad}
            />
          ))}
    </SimpleGrid>
  );
}

function LaunchPadItem({ launchPad, isFavorite, addFavorite, removeFavorite }) {
  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box pt="2" px="6" d="flex" justifyContent="flex-end">
        <IconButton
          icon={isFavorite ? FaStar : FaRegStar}
          fontSize="1.25rem"
          variant="ghost"
          isRound={true}
          size="sm"
          _hover={{ fontSize: '1.75rem' }}
          aria-label="add to favorites"
          onClick={() =>
            isFavorite
              ? removeFavorite(launchPad.id)
              : addFavorite(launchPad.id, launchPad.site_name_long)
          }
        />
      </Box>
      <Link to={`/launch-pads/${launchPad.site_id}`}>
        <Box px="6" pb="6">
          <Box d="flex" alignItems="baseline">
            {launchPad.status === 'active' ? (
              <Badge px="2" variant="solid" variantColor="green">
                Active
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Retired
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launchPad.attempted_launches} attempted &bull;{' '}
              {launchPad.successful_launches} succeeded
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launchPad.name}
          </Box>
          <Text color="gray.500" fontSize="sm">
            {launchPad.vehicles_launched.join(', ')}
          </Text>
        </Box>
      </Link>
    </Box>
  );
}
