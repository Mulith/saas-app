import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiEdit2, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { IoArrowDown } from 'react-icons/io5';
import { Rating } from './Rating';
import { GridTableProps, GenericEntity } from '../app/types';

export const GridTable = <T extends GenericEntity>(props: GridTableProps & { entities: T[] }) => {
  const {
    allowCheckboxes = false,
    gridActions = { visible: false, delete: false, edit: false, menu: false },
    columns = [],
    start = 0,
    resultsPerPage = 10,
    entities = []
  } = props;

  if (!entities || entities.length === 0) {
    return <Text>No data available</Text>;
  }

  const visibleColumns = columns.filter(column => column.visible);

  // Create a mapping function to get the correct entity property
  const getColumnType = (entity: T, columnType: string, columnName: string, columnWidth?: string) => {
    const lowerCaseColumnType = columnType.toLowerCase();
    const lowerCaseColumnName = columnName.toLowerCase();
    
    const parsedAttributes = columnWidth ? parseAttribute(columnWidth) : {};
    
    switch (lowerCaseColumnType) {
      case 'profile':
        return (
          <HStack spacing="3">
            <Avatar name={entity.name} src={entity.avatarUrl} boxSize="10" />
            <Box>
              <Text fontWeight="medium">{entity.name}</Text>
              <Text color="fg.muted">{entity.handle}</Text>
            </Box>
          </HStack>
        );
      case 'status':
        return (
          <Badge colorScheme={entity.status === 'active' ? 'green' : 'red'} {...parsedAttributes}>
            {entity.status}
          </Badge>
        );
      case 'email':
        return <Text color="fg.muted" {...parsedAttributes}>{entity.email}</Text>;
      case 'text':
        return <Text color="fg.muted" {...parsedAttributes}>{entity[lowerCaseColumnName]}</Text>;
      case 'rating':
        return <Rating defaultValue={entity.rating} {...parsedAttributes} />;
      case 'members':
        return (
          <AvatarGroup {...parsedAttributes} max={3}>
            {entity.users.map((user: any) => (
              <Avatar key={user._id} name={user.name} src={user.avatarUrl} />
            ))}
          </AvatarGroup>
        );
      default:
        return <Text {...parsedAttributes}>{entity[lowerCaseColumnName]}</Text>;
    }
  };

  // Helper function to parse the columnWidth attribute
  const parseAttribute = (attribute: string) => {
    const [key, value] = attribute.split('=');
    return { [key]: value ? value.replace(/["']/g, '') : '' }; // Remove quotes if present and handle undefined
  };

  // Pagination logic: slice the entities based on the current start index and results per page
  const paginatedEntities = props.entities.slice(props.start, props.start + props.resultsPerPage);

  return (
    <Table>
      <Thead>
        <Tr>
          {props.allowCheckboxes && <Th width="20px"><Checkbox /></Th>}
          {visibleColumns.map(column => (
            <Th key={column.name} width={column.columnWidth}>
              <HStack spacing="3">
                <Text>{column.label}</Text> {/* Ensure the label is used for the header */}
                {column.sortable && <Icon as={IoArrowDown} />}
              </HStack>
            </Th>
          ))}
          {props.gridActions.visible && <Th />} {/* Additional blank <Th> when gridActions.visible is true */}
        </Tr>
      </Thead>
      <Tbody>
        {paginatedEntities.map((entity, index) => (
          <Tr key={index}>
            {props.allowCheckboxes && <Td><Checkbox /></Td>}
            {visibleColumns.map(column => (
              <Td key={column.name}>{getColumnType(entity, column.type, column.name, column.columnWidth)}</Td>
            ))}
            {props.gridActions.visible && (
              <Td>
                <HStack spacing="1" justify="right">
                  {props.gridActions.edit && <IconButton aria-label="Edit" icon={<FiEdit2 />} size="sm" />}
                  {props.gridActions.delete && <IconButton aria-label="Delete" icon={<FiTrash2 />} size="sm" />}
                  {props.gridActions.menu && <IconButton aria-label="More" icon={<FiMoreVertical />} size="sm" />}
                </HStack>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
