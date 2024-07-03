import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import {
  FiUser,
  FiShoppingCart,
  FiGrid,
  FiHelpCircle,
  FiMoreVertical,
  FiUsers,
  FiSearch,
  FiSettings,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ApplicationCollapse } from './ApplicationCollapse';
import { Logo } from './Logo';
import { SidebarButton } from './SidebarButton';

type NavItem = 
  | { icon: IconType, label: string, path: string, component?: undefined }
  | { component: () => JSX.Element, icon?: undefined, label?: undefined, path?: undefined };

const navItems: NavItem[] = [
  { icon: FiGrid, label: 'Dashboard', path: '/' },
  { component: ApplicationCollapse },
  { icon: FiUser, label: 'Users', path: '/users' },
  { icon: FiUsers, label: 'Teams', path: '/teams' },
  { icon: FiShoppingCart, label: 'Billing', path: '/billing' },
  { icon: FiHelpCircle, label: 'Help Center', path: '/help' },
  { icon: FiSettings, label: 'Settings', path: '/settings' }
];

export const NavBar = () => (
  <Flex 
    as="section" 
    minH="100vh" 
    position="static">
    <Stack
      flex="1"
      maxW={{ base: 'full', sm: 'xs' }}
      py={{ base: '6', sm: '8' }}
      px={{ base: '4', sm: '6' }}
      bg="bg.accent.default"
      color="fg.accent.default"
      borderRightWidth="1px"
      justifyContent="space-between"
    >
      <Stack spacing="8">
        <Logo alignSelf="start" />
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiSearch} color="fg.accent.muted" fontSize="lg" />
          </InputLeftElement>
          <Input placeholder="Search" variant="filled.accent" />
        </InputGroup>
        <Stack spacing="1">
          {navItems.map((item, index) => (
            item.component ? (
              <item.component key={index} />
            ) : (
              <ChakraLink as="a" href={item.path} style={{ textDecoration: 'none' }} key={index}>
                <SidebarButton leftIcon={<Icon as={item.icon} />}>
                  {item.label}
                </SidebarButton>
              </ChakraLink>
            )
          ))}
        </Stack>
      </Stack>
      <Stack spacing="4" divider={<StackDivider borderColor="bg.accent.subtle" />}>
        <Box />
        <Stack spacing="1">
          {navItems.slice(5).map((item, index) => (
            item.icon && item.label && item.path && (
              <ChakraLink as="a" href={item.path} style={{ textDecoration: 'none' }} key={index}>
                <SidebarButton leftIcon={<Icon as={item.icon} />}>
                  {item.label}
                </SidebarButton>
              </ChakraLink>
            )
          ))}
        </Stack>
      </Stack>
    </Stack>
  </Flex>
);
