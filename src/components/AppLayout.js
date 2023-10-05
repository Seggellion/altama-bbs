import React from 'react';
import { Grommet, Box, Header, Main, Sidebar, Text } from 'grommet';
import CustomSidebarContent from './Sidebar';  // Adjust the path based on your directory structure

import { grommet } from 'grommet/themes';
import customTheme from '../path-to-theme/theme';  // Adjust path


function AppLayout({ children }) {
  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Header background="brand" pad="medium">
        <Text size="large" weight="bold" color="accent-1">Altama BBS</Text>
          {/* Add navigation items or user profile here */}
        </Header>
        
        <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
          <Main pad="medium" flex>
            {children}  {/* Render the appropriate content based on the route */}
          </Main>

          <Sidebar background="light-1" width="medium" pad="medium">
            <CustomSidebarContent />
          </Sidebar>
        </Box>
      </Box>
    </Grommet>
  );
}

export default AppLayout;
