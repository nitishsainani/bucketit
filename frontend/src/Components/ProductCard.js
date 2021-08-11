import React, { useState } from 'react';
import {
  Grid,
  Button,
  Paper,
  Typography,
  Box,
  TextField,
} from '@material-ui/core';
import '../Styles/ProductCard.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import UpvotePrimaryIcon from '../images/Upvoteprimary.svg';
import BucketPrimaryIcon from '../images/BucketPrimary.svg';
import DownloadSecondaryIcon from '../images/DownloadSecondary.svg';
import UpvoteIcon from '../images/Upvote.svg';
import BucketIcon from '../images/Bucket.svg';
import DownloadIcon from '../images/Download.svg';
import Avatar from '@material-ui/core/Avatar';

function ProductCard(props) {
  const [comment, setComment] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = JSON.stringify(comment);
    console.log(body);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" direction="row" spacing={10}>
          <Grid item>
            <Grid container justify="flex-start" direction="column" spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className="upvote-button"
                >
                  Upvote&nbsp;
                  <img src={UpvotePrimaryIcon} alt="upvote icon" />
                </Button>
              </Grid>
              <Grid item>
                <Paper
                  variant="elevation"
                  elevation={0}
                  style={{ color: '#c1c7d2', fontSize: '14px' }}
                  align="center"
                >
                  <Box my={1}>
                    <img src={UpvoteIcon} alt="upvote icon" />
                    &nbsp;{props.quantity}
                  </Box>
                  <Box my={1}>
                    <img src={BucketIcon} alt="bucket icon" />
                    {props.quantity}
                  </Box>
                  <Box my={1}>
                    <img src={DownloadIcon} alt="download icon" />
                    &nbsp;{props.quantity}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box my={0}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                spacing={2}
              >
                <Grid item>
                  <Paper
                    variant="elevation"
                    elevation={1}
                    className="product-desc"
                  >
                    <Grid item>
                      <Grid container direction="row" justify="space-between">
                        <Grid item>
                          <Typography
                            gutterBottom
                            variant="h5"
                            align="left"
                            color="primary"
                          >
                            <strong>{props.productname}</strong>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Box pt={0.75}>
                            <Typography
                              variant="subtitle1"
                              align="right"
                              color="secondary"
                            >
                              <strong>{props.category}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box my={1}>
                        <Grid item>
                          <Typography variant="subtitle2" align="left">
                            <strong>{props.oneline}</strong>
                          </Typography>
                        </Grid>
                      </Box>
                      <Box my={1}>
                        <Grid item>
                          <Typography
                            color="textPrimary"
                            variant="subtitle2"
                            align="left"
                          >
                            {props.description}
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={10}
                    alignItems="center"
                  >
                    <Grid item>
                      <Paper
                        elevation={0}
                        style={{
                          color: '#8693AE',
                          backgroundColor: '#F0F6FF',
                          padding: '12px',
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: '#DBE9FE',
                          }}
                        >
                          <Typography color="primary">
                            Bucket It&nbsp;
                            <img src={BucketPrimaryIcon} alt="Bucket icon" />
                          </Typography>
                        </Button>
                        <Typography style={{ fontSize: '10px' }}>
                          Liked the product ? Appreciate the creator
                          <br />
                          by savind it in your bucket
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        elevation={0}
                        style={{
                          color: '#8693AE',
                          backgroundColor: '#F0F6FF',
                          padding: '12px',
                        }}
                      >
                        <Button style={{ backgroundColor: '#F3E5D8' }}>
                          <Typography color="secondary">
                            Get It &nbsp;
                            <img
                              src={DownloadSecondaryIcon}
                              alt="Download icon"
                            />
                          </Typography>
                        </Button>
                        <Typography
                          color="primary"
                          style={{ fontSize: '10px' }}
                        >
                          #5 trending product of the week
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" justify="center">
                    <Paper
                      variant="elevation"
                      elevation={4}
                      style={{ width: '80%' }}
                    >
                      <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        style={{ padding: '8px' }}
                      >
                        <Grid item>
                          <Box display="flex" flexDirection="row">
                            <Avatar
                              style={{
                                height: '30px',
                                width: '30px',
                              }}
                            >
                              {props.username[0]}
                            </Avatar>
                            &nbsp;
                            <Box mt={1}>
                              <strong>{props.username}</strong>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item>
                          <form onSubmit={handleSubmit}>
                            <Box display="flex">
                              <Box flexGrow={1} pl={4} pr={2}>
                                <TextField
                                  type="text"
                                  placeholder="Write a comment...."
                                  name="comment"
                                  variant="outlined"
                                  fullWidth
                                  margin="dense"
                                  value={comment}
                                  onChange={(e) => {
                                    setComment(e.target.value);
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box display="flex" flexDirection="row-reverse">
                              <Button type="submit">
                                <Typography color="primary">POST</Typography>
                              </Button>
                            </Box>
                          </form>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item>
                  {props.comments.map((comment, index) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column"
                      pt={1}
                    >
                      <Grid item>
                        <Grid container direction="row" justify="center">
                          <Paper
                            variant="elevation"
                            elevation={0}
                            style={{
                              width: '80%',
                              color: '#8693AE',
                              backgroundColor: '#F0F6FF',
                            }}
                          >
                            <Grid
                              container
                              direction="column"
                              justify="flex-start"
                              style={{ padding: '8px' }}
                            >
                              <Grid item>
                                <Box display="flex" flexDirection="row">
                                  <Avatar
                                    style={{
                                      height: '30px',
                                      width: '30px',
                                    }}
                                  >
                                    {comment.username[0]}
                                  </Avatar>
                                  &nbsp;
                                  <Box mt={1} style={{ fontSize: '14px' }}>
                                    <strong>{comment.username}</strong>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item>
                                <Box display="flex">
                                  <Box flexGrow={1} pl={4} pr={2}>
                                    <Typography
                                      style={{
                                        color: 'black',
                                        fontSize: '12px',
                                      }}
                                    >
                                      {comment.value}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box pl={4} pr={2} style={{ fontSize: '8px' }}>
                                  {comment.time}
                                </Box>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Paper
              elevation={0}
              style={{
                color: '#8693AE',
                backgroundColor: '#F0F6FF',
                padding: '8px',
              }}
            >
              <Grid container direction="column" justify="center">
                <Grid item style={{ fontSize: '12px' }}>
                  Posted by
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    spacing={1}
                  >
                    <Grid item>
                      <Avatar style={{ height: '30px', width: '30px' }}>
                        {props.owner[0]}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Box mt={1}>{props.owner}</Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
export default ProductCard;
