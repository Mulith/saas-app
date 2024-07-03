import {
    HStack,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    VStack,
    Radio,
    RadioGroup,
    useDisclosure,
  } from '@chakra-ui/react';
  import { FiGrid, FiDownload, FiPieChart, FiColumns, FiList } from 'react-icons/fi';
  
  interface ResultsToolbarProps {
    viewType: 'list' | 'grid';
    onChangeViewType: (viewType: 'list' | 'grid') => void;
    allowChangeView: boolean;
    allowCustomColumns: boolean;
    onEditOpen: () => void;
    allowExport: boolean;
    onExportOpen: () => void;
    allowGraph: boolean;
  }
  
  const ResultsToolbar = ({
    viewType,
    onChangeViewType,
    allowChangeView,
    allowCustomColumns,
    onEditOpen,
    allowExport,
    onExportOpen,
    allowGraph,
  }: ResultsToolbarProps) => {
    const { onClose, isOpen, onOpen } = useDisclosure();
  
    const handleViewTypeChange = (nextValue: string) => {
      onChangeViewType(nextValue as 'list' | 'grid');
      onClose();
    };
  
    return (
      <HStack spacing="2">
        {allowChangeView && (
          <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <IconButton aria-label="Toggle view type" icon={viewType === 'list' ? <FiList /> : <FiGrid />} onClick={onOpen} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Choose View</PopoverHeader>
              <PopoverBody>
                <RadioGroup onChange={handleViewTypeChange} value={viewType}>
                  <VStack align="start">
                    <Radio value="list">List View</Radio>
                    <Radio value="grid">Grid View</Radio>
                  </VStack>
                </RadioGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
        {allowCustomColumns && <IconButton aria-label="Edit columns and layout" icon={<FiColumns />} onClick={onEditOpen} />}
        {allowExport && <IconButton aria-label="Export the list" icon={<FiDownload />} onClick={onExportOpen} />}
        {allowGraph && <IconButton aria-label="Convert to dashboard tile" icon={<FiPieChart />} />}
      </HStack>
    );
  };
  
  export default ResultsToolbar;
  