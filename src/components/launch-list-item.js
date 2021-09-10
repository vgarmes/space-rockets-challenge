import React from 'react';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
  Badge,
  IconButton,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Tag, Watch, MapPin, Navigation } from 'react-feather';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { format as timeAgo } from 'timeago.js';
import { formatDateTime } from '../utils/format-date';
import { useFavoritesContext } from '../context/favorites_context';
import { isFavorite } from '../utils';

const LaunchListItem = ({ launch }) => {
  const {
    favorites: { launches },
    addFavoriteLaunch: addFavorite,
    removeFavoriteLaunch: removeFavorite,
  } = useFavoritesContext();
  const isLaunchFavorite = isFavorite(launches, launch.flight_number);
  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      p="4"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box d="flex" justifyContent="space-between" mb="4">
        <Stack isInline spacing="3" mt="2" alignItems="center">
          <Badge variantColor="purple" fontSize="xs">
            #{launch.flight_number}
          </Badge>
          {launch.launch_success ? (
            <Badge variantColor="green" fontSize="xs">
              Successful
            </Badge>
          ) : (
            <Badge variantColor="red" fontSize="xs">
              Failed
            </Badge>
          )}
        </Stack>
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
              ? removeFavorite(launch.flight_number)
              : addFavorite(launch.flight_number, launch.mission_name)
          }
        />
      </Box>
      <Link to={`/launches/${launch.flight_number.toString()}`}>
        <Grid
          templateColumns={['repeat(2,1fr)', null, 'repeat(3, 1fr) 0.5fr']}
          gap={['2', '5']}
        >
          <Stat>
            <StatLabel display="flex">
              <Box as={Tag} width="1em" />{' '}
              <Box ml="2" as="span">
                Mission name
              </Box>
            </StatLabel>
            <StatNumber fontSize={['md', 'xl']}>
              {launch.mission_name}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel display="flex">
              <Box as={Watch} width="1em" />{' '}
              <Box ml="2" as="span">
                Launch Date
              </Box>
            </StatLabel>
            <StatNumber fontSize={['md', 'xl']}>
              {formatDateTime(launch.launch_date_local, true)}
            </StatNumber>
            <StatHelpText>{timeAgo(launch.launch_date_utc)}</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel display="flex">
              <Box as={MapPin} width="1em" />{' '}
              <Box ml="2" as="span">
                Launch Site
              </Box>
            </StatLabel>
            <StatNumber fontSize={['md', 'xl']}>
              {launch.launch_site.site_name_long}
            </StatNumber>
            <StatHelpText>{launch.launch_site.site_name}</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel display="flex">
              <Box as={Navigation} width="1em" />{' '}
              <Box ml="2" as="span">
                Rocket
              </Box>
            </StatLabel>
            <StatNumber fontSize={['md', 'xl']}>
              {launch.rocket.rocket_name}
            </StatNumber>
            <StatHelpText>{launch.rocket.rocket_type}</StatHelpText>
          </Stat>
        </Grid>
      </Link>
    </Box>
  );
};

export default LaunchListItem;
