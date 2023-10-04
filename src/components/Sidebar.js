import { Box, Nav } from 'grommet';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Box background="light-2" width="medium" pad="medium">
      <Box>
        {/* User Profile Info */}
        <h4>User123</h4>
        <p>Status: Online</p>
      </Box>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/forums">Forums</Link>
        <Link to="/create-post" label="Create Post">Create post</Link>
        {/* Add more links as needed */}
      </Nav>
    </Box>
  );
}

export default Sidebar;
