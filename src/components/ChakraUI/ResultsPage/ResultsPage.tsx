"use client";

import { useState, useEffect } from 'react';
import { Container, Box, Text, Flex, useDisclosure } from "@chakra-ui/react";
import axios from 'axios';
import { PageConfig, GenericEntity, ColumnConfig } from '../../../app/types';
import ResultsHeader from '@/components/ChakraUI/ResultsPage/ResultsHeader';
import ResultsToolbar from '@/components/ChakraUI/ResultsPage/ResultsToolbar';
import ResultsContent from '@/components/ChakraUI/ResultsPage/ResultsContent';
import CustomColumnsModal from '@/components/ChakraUI/ResultsPage/CustomColumnsModal';

interface ResultsPageProps<T extends GenericEntity> {
  configId: string;
  entity: string;
}

export const ResultsPage = <T extends GenericEntity>(props: ResultsPageProps<T>) => {
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null);
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [start, setStart] = useState(0); // Start index should be 0 to properly slice arrays
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageConfigResponse = await axios.get(`http://localhost:5000/GetPageConfig?id=${props.configId}`);
        console.log('Full Page Config Response:', pageConfigResponse.data); // Debug log full response
        setPageConfig(pageConfigResponse.data);

        const columnsFromResponse = pageConfigResponse.data.grid?.columns;
        if (columnsFromResponse) {
          setColumns(columnsFromResponse);
        } else {
          console.error('Columns property is missing in the API response');
        }

        const entitiesResponse = await axios.get(`http://localhost:5000/${props.entity}`);
        setEntities(entitiesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setFetchError('There was an error fetching the data!');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.configId, props.entity]);

  const handleNext = () => {
    if (pageConfig) {
      const maxStartIndex = Math.max(entities.length - (entities.length % pageConfig.grid.resultsPerPage) + 1, 0);
      setStart(prevStart => Math.min(prevStart + pageConfig.grid.resultsPerPage, maxStartIndex));
    }
  };

  const handlePrevious = () => {
    if (pageConfig) {
      setStart(prevStart => Math.max(prevStart - pageConfig.grid.resultsPerPage, 0));
    }
  };

  const handleColumnsChange = (updatedColumns: ColumnConfig[]) => {
    setColumns(updatedColumns);
  };

  const handleViewTypeChange = (nextValue: 'list' | 'grid') => {
    setViewType(nextValue);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (fetchError) {
    return <Text>Error: {fetchError}</Text>;
  }

  return (
    <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }} maxW="100%">
      <ResultsHeader
        heading={pageConfig?.heading || ''}
        subHeading={pageConfig?.subHeading || ''}
        searchVisible={pageConfig?.search.visible || false}
        searchPlaceholder={pageConfig?.search.placeholder || ''}
        searchAlignment={pageConfig?.search.alignment || 'right'}
        filtersVisible={pageConfig?.filters.visible || false}
        toolsVisible={pageConfig?.tools.visible || false}
        //columns={columns}
      />
      <Flex direction="row" justify="space-between" align="center" px={5} py={3}>
        <Box />
        <Box>
          <ResultsToolbar
            viewType={viewType}
            onChangeViewType={handleViewTypeChange}
            allowChangeView={pageConfig?.tools.allowChangeView || false}
            allowCustomColumns={pageConfig?.tools.allowCustomColumns || false}
            onEditOpen={onEditOpen}
            allowExport={pageConfig?.tools.allowExport || false}
            onExportOpen={onExportOpen}
            allowGraph={pageConfig?.tools.allowGraph || false}
          />
        </Box>
      </Flex>
      <Box bg="bg.surface" boxShadow={{ base: 'none', md: 'sm' }} borderRadius={{ base: 'none', md: 'lg' }}>
        <ResultsContent
          viewType={viewType}
          entities={entities}
          columns={columns}
          start={start}
          resultsPerPage={pageConfig?.grid.resultsPerPage ?? 0}
          onNext={handleNext}
          onPrevious={handlePrevious}
          gridActions={pageConfig?.grid.gridActions ?? { edit: false, delete: false, menu: false, visible: false }}
          pagination={pageConfig?.grid.pagination ?? false}
          visible={pageConfig?.grid.visible ?? true}
        />
      </Box>
      <CustomColumnsModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        columns={columns}
        onChange={handleColumnsChange}
        mode="edit"
      />
      <CustomColumnsModal
        isOpen={isExportOpen}
        onClose={onExportClose}
        columns={columns}
        onChange={handleColumnsChange}
        mode="export"
        entities={entities}
        entityName={props.entity}
      />
    </Container>
  );
};

export default ResultsPage;
