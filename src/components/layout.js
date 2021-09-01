import React from 'react';
import { Box } from '@chakra-ui/core';
import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box mx={[2, null, 6]}>{children}</Box>
    </>
  );
};

export default Layout;
