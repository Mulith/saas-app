import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { Link as ChakraLink } from '@chakra-ui/next-js';

const DynamicBreadcrumb = () => {
  const pathname = usePathname() ?? ''; // Ensure pathname is a string

  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={ChakraLink} href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink as={ChakraLink} href={path}>
              {segment}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
