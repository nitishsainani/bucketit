import React from 'react';
import Navbar from '../Components/Navbar';
import { ThemeProvider } from '@material-ui/core/styles';
import ProductCard from '../Components/ProductCard';
import theme from '../theme';
import { Box } from '@material-ui/core';

function ProductPage(props) {
  return (
    <>
      <Navbar register={true} disablePost={false} />
      <Box mt={7}>
        <ThemeProvider theme={theme}>
          <ProductCard
            productname={"BYJU'S"}
            category={'FINTECH'}
            oneline={'Indian education technology and education firm'}
            description={
              ' The Learning App is an Indian educational technology (edtech) and online tutoring firm founded in 2011 by Byju Raveendran. The company with a valuation of $11.1 billion.'
            }
            website={'www.byjus.com'}
            quantity={255}
            owner={'Nitish Kumar'}
            username={'Krishan Kumar Pareek'}
            applink={'www.byjus.com/applink'}
            comments={[
              {
                value: 'This is very good.',
                username: 'Priyam Patel',
                time: '12 mins ago',
              },
              {
                value: 'Really nice to use',
                username: 'Santosh Kumar',
                time: '15 mins ago',
              },
              {
                value: 'Excellent product',
                username: 'Rahul Kumar',
                time: '18 mins ago',
              },
              {
                value: 'Amazing experience',
                username: 'Abhijeet Verma',
                time: '28 mins ago',
              },
              {
                value: 'Average',
                username: 'Vikram Kumar',
                time: '38 mins ago',
              },
              {
                value: 'wow!! incredible',
                username: 'Sarvajeet Kumar',
                time: '46 mins ago',
              },
            ]}
            arr={[1, 2, 3, 4, 5]}
          />
        </ThemeProvider>
      </Box>
    </>
  );
}
export default ProductPage;
