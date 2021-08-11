import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import theme from '../../theme';
import { AuthService } from '../../Services';

const useStyles = makeStyles((theme) => ({
  Button: {
    width: '200px',
  },
  Link: {
    color: '#fafafa',
  },
}));

function Logoutbutton() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Link
        to="/login"
        style={{ textDecoration: 'none' }}
        className={classes.Link}
      >
        <Button onClick={AuthService.logout} color="inherit" className={classes.Button}>
          LOGOUT
        </Button>
      </Link>
    </ThemeProvider>
  );
}
export default Logoutbutton;
