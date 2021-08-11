import React, { useState } from 'react';
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

function RegisterCard(props) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    registerButtonDisabled: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setValues({...values, ...{registerButtonDisabled: true}});
    try {
      await AuthService.register(values.firstName, values.lastName, values.email, values.password);
      props.history.push('/');
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
    setValues({...values, ...{registerButtonDisabled: false}});
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
              direction="column"
              justify="flex-start"
              alignItems="center"
              className="register-form"
            >
              <Box my={5}>
                <Typography align="center">
                  <strong>
                    Are you a first time user? Let's get you registered
                  </strong>
                </Typography>
              </Box>
              <Paper
                variant="elevation"
                elevation={5}
                className="login-background"
              >
                <Box mx={5}>
                  <Grid item>
                    <Box my={1}>
                      <Typography align="center">
                        <strong>Register for a free account</strong>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <form onSubmit={handleSubmit}>
                      <Grid container direction="column" spacing={0}>
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="center"
                        >
                          <Grid item className="align-box">
                            <TextField
                              type="text"
                              placeholder="First Name"
                              fullWidth
                              name="firstName"
                              variant="outlined"
                              required
                              autoFocus
                              margin="dense"
                              value={values.firstName}
                              onChange={handleChange('firstName')}
                            />
                          </Grid>
                          <Grid item className="align-box">
                            <TextField
                              type="text"
                              placeholder="Last Name"
                              fullWidth
                              name="lastName"
                              variant="outlined"
                              required
                              margin="dense"
                              value={values.lastName}
                              onChange={handleChange('lastName')}
                            />
                          </Grid>
                        </Grid>

                        <Grid item>
                          <TextField
                            type="email"
                            placeholder="Email"
                            fullWidth
                            name="email"
                            variant="outlined"
                            required
                            margin="dense"
                            value={values.email}
                            onChange={handleChange('email')}
                          />
                        </Grid>
                        <Box my={1}>
                          <Grid
                            container
                            direction="row"
                            spacing={1}
                            justify="center"
                          >
                            <Grid item className="align-box">
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
                            <Grid item className="align-box">
                              <OutlinedInput
                                placeholder="Confirm"
                                fullWidth
                                name="confirmPassword"
                                variant="outlined"
                                required
                                margin="dense"
                                notched={false}
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
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
                          </Grid>
                        </Box>
                        <Typography color="error">{errorMessage}</Typography>
                        <Grid item>
                          <Box my={1}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              className="button-block"
                              disabled={values.registerButtonDisabled}
                            >
                              Register
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                  <Grid item>
                    <Typography align="center" className="register" spacing={1}>
                      Already registered?&nbsp;
                      <Link
                        style={{ textDecoration: 'none', color: '#1574F6' }}
                        to="/login"
                      >
                        <strong>Sign In</strong>
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

export default RegisterCard;
