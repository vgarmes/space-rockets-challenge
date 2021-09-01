import React, { useRef } from 'react';
import { Flex, Text, Button, useDisclosure } from '@chakra-ui/core';
import DrawerMenu from './menu';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = useRef();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
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
      <DrawerMenu isOpen={isOpen} onClose={onClose} btnRef={drawerBtnRef} />
    </Flex>
  );
};

export default Navbar;
