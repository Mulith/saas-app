'use client';

import { ChakraProvider, Flex } from '@chakra-ui/react';
import { NavBar } from '@/components/ChakraUI/NavBar';
import { SecondaryNav } from '@/components/ChakraUI/SecondaryNav'
import theme from '../theme';
import { ReactNode } from 'react';
import Head from 'next/head';


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <title>My SaaS Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <ChakraProvider theme={theme}>
          <Flex h="100vh">
            <NavBar />
            <Flex flexDir={'column'} width='100%'>
              <SecondaryNav />
              {children}
            </Flex>
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default Layout;
