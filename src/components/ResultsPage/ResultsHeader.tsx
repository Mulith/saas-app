import {
    Box,
    Heading,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
    Flex,
    Text,
  } from '@chakra-ui/react';
  import { FiSearch } from 'react-icons/fi';
  
  interface ResultsHeaderProps {
    heading: string;
    subHeading: string;
    searchVisible: boolean;
    searchPlaceholder: string;
    searchAlignment: string;
    filtersVisible: boolean;
    toolsVisible: boolean;
   //columns: 
  }
  
  const ResultsHeader = ({ heading, subHeading, searchVisible, searchPlaceholder, searchAlignment, filtersVisible }: ResultsHeaderProps) => {
    return (
      <>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" w="100%" p={5}>
          <Box>
            <Heading>{heading}</Heading>
            <Text>{subHeading}</Text>
          </Box>
          {searchVisible && (
            <Box pt={{ base: 4, md: 0 }}>
              <Stack direction={{ base: 'column', md: 'row' }} justify={searchAlignment}>
                <InputGroup maxW="xs">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiSearch} color="fg.muted" boxSize="5" />
                  </InputLeftElement>
                  <Input placeholder={searchPlaceholder} />
                </InputGroup>
              </Stack>
            </Box>
          )}
        </Flex>
        <Flex direction="row" justify="space-between" align="center" px={5} py={3}>
          {filtersVisible && (
            <Box>
              <Text textStyle="lg" fontWeight="medium">
                Filters Placeholder
              </Text>
            </Box>
          )}
        </Flex>
      </>
    );
  };
  
  export default ResultsHeader;
  