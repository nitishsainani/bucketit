import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './theme';
import RegisterPage from './Pages/RegisterPage';
import SignInPage from './Pages/SignInPage';
import CreateProfilePage from './Pages/CreateProfilePage';
import PostProductPage from './Pages/PostProductPage';
import ReviewProductPage from './Pages/ReviewProductPage';
import ProductPage from './Pages/ProductPage';
import AdminPage from './Pages/AdminPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/login" exact component={SignInPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/createprofile" exact component={CreateProfilePage} />
          <Route path="/postproduct" exact component={PostProductPage} />
          <Route path="/reviewproduct" exact component={ReviewProductPage} />
          <Route path="/product" exact component={ProductPage} />
          <Route path="/admin" exact component={AdminPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
