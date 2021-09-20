import React from 'react';
import { Badge, Box, Text, IconButton } from '@chakra-ui/core';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFavoritesContext } from '../context/favorites_context';
import { isFavorite } from '../utils';

const LaunchPadItem = ({ launchPad }) => {
  const {
    favorites: { launch_pads },
    addFavoriteLaunchPad: addFavorite,
    removeFavoriteLaunchPad: removeFavorite,
  } = useFavoritesContext();
  const isPadFavorite = isFavorite(launch_pads, launchPad.site_id);
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
          icon={isPadFavorite ? FaStar : FaRegStar}
          fontSize="1.25rem"
          variant="ghost"
          isRound={true}
          size="sm"
          _hover={{ fontSize: '1.75rem' }}
          aria-label="add to favorites"
          onClick={() =>
            isPadFavorite
              ? removeFavorite(launchPad.site_id)
              : addFavorite(launchPad.site_id, launchPad.site_name_long)
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
};

export default LaunchPadItem;
