import React from 'react';
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className='px-4 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto flex justify-center align-center'>
      <SignIn signInFallbackRedirectUrl={'/dashboard'} signUpUrl='/sign-up' />
    </div>
  );
};

export default SignInPage;
