import React from 'react';
import Navbar from '../Components/Navbar';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import ReviewProductCard from '../Components/ReviewProductCard';

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

function ReviewProductPage(props) {
  const classes = useStyles();
  const {
    productName,
    category,
    websiteLink,
    appLink,
    oneLineSummary,
    description,
    uploadLogo,
  } = (props.location && props.location.values) || {};
  return (
    <>
      <Navbar register={true} disablePost={true} />
      <ThemeProvider theme={theme}>
        <div className={classes.root}></div>
      </ThemeProvider>

      <ReviewProductCard
        productname={productName}
        category={category}
        oneline={oneLineSummary}
        description={description}
        website={websiteLink}
        applink={appLink}
        uploadLogo={uploadLogo}
      />
    </>
  );
}
export default ReviewProductPage;
