import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/core';

const Menu = ({ isOpen, onClose, btnRef }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorites</DrawerHeader>
        <DrawerBody>Favorite launches</DrawerBody>
        <DrawerFooter>Drawer footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
