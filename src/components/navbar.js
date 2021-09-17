import React, { useState, useRef, useEffect } from 'react';
import { Flex, Text, Button, useDisclosure } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { animationTimeout } from '../constants';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import DrawerMenu from './menu';

const Navbar = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  const timeout = isHome ? animationTimeout : 0;
  const fadeDownClass = isHome ? 'fadedown' : '';
  const nodeRef = useRef(null);

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
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
      minHeight="88px"
    >
      {prefersReducedMotion ? (
        <>
          <Text
            as={Link}
            to="/"
            fontFamily="mono"
            letterSpacing="2px"
            fontWeight="bold"
            fontSize="lg"
          >
            ¡SPACE·R0CKETS!
          </Text>

          <Button ref={drawerBtnRef} variant="outline" onClick={onOpen}>
            Menu
          </Button>
        </>
      ) : (
        <>
          <CSSTransition
            in={isMounted}
            nodeRef={nodeRef}
            classNames={fadeDownClass}
            timeout={timeout}
            unmountOnExit
          >
            <Text
              ref={nodeRef}
              as={Link}
              to="/"
              fontFamily="mono"
              letterSpacing="2px"
              fontWeight="bold"
              fontSize="lg"
            >
              ¡SPACE·R0CKETS!
            </Text>
          </CSSTransition>
          <CSSTransition
            in={isMounted}
            nodeRef={drawerBtnRef}
            classNames={fadeDownClass}
            timeout={timeout}
            unmountOnExit
          >
            <Button ref={drawerBtnRef} variant="outline" onClick={onOpen}>
              Menu
            </Button>
          </CSSTransition>
        </>
      )}

      <DrawerMenu isOpen={isOpen} onClose={onClose} btnRef={drawerBtnRef} />
    </Flex>
  );
};

export default Navbar;
