import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import theme from '../../theme';
import '../../Styles/SignInCard.css';

const useStyles = makeStyles((theme) => ({
  Button: {
    width: '200px',
  },
}));

function Aminbutton({ disablePost = true }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Link to="/admin" className="text-link ">
        <Button
          variant="contained"
          color="secondary"
          type="button"
          className={classes.Button}
        >
          Admin
        </Button>
      </Link>
    </ThemeProvider>
  );
}
export default Aminbutton;
