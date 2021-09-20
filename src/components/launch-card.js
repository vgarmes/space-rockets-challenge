import React from 'react';
import { Badge, Box, Image, Text, Flex, IconButton } from '@chakra-ui/core';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { format as timeAgo } from 'timeago.js';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/format-date';
import { useFavoritesContext } from '../context/favorites_context';
import { isFavorite } from '../utils';

const LaunchCard = ({
  flight_number,
  links,
  mission_name,
  launch_success,
  rocket,
  launch_site,
  launch_date_utc,
}) => {
  const {
    favorites: { launches },
    addFavoriteLaunch: addFavorite,
    removeFavoriteLaunch: removeFavorite,
  } = useFavoritesContext();
  const isLaunchFavorite = isFavorite(launches, flight_number);
  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Link to={`/launches/${flight_number.toString()}`}>
        <Image
          src={
            links.flickr_images[0]?.replace('_o.jpg', '_z.jpg') ??
            links.mission_patch_small
          }
          alt={`${mission_name} launch`}
          height={['200px', null, '300px']}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />

        <Image
          position="absolute"
          top="5"
          right="5"
          src={links.mission_patch_small}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />
      </Link>
      <Box pt="2" px="6" d="flex" justifyContent="flex-end">
        <IconButton
          icon={isLaunchFavorite ? FaStar : FaRegStar}
          fontSize="1.25rem"
          variant="ghost"
          isRound={true}
          size="sm"
          _hover={{ fontSize: '1.75rem' }}
          aria-label="add to favorites"
          onClick={() =>
            isLaunchFavorite
              ? removeFavorite(flight_number)
              : addFavorite(flight_number, mission_name)
          }
        />
      </Box>
      <Link to={`/launches/${flight_number.toString()}`}>
        <Box px="6" pb="6">
          <Box d="flex" alignItems="baseline">
            {launch_success ? (
              <Badge px="2" variant="solid" variantColor="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Failed
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
              {rocket.rocket_name} &bull; {launch_site.site_name}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {mission_name}
          </Box>
          <Flex>
            <Text fontSize="sm">{formatDate(launch_date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch_date_utc)}
            </Text>
          </Flex>
        </Box>
      </Link>
    </Box>
  );
};

export default LaunchCard;
