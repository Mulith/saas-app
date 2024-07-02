"use client";

import { Box, Heading, Text, Container, Tabs, TabList, Tab,TabPanel, TabPanels, TabIndicator } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }} maxW="100%">
      <Tabs align='end' variant='underline'>
        <TabList>
          <Tab >Dashboard 1</Tab>
          <Tab>Dashboard 2</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            Content Here
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default DashboardPage;
