import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  List,
  ListItem,
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  Link,
} from '@chakra-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useFavoritesContext } from '../context/favorites_context';

const MenuLink = ({ id, name, pathRoot, currentPath }) => {
  const path = `${pathRoot}/${id.toString()}`;
  const isActive = path === currentPath;

  return (
    <RouterLink to={path}>
      <Box w="100%">
        <Text
          fontSize="sm"
          fontWeight={`${isActive ? '700' : '400'}`}
          transition="all 0.2s"
          ml={`${isActive ? 1 : '0'}`}
        >
          {name}
        </Text>
      </Box>
    </RouterLink>
  );
};

const MenuLinksGroup = ({ title, items, pathRoot, currentPath }) => {
  return (
    <AccordionItem border="0">
      <AccordionHeader px="0">
        <Box
          flex="1"
          textAlign="left"
          fontSize="sm"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {title}
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pl={1} pb={4}>
        {items.length === 0 ? (
          <Link as={RouterLink} to={pathRoot} fontSize="sm">
            Add favorites...
          </Link>
        ) : (
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <MenuLink
                  {...item}
                  pathRoot={pathRoot}
                  currentPath={currentPath}
                />
              </ListItem>
            ))}
          </List>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

const DrawerMenu = ({ isOpen, onClose, btnRef }) => {
  const { favorites } = useFavoritesContext();
  const { pathname } = useLocation();

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
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <Accordion defaultIndex={[0]} allowMultiple allowToggle>
            <MenuLinksGroup
              title="Launches"
              items={favorites.launches}
              pathRoot="/launches"
              currentPath={pathname}
            />

            <MenuLinksGroup
              title="Launch pads"
              items={favorites.launch_pads}
              pathRoot="/launch-pads"
              currentPath={pathname}
            />
          </Accordion>
        </DrawerBody>
        <DrawerFooter>Drawer footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
