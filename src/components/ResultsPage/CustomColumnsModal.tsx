import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Input,
} from '@chakra-ui/react';
import { ColumnConfig } from '../../app/types';
import { CSVLink } from "react-csv";

interface CustomColumnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnConfig[];
  onChange: (updatedColumns: ColumnConfig[]) => void;
  mode: "edit" | "export"; // New prop to specify the mode
  entities?: any[]; // Entities data to export
  entityName?: string; // Entity name for the file name
}

const CustomColumnsModal: React.FC<CustomColumnsModalProps> = ({ isOpen, onClose, columns, onChange, mode, entities, entityName }) => {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<ColumnConfig[]>([]);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (columns) {
      setLocalColumns(columns); // Ensure columns is an array
      setSelectedColumns(columns.filter(column => column.visible));
      console.log('Columns in Modal:', columns); // Debug log
    }

    if (entityName) {
      const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      setFileName(`${entityName}-${date}.csv`);
    }
  }, [columns, entityName]);

  const handleCheckboxChange = (columnName: string) => {
    const updatedColumns = localColumns.map(column =>
      column.name === columnName ? { ...column, visible: !column.visible } : column
    );
    setLocalColumns(updatedColumns);
    setSelectedColumns(updatedColumns.filter(column => column.visible));
  };

  const handleSave = () => {
    onChange(localColumns);
    onClose();
  };

  const handleExport = () => {
    const headers = selectedColumns.map(column => ({ label: column.label, key: column.name }));
    const data = entities?.map(entity => {
      const row: any = {};
      selectedColumns.forEach(column => {
        row[column.name] = entity[column.name];
      });
      return row;
    }) || []; // Ensure data is never undefined

    return { headers, data };
  };

  const exportData = handleExport();

  const handleExportClick = () => {
    onClose(); // Close the drawer
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{mode === "edit" ? "Edit Columns" : "Export Columns"}</DrawerHeader>
          <DrawerBody>
            {mode === "export" && (
              <Box mb={4}>
                <Input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name"
                />
              </Box>
            )}
            <VStack align="start">
              <CheckboxGroup>
                {localColumns.map(column => (
                  <Checkbox
                    key={column.name}
                    isChecked={column.visible}
                    onChange={() => handleCheckboxChange(column.name)}
                  >
                    {column.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack spacing={3}>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              {mode === "edit" ? (
                <Button colorScheme="blue" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <CSVLink data={exportData.data} headers={exportData.headers} filename={fileName}>
                  <Button colorScheme="green" onClick={handleExportClick}>Export</Button>
                </CSVLink>
              )}
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CustomColumnsModal;
