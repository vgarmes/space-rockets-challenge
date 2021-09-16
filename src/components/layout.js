import React from 'react';
import { Box } from '@chakra-ui/core';
import Navbar from './navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar isHome={pathname === '/'} />
      <Box mx={[2, null, 6]}>{children}</Box>
    </>
  );
};

export default Layout;
