import { Box, Button, Collapse, HStack, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { FiChevronDown, FiFile } from 'react-icons/fi'

const applicationItems = ['My App Admin', 'My App', 'My App User Portal', 'My App Data Service'];

export const ApplicationCollapse = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box>
      <Button
        variant="tertiary.accent"
        onClick={onToggle}
        justifyContent="space-between"
        width="full"
      >
        <HStack spacing="3">
          <Icon as={FiFile} />
          <Text as="span">Applications</Text>
        </HStack>
        <PopoverIcon isOpen={isOpen} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" alignItems="stretch" ps="8" py="1">
          {applicationItems.map((item) => (
            <Button key={item} variant="tertiary.accent" justifyContent="start">
              {item}
            </Button>
          ))}
        </Stack>
      </Collapse>
    </Box>
  )
}

export const PopoverIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
  }
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />
}
