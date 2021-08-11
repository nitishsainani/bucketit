import React from 'react';
import Navbar from '../Components/Navbar';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import PostProductCard from '../Components/PostProductCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    width: '90%',
    marginLeft: '30%',
  },
});

const theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
});

function PostProductPage() {
  const classes = useStyles();

  return (
    <>
      <Navbar register={true} disablePost={true} />
      <ThemeProvider theme={theme}>
        <div className={classes.root}></div>
      </ThemeProvider>
      <PostProductCard />
    </>
  );
}
export default PostProductPage;
