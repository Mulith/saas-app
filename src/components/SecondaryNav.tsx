"use client";

import {
    Avatar,
    Box,
    Spacer,
    Container,
    HStack,
    ButtonGroup,
    IconButton
  } from '@chakra-ui/react'
import { FiBell, FiSearch } from 'react-icons/fi'
import DynamicBreadcrumb from './DynamicBreadcrumb';
  
  export const SecondaryNav = () => (
    <Box as="section" maxH="1em">
      <Box bg="bg.accent.default">
        <Container py={{ base: '0', md: '4' }} px={{ base: '0', md: '14' }} minW='100%'>
          <HStack justify="space-between">
            <DynamicBreadcrumb />
            <Spacer />
            <ButtonGroup variant="tertiary" spacing="1">
              <IconButton
                icon={<FiSearch />}
                aria-label="Search"
                display={{ base: 'flex', md: 'none' }}
                isRound
              />
              <IconButton icon={<FiBell />} aria-label="Show notification" isRound />
            </ButtonGroup>
            <Avatar boxSize="10" src="https://i.pravatar.cc/300" />
          </HStack>
        </Container>
      </Box>
    </Box>
  )

  export default SecondaryNav;