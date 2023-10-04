import React from 'react';
import { Grommet, Box, Header, Main, Sidebar, Text } from 'grommet';
import Sidebar from 'Sidebar';  // Adjust the path based on your directory structure

import { grommet } from 'grommet/themes';

function AppLayout() {
  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Header background="brand" pad="medium">
          <Text size="large" weight="bold">Altama BBS</Text>
          {/* Add navigation items or user profile here */}
        </Header>
        
        <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
          <Main pad="medium" flex>
            {/* Main content goes here, e.g., list of posts or post details */}
            <Text>Main Content Area</Text>
          </Main>

          <Sidebar />

        </Box>
      </Box>
    </Grommet>
  );
}

export default AppLayout;
