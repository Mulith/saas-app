"use client";

import { Box, Heading, Input, Button, VStack } from "@chakra-ui/react";
import Link from 'next/link';
import { Link as ChakraLink } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Box p={5} maxWidth="400px" mx="auto">
      <Heading mb={6}>Login</Heading>
      <VStack spacing={4}>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button colorScheme="blue" width="full">Login</Button>
        <Link href="/register" passHref>
          <ChakraLink>Register</ChakraLink>
        </Link>
      </VStack>
    </Box>
  );
};

export default LoginPage;
