import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  InputLabel,
  Box,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
//import { Link } from 'react-router-dom';
import '../Styles/SignInCard.css';
import theme from '../theme';

function CreateProfile() {
  const [companyname, setCompany] = useState('');
  const [linkedIn, setlinkedIn] = useState('');
  const [profession, setProfession] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = JSON.stringify({ companyname, linkedIn, profession, aboutMe });
    console.log(body);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" direction="row">
          <Box m={-17}>
            <Grid item>
              <Grid
                container
                justify="flex-start"
                direction="column"
                className="login-form"
              >
                <Paper
                  variant="elevation"
                  elevation={5}
                  className="login-background"
                >
                  <Grid item>
                    <form onSubmit={handleSubmit}>
                      <Grid container direction="column" spacing={1}>
                        <Grid item>
                          <InputLabel htmlFor="companyname">
                            Company Name
                          </InputLabel>
                          <TextField
                            type="text"
                            fullWidth
                            id="companyname"
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            value={companyname}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </Grid>
                        <Grid item>
                          <InputLabel htmlFor="linkedIn">
                            LinkedIn Profile
                          </InputLabel>
                          <TextField
                            type="text"
                            fullWidth
                            id="linkedIn"
                            variant="outlined"
                            margin="dense"
                            value={linkedIn}
                            onChange={(e) => setlinkedIn(e.target.value)}
                          />
                        </Grid>
                        <Grid item>
                          <InputLabel htmlFor="profession">
                            Profession
                          </InputLabel>
                          <TextField
                            type="text"
                            fullWidth
                            id="profession"
                            variant="outlined"
                            margin="dense"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                          />
                        </Grid>
                        <Grid item>
                          <InputLabel htmlFor="aboutme">
                            About Me (Max. in 1000 words)
                          </InputLabel>
                          <TextField
                            type="textholder"
                            fullWidth
                            multiline
                            id="about me"
                            variant="outlined"
                            margin="dense"
                            rows={8}
                            rowsMax={14}
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                          />
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="center"
                        >
                          <Grid item className="align-box">
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              className="button-block"
                            >
                              Bucket It
                            </Button>
                          </Grid>
                          <Grid item className="align-box">
                            <Button
                              className="button-block"
                              variant="contained"
                              color="secondary"
                            >
                              DOWNLOAD
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
export default CreateProfile;
