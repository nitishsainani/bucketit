import { Box, Button, Paper, Grid, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Navbar from '../Components/Navbar';
import theme from '../theme';
import { Link } from 'react-router-dom';
import '../Styles/SignInCard.css';

const AdminPage = () => {
  const products = [
    {
      productname: "Byju's",
      category: 'Edtech',
      oneline: 'this is the one line description',
      website: 'www.byjus.com',
      applink: 'www.byjus.com/app',
      description: 'edtech product',
    },
    {
      productname: 'Signal',
      category: 'Communication',
      oneline: 'this is the one line description',
      website: 'www.signal.com',
      applink: 'www.signal.com/app',
      description: "We don't care about you",
    },
  ];
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar register={false} post={false} admin={true} logout={true} />
        <Box mt={7}>
          {products.map((product, index) => (
            <Box key={index} my={2}>
              <Grid container direction="row" spacing={2} justify="center">
                <Paper
                  variant="elevation"
                  elevation={5}
                  className="login-background"
                  style={{ width: '30%' }}
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
                          <strong>{product.productname}</strong>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Box pt={0.75}>
                          <Typography
                            variant="subtitle1"
                            align="right"
                            color="secondary"
                          >
                            <strong>{product.category}</strong>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box my={1}>
                      <Grid item>
                        <Typography variant="subtitle2" align="left">
                          <strong>{product.oneline}</strong>
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
                          {product.description}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box my={1}>
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          align="left"
                        >
                          Website:&nbsp;
                          <Link
                            style={{ textDecoration: 'none', color: '#1574F6' }}
                            to={product.website}
                          >
                            {product.website}
                          </Link>
                        </Typography>
                      </Grid>
                    </Box>
                    <Box my={1}>
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          align="left"
                        >
                          App link:&nbsp;
                          <Link
                            style={{ textDecoration: 'none', color: '#1574F6' }}
                            to={product.applink}
                          >
                            {product.applink}
                          </Link>
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                </Paper>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Approve
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Reject
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </ThemeProvider>
    </>
  );
};
export default AdminPage;
