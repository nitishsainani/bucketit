import React, {useEffect, useState} from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import BucketIcon from '../images/Bucket.svg';
import { Link } from 'react-router-dom';
import RegisterButton from './buttons/Registerbutton';
import Signinbutton from './buttons/Signinbutton';
import Adminbutton from './buttons/Adminbutton';
import Logoutbutton from './buttons/Logoutbutton';
import Postproductbutton from './buttons/Postproductbutton';
import { AuthService } from '../Services';
import theme from '../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: 'nowrap',
  },
  Button: {
    width: '200px',
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const [signIn, setSignIn] = useState(false);
  const [register, setRegister] = useState(false);
  const [logout, setLogout] = useState(false);
  const [post, setPost] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [disablePost, setDisablePost] = useState(false);

  useEffect(() => {
    AuthService.isLogin().then(isLogin => {
      setPost(isLogin);
      setRegister(!isLogin);
      setLogout(isLogin);

      props.registerPage && (setRegister(false) || setSignIn(true))
    })
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <IconButton
                edge="start"
                className={classes.MuiButton}
                color="primary"
                aria-label="menu"
              >
                <img src={BucketIcon} alt="bucket icon" />
              </IconButton>
            </Link>

            <Box
              display="flex"
              flexGrow={1}
              justifyContent="flex-end"
              m={1}
              p={1}
            >
              {post && <Postproductbutton disablePost={disablePost} />}
              {admin && <Adminbutton />}
              {register && <RegisterButton />}
              {signIn && <Signinbutton />}
              {logout && <Logoutbutton />}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default Navbar;
