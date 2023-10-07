import { Box, Nav } from 'grommet';
import { Link } from 'react-router-dom';

import jwt_decode from 'jwt-decode'; // Import jwt_decode if you haven't
import { useGetUserQuery } from '../api/apiSlice'; // Adjust the import based on your folder structure

function Sidebar() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.user_id); // Assuming the user ID in the token is under "user_id"
    }
  }, []);

  const { data: user, isLoading, isError } = useGetUserQuery(userId, {
    skip: !userId, // Skip the query if userId is null
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user information.</p>;

  return (
    <Box background="light-2" width="medium" pad="medium">
      <Box>
        {/* User Profile Info */}
        {user ? (
          <>
            <h4>{user.username}</h4>
            <p>Status: Online</p>
            <img src={user.profile_image} alt="Profile" /> {/* Assuming the user object has a 'profile_image' field */}
          </>
        ) : (
          <p>Status: Offline</p>
        )}
      </Box>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/forums">Forums</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="https://ctd.altama.energy">Exit to Citadel</Link>
        {/* Add more links as needed */}
      </Nav>
    </Box>
  );
}

export default Sidebar;
