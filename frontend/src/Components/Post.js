import React, {useEffect, useState} from 'react';
import { Paper, Box, Grid, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import theme from '../theme';
import BucketIcon from '../images/Bucket.svg';
import CommentIcon from '../images/Comment.svg';
import UpvoteIcon from '../images/Upvote.svg';
import { AuthService, UpvoteService } from '../Services'

export default function Post(props) {
  const [didUserUpvote, setDidUserUpvote] = useState(false);
  const [product, setProduct] = useState(props.product);
  const [isLogin, setIsLogin] = useState(false);

  const toggleUpvote = () => {
    if(!isLogin) {
      props.history.push('/login');
    }
    didUserUpvote ? deleteUpvote() : upvoteProduct()
  }

  const upvoteProduct = () => {
    setDidUserUpvote(true);
    setProduct({...product, ...{upvotesCount: product.upvotesCount+1}})
    UpvoteService.postUpvote(product.id)
      .then(r => setDidUserUpvote(true))
      .catch(r => setDidUserUpvote(true))
  }

  const deleteUpvote = () => {
    setDidUserUpvote(false);
    setProduct({...product, ...{upvotesCount: product.upvotesCount-1}})
    UpvoteService.deleteUpvote(product.id)
      .then(r => setDidUserUpvote(false))
      .catch(r => setDidUserUpvote(false))
  }

  useEffect(() => {
    AuthService.isLogin().then(isLogin => {
      if(!isLogin) return;
      setIsLogin(true);
      console.log(product);
      AuthService.getLoggedInUserObject().then(user => {
        product.upvotes.map(upvote => {
          upvote.user === user.id && setDidUserUpvote(true)
        });
      })
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box mt={2}>
        <Grid item>
          <Paper
            variant="elevation"
            elevation={3}
            style={{
              width: '700px',
              marginInline: '8px',
              padding: '10px 10px',
            }}
          >
            <Box display="flex" direction="row" justify="flex-start">
              <Grid item style={{ margin: '30px 10px 10px' }}>
                <div style={{backgroundColor: didUserUpvote ? "blue" : "white"}}>
                  <IconButton onClick={toggleUpvote} edge="start" color="blue" aria-label="menu">
                    <img src={UpvoteIcon} alt="bucket icon" />
                  </IconButton>
                </div>
                <div style={{ display: 'flex', justify: 'center' }}>
                  {product.upvotesCount}
                </div>
              </Grid>
              <Grid item style={{ margin: '15px 2px 10px' }}>
                <img
                  src={product.logo}
                  alt="product"
                  width="90px"
                  height="90px"
                />
              </Grid>
              <Grid item style={{ marginLeft: '10px', flexGrow: 1 }}>
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="h5"
                      align="left"
                      color="primary"
                    >
                      <strong>{product.title}</strong>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box pt={1}>
                      <Typography
                        variant="subtitle1"
                        align="right"
                        color="secondary"
                      >
                        <strong>Category</strong>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Grid item>
                    <Typography color="textPrimary" variant="subtitle2">
                      {product.description}
                    </Typography>
                  </Grid>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row-reverse"
                  style={{ color: '#c1c7d2' }}
                >
                  <div>
                    <Box display="flex" flexDirection="row" my={1}>
                      <div>
                        <img src={BucketIcon} alt="bucket icon" />
                      </div>
                      <div style={{ padding: '0px' }}>
                        &nbsp;
                        {product.bucketsCount}&nbsp;Buckets
                      </div>
                    </Box>
                  </div>
                  &nbsp;&nbsp;
                  <div>
                    <Box display="flex" flexDirection="row" my={1}>
                      <div>
                        <img src={CommentIcon} alt="bucket icon" />
                      </div>
                      <div style={{ padding: '0px' }}>
                        &nbsp;
                        {product.commentsCount}&nbsp;Comments
                      </div>
                    </Box>
                  </div>
                </Box>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
