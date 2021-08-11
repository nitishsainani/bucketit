import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SignInCard from '../Components/SignInCard';
import { AuthService } from '../Services';


function SignInPage(props) {

  useEffect(() => {
    AuthService.isLogin().then(isLogin => {
      isLogin && props.history.push('/')
    })
  });

  return (
    <>
      <Navbar register={true} disablePost={false} />
      <SignInCard {...props}/>
    </>
  );
}

export default SignInPage;
