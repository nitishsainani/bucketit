import { Button, Grid, Paper, Typography, Box } from '@material-ui/core';
import '../Styles/SignInCard.css';
import { ThemeProvider } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import theme from '../theme';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function ReviewProductCard(props) {
  const history = useHistory();

  const handleEdit = (e) => {
    history.goBack();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://jsonplaceholder.typicode.com/posts', props)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" direction="row">
          <Grid item>
            <Box my={-5}>
              <Grid
                container
                direction="column"
                justify="center"
                className="product-review"
              >
                <Box my={2}>
                  <Typography variant="h5">
                    <strong>Review Product Details</strong>
                  </Typography>
                </Box>
                <Paper
                  variant="elevation"
                  elevation={5}
                  className="login-background"
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
                            to={props.website}
                          >
                            {props.website}
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
                            to={props.applink}
                          >
                            {props.applink}
                          </Link>
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box mt={3}>
                      <Grid
                        container
                        direction="row"
                        spacing={6}
                        justify="center"
                      >
                        <Grid item className="align-box">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleSubmit}
                            className="button-block"
                          >
                            POST PRODUCT
                          </Button>
                        </Grid>
                        <Grid item className="align-box">
                          <Button
                            className="button-block"
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                          >
                            EDIT
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Paper>
                <Box m={4}>
                  <Box mt={1}>
                    <Paper variant="outlined" className="fixed-notification">
                      <Grid container direction="row" justify="center">
                        <Grid item>
                          <ErrorOutlineIcon color="primary" fontSize="large" />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">
                            We will review your product details and notify you
                            <br /> on your registered E-mail when product is
                            live.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
export default ReviewProductCard;
