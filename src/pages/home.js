import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Stack, Link } from '@chakra-ui/core';
import { ArrowRight } from 'react-feather';
import { Link as BrowserLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import { animationTimeout } from '../constants';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => {
      clearTimeout(mountTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <Stack m="6" spacing="6">
      <CustomCSSTransition
        classNames="fade"
        timeout={animationTimeout}
        trigger={isMounted}
      >
        <PageLink url="/launches">Browse SpaceX Launches</PageLink>
      </CustomCSSTransition>
      <CustomCSSTransition
        classNames="fade"
        timeout={animationTimeout}
        delay={250}
        trigger={isMounted}
      >
        <PageLink url="/launch-pads">Browse SpaceX Launch Pads</PageLink>
      </CustomCSSTransition>
    </Stack>
  );
}

function PageLink({ url, children, ...rest }) {
  return (
    <Link as={BrowserLink} to={url} {...rest}>
      <Flex
        justifyContent="space-between"
        p="6"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
      >
        <Text fontSize="lg">{children}</Text>
        <Box as={ArrowRight} />
      </Flex>
    </Link>
  );
}

const CustomCSSTransition = ({
  children,
  trigger,
  classNames,
  timeout,
  delay,
  ...rest
}) => {
  return (
    <CSSTransition
      in={trigger}
      classNames={classNames}
      timeout={timeout}
      style={{ transitionDelay: `${delay ? delay : '0'}ms` }}
      unmountOnExit
    >
      {React.cloneElement(children, { ...rest })}
    </CSSTransition>
  );
};
