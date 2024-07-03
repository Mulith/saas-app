import { Box, Stack } from '@chakra-ui/react';
import { GridTable } from '@/components/ChakraUI/GridTable';
import { TableFooter } from '@/components/ChakraUI/TableFooter';
import { GridComponent } from '@/components/ChakraUI/GridComponent';
import { GenericEntity, ColumnConfig, GridActionsConfig } from '../../../app/types';

interface ResultsContentProps<T extends GenericEntity> {
  viewType: 'list' | 'grid';
  entities: T[];
  columns: ColumnConfig[];
  start: number;
  resultsPerPage: number;
  onNext: () => void;
  onPrevious: () => void;
  gridActions: GridActionsConfig;
  pagination: boolean;
  visible: boolean; // Add this line
}

const ResultsContent = <T extends GenericEntity>({
  viewType,
  entities,
  columns,
  start,
  resultsPerPage,
  onNext,
  onPrevious,
  gridActions,
  pagination,
  visible,
}: ResultsContentProps<T>) => {
  const renderListView = () => (
    <>
      <Box overflowX="auto">
        <GridTable
          allowCheckboxes={true}
          columns={columns}
          gridActions={gridActions}
          resultsPerPage={resultsPerPage}
          start={start}
          entities={entities}
          pagination={pagination}
          visible={visible} // Add this line
        />
      </Box>
      <TableFooter
        rows={entities.length}
        start={start}
        results={resultsPerPage}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </>
  );

  const renderGridView = () => (
    <GridComponent
      entities={entities}
      columns={columns}
      gridActions={gridActions}
      resultsPerPage={resultsPerPage}
      pagination={pagination}
    />
  );

  return <Stack spacing="5">{viewType === 'list' ? renderListView() : renderGridView()}</Stack>;
};

export default ResultsContent;
