import React from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { Error, LaunchListItem } from '.';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import Fade from 'react-reveal/Fade';

const ListView = ({ data = [], error }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (error) {
    return <Error />;
  }
  return (
    <SimpleGrid my={[2, null, 6]} columns="1" spacing="4">
      {prefersReducedMotion ? (
        <>
          {data.flat().map((launch) => (
            <LaunchListItem key={launch.flight_number} launch={launch} />
          ))}
        </>
      ) : (
        <>
          {data.flat().map((launch, i) => (
            <Fade bottom key={launch.flight_number}>
              <LaunchListItem launch={launch} />
            </Fade>
          ))}
        </>
      )}
    </SimpleGrid>
  );
};

export default ListView;
