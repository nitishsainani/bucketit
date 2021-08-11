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

function Postproductbutton({ disablePost = true }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Link
        to="/postproduct"
        className="text-link "
        style={disablePost ? { pointerEvents: 'none' } : null}
      >
        <Button
          variant="contained"
          color="secondary"
          type="button"
          className={classes.Button}
          disabled={disablePost}
        >
          POST PRODUCT
        </Button>
      </Link>
    </ThemeProvider>
  );
}
export default Postproductbutton;
