import Box from '@mui/material/Box';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      maxWidth="1210px"
      boxSizing="content-box"
      p="15px"
      margin="0 auto"
    >
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </Box>
  );
};

export default MainLayout;
