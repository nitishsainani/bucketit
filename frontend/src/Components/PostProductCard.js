import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  InputLabel,
  Typography,
  Box,
  Select,
  MenuItem,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import {
  ThemeProvider,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import theme from '../theme';
import { useHistory } from 'react-router-dom';
import '../Styles/SignInCard.css';

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 14,
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const PostProductCard = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    productName: '',
    category: '',
    websiteLink: '',
    appLink: '',
    oneLineSummary: '',
    description: '',
    uploadLogo: '',
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/reviewproduct',
      values,
    });
    let body = JSON.stringify({
      values,
    });
    console.log(body);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              className="product-form"
            >
              <Box my={4}>
                <Typography variant="h5">
                  <strong>Post a Product</strong>
                </Typography>
              </Box>
              <Paper
                variant="elevation"
                elevation={5}
                className="login-background"
              >
                <Box mx={5}>
                  <Box my={3}>
                    <Grid item>
                      <Typography align="center">
                        <strong>Product Details</strong>
                      </Typography>
                    </Grid>
                  </Box>
                  <Grid item>
                    <form onSubmit={handleSubmit}>
                      <Grid container direction="column" spacing={1}>
                        <Grid item>
                          <InputLabel
                            className={classes.label}
                            htmlFor="productName"
                          >
                            Product Name
                          </InputLabel>
                          <TextField
                            type="text"
                            fullWidth
                            size="small"
                            required
                            id="productName"
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            value={values.productName}
                            onChange={handleChange('productName')}
                          />
                        </Grid>
                        <Grid item>
                          <InputLabel className={classes.label} id="catergory">
                            Category
                          </InputLabel>
                          <Select
                            labelId="catergory"
                            className={classes.label}
                            id="catergory"
                            value={values.category}
                            fullWidth
                            required
                            onChange={handleChange('category')}
                            input={<BootstrapInput />}
                          >
                            <MenuItem value={'EdTech'}>EdTech</MenuItem>
                            <MenuItem value={'E-Commerce'}>E-Commerce</MenuItem>
                            <MenuItem value={'Cabs'}>Cabs</MenuItem>
                            <MenuItem value="Other">
                              <em>Other</em>
                            </MenuItem>
                          </Select>
                        </Grid>
                        <Grid item>
                          <InputLabel
                            className={classes.label}
                            htmlFor="websiteLink"
                          >
                            Website Link
                          </InputLabel>
                          <TextField
                            type="text"
                            fullWidth
                            id="websiteLink"
                            variant="outlined"
                            margin="dense"
                            value={values.websiteLink}
                            onChange={handleChange('websiteLink')}
                          />
                        </Grid>
                        <Grid item>
                          <InputLabel
                            className={classes.label}
                            htmlFor="appLink"
                          >
                            App Link
                          </InputLabel>
                          <TextField
                            type="text"
                            fullWidth
                            id="appLink"
                            variant="outlined"
                            margin="dense"
                            value={values.appLink}
                            onChange={handleChange('appLink')}
                          />
                        </Grid>
                        <Grid item>
                          <InputLabel
                            className={classes.label}
                            htmlFor="oneLineSummary"
                          >
                            One line summary (Character limit:300)
                          </InputLabel>
                          <TextField
                            type="textholder"
                            fullWidth
                            multiline
                            id="oneLineSummary"
                            variant="outlined"
                            margin="dense"
                            rows={2}
                            rowsMax={5}
                            value={values.oneLineSummary}
                            onChange={handleChange('oneLineSummary')}
                          />
                        </Grid>
                        <Grid item align="center">
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="uploadLogo"
                            multiple
                            type="file"
                          />
                          <label htmlFor="uploadLogo">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              className={classes.button}
                            >
                              Upload Logo
                            </Button>
                          </label>{' '}
                        </Grid>
                        <Grid item>
                          <InputLabel
                            className={classes.label}
                            htmlFor="description"
                          >
                            Product Description
                          </InputLabel>
                          <TextField
                            type="textholder"
                            fullWidth
                            multiline
                            required
                            id="description"
                            variant="outlined"
                            margin="dense"
                            rows={8}
                            rowsMax={14}
                            value={values.description}
                            onChange={handleChange('description')}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="button-block"
                          >
                            Review
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};
export default PostProductCard;
