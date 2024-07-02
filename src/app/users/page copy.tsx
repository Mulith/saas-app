"use client";

import { useState, useEffect } from 'react';
import { Box, Container, Flex, Heading, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Spacer, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { FiSearch, FiGrid, FiDownload, FiPieChart, FiColumns } from 'react-icons/fi';
import { GridTable } from '@/components/GridTable';
import { ColumnConfig, SearchConfig, FiltersConfig, ToolsConfig, GridActionsConfig, User, GridTableProps } from '../../app/types';
import { TableFooter } from '@/components/TableFooter';
import axios from 'axios';

interface PageConfig {
  type: string;
  heading: string;
  subHeading: string;
  search: SearchConfig;
  filters: FiltersConfig;
  tools: ToolsConfig;
  grid: GridTableProps;
  start: number;
}

const UsersPage = () => {
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [start, setStart] = useState(0); // Start index should be 0 to properly slice arrays

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageConfigResponse = await axios.get('http://localhost:5000/GetPageConfig');
        setPageConfig(pageConfigResponse.data);


        const usersResponse = await axios.get('http://localhost:5000/Users');
        setUsers(usersResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setFetchError('There was an error fetching the data!');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const handleNext = () => {
  if (pageConfig) {
    const maxStartIndex = Math.max(users.length - (users.length % pageConfig.grid.resultsPerPage) + 1, 0);
    setStart(prevStart => Math.min(prevStart + pageConfig.grid.resultsPerPage, maxStartIndex));
  }
};

  const handlePrevious = () => {
    if (pageConfig) {
      setStart(prevStart => Math.max(prevStart - pageConfig.grid.resultsPerPage, 0));
    }
  };


  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (fetchError) {
    return <Text>Error: {fetchError}</Text>;
  }

  return (
    <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }} maxW="100%">
      <Flex>
        <Box p={5}>
          <Heading>{pageConfig?.heading}</Heading>
          <Text>{pageConfig?.subHeading}</Text>
        </Box>
        <Spacer />
        <Box px={{ base: '4', md: '6' }} pt="8">
          {pageConfig?.search.visible && (
            <Stack direction={{ base: 'column', md: 'row' }} justify={pageConfig?.search.alignment}>
              <InputGroup maxW="xs">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="fg.muted" boxSize="5" />
                </InputLeftElement>
                <Input placeholder={pageConfig?.search.placeholder} />
              </InputGroup>
            </Stack>
          )}
        </Box>
      </Flex>
      <Box
        bg="bg.surface"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <Stack spacing="5">
          <Flex px={{ base: '4', md: '6' }}>
            <Text textStyle="lg" fontWeight="medium">
              {pageConfig?.filters.visible && "Filters"}
            </Text>
            <Spacer />
            {pageConfig?.tools.visible && (
              <HStack spacing="2">
                {pageConfig?.tools.allowChangeView && <IconButton aria-label="Switch to tiled layout" icon={<FiGrid />} />}
                {pageConfig?.tools.allowCustomColumns && <IconButton aria-label="Edit columns and layout" icon={<FiColumns />} />}
                {pageConfig?.tools.allowExport && <IconButton aria-label="Export the list" icon={<FiDownload />} />}
                {pageConfig?.tools.allowGraph && <IconButton aria-label="Convert to dashboard tile" icon={<FiPieChart />} />}
              </HStack>
            )}
          </Flex>
          <Box overflowX="auto">
            {pageConfig && (
              <GridTable
                {...pageConfig.grid}
                start={start} 
                users={users} 
              />
            )}
          </Box>
          <TableFooter
            rows={users.length}
            start={start} // use local start state here
            results={pageConfig?.grid.resultsPerPage ?? 0}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default UsersPage;
