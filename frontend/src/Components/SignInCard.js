import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../Styles/SignInCard.css';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AuthService } from '../Services';


function SignInCard(props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    signInButtonDisabled: false,
  });

  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setValues({...values, ...{signInButtonDisabled: true}});
    try {
      await AuthService.login(values.email, values.password);
      props.history.push('/');
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
    setValues({...values, ...{signInButtonDisabled: false}});
  };

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Grid container justify="center" direction="row">
        <Grid item>
          <Box my={-15}>
            <Grid
              container
              justify="flex-start"
              direction="column"
              className="login-form"
            >
              <Box my={5}>
                <Typography align="center">
                  <strong>Welcome back! Let's get you inside</strong>
                </Typography>
              </Box>
              <Paper
                variant="elevation"
                elevation={5}
                className="login-background"
              >
                <Box mx={5}>
                  <Box mt={2}>
                    <Grid item>
                      <Typography align="center">
                        <strong>Sign In</strong>
                      </Typography>
                    </Grid>
                  </Box>
                  <Grid item>
                    <form onSubmit={handleSubmit}>
                      <Grid container direction="column" spacing={1}>
                        <Grid item>
                          <TextField
                            type="email"
                            placeholder="Email"
                            fullWidth
                            name="email"
                            variant="outlined"
                            required
                            autoFocus
                            margin="dense"
                            value={values.email}
                            onChange={handleChange('email')}
                          />
                        </Grid>
                        <Grid item>
                          <OutlinedInput
                            placeholder="Password"
                            fullWidth
                            name="password"
                            variant="outlined"
                            required
                            margin="dense"
                            notched={false}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </Grid>
                        <Typography color="error">{errorMessage}</Typography>
                        <Grid item>
                          <Box my={1}>
                            <Button
                              disabled={values.signInButtonDisabled}
                              variant="contained"
                              color="primary"
                              type="submit"
                              className="button-block"
                            >
                              Sign In
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                  <Grid item>
                    <Typography align="center" className="register">
                      New to Bucket It?&nbsp;
                      <Link
                        to="/register"
                        style={{ textDecoration: 'none', color: '#1574F6' }}
                      >
                        <strong>Register</strong>
                      </Link>
                    </Typography>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignInCard;
