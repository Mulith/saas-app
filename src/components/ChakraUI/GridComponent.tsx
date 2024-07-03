import { Box, SimpleGrid, Text, HStack, IconButton, Stack, Button } from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { useState } from 'react';
import { GenericEntity, ColumnConfig } from '../../app/types';

interface GridComponentProps<T extends GenericEntity> {
  entities: T[];
  columns: ColumnConfig[];
  gridActions: { edit: boolean; delete: boolean; menu: boolean; visible: boolean };
  resultsPerPage: number;
  pagination: boolean;
}

export const GridComponent = <T extends GenericEntity>({
  entities,
  columns,
  gridActions = { edit: false, delete: false, menu: false, visible: false },
  resultsPerPage,
  pagination,
}: GridComponentProps<T>) => {
  const [start, setStart] = useState(0);

  const handleNext = () => {
    const maxStartIndex = Math.max(entities.length - (entities.length % resultsPerPage) + 1, 0);
    setStart(prevStart => Math.min(prevStart + resultsPerPage, maxStartIndex));
  };

  const handlePrevious = () => {
    setStart(prevStart => Math.max(prevStart - resultsPerPage, 0));
  };

  const paginatedEntities = pagination ? entities.slice(start, start + resultsPerPage) : entities;

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {paginatedEntities.map((entity, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
            {columns.map(column => (
              <Text key={column.name}>{entity[column.name]}</Text>
            ))}
            <HStack spacing="1" justify="right" mt={3}>
              {gridActions.edit && <IconButton aria-label="Edit" icon={<FiEdit2 />} size="sm" />}
              {gridActions.delete && <IconButton aria-label="Delete" icon={<FiTrash2 />} size="sm" />}
              {gridActions.menu && <IconButton aria-label="More" icon={<FiMoreVertical />} size="sm" />}
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
      {pagination && (
        <Stack direction="row" spacing={4} mt={4} justify="center">
          <Button onClick={handlePrevious} disabled={start === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={start + resultsPerPage >= entities.length}>
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
};
