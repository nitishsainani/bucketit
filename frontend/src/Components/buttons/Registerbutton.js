import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
  Button: {
    width: '200px',
  },
  Link: {
    color: '#fafafa',
  },
}));

function RegisterButton() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Link
        to="/register"
        style={{ textDecoration: 'none' }}
        className={classes.Link}
      >
        <Button color="inherit" className={classes.Button}>
          REGISTER
        </Button>
      </Link>
    </ThemeProvider>
  );
}
export default RegisterButton;
