import React, { useRef } from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { Error, LaunchCard } from '.';

import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import Fade from 'react-reveal/Fade';
import { MIN_CHILD_WIDTH } from '../constants';
import useRowSize from '../utils/useRowSize';

const GridView = ({ data = [], error }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const container = useRef(null);
  const cardsPerRow = useRowSize(container);

  if (error) {
    return <Error />;
  }

  return (
    <SimpleGrid
      my={[2, null, 6]}
      minChildWidth={`${MIN_CHILD_WIDTH}px`}
      spacing="4"
      ref={container}
    >
      {prefersReducedMotion ? (
        <>
          {data.flat().map((launch) => (
            <LaunchCard key={launch.flight_number} launch={launch} />
          ))}
        </>
      ) : (
        <>
          {data.flat().map((launch, i) => {
            const j =
              i % cardsPerRow === 0
                ? 0
                : i - cardsPerRow * Math.floor(i / cardsPerRow);
            return (
              <Fade bottom delay={j * 100} key={launch.flight_number}>
                <LaunchCard launch={launch} />
              </Fade>
            );
          })}
        </>
      )}
    </SimpleGrid>
  );
};

export default GridView;
