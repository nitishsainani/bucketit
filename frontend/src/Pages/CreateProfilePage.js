import React from 'react';
import Navbar from '../Components/Navbar';
import { ThemeProvider } from '@material-ui/core/styles';
import CreateProfile from '../Components/CreateProfile';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import theme from '../theme';

function CreateProfilePage() {
  return (
    <>
      <Navbar register={true} disablePost={false} />
      <ThemeProvider theme={theme}>
        <Box my={8}>
          <Typography variant="h4" align="center">
            <strong>
              Welcome! Let's build your profile! Bucketed community wants to
              know you better
            </strong>
          </Typography>
        </Box>
        <Box my={8}>
          <CreateProfile />
        </Box>
      </ThemeProvider>
    </>
  );
}
export default CreateProfilePage;
