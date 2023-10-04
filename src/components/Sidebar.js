import { Box, Nav, Anchor } from 'grommet';

function Sidebar() {
  return (
    <Box background="light-2" width="medium" pad="medium">
      <Box>
        {/* User Profile Info */}
        <h4>User123</h4>
        <p>Status: Online</p>
      </Box>
      <Nav>
        <Anchor href="/" label="Home" />
        <Anchor href="/forums" label="Forums" />
        {/* Add more links as needed */}
      </Nav>
    </Box>
  );
}

export default Sidebar;
