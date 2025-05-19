import React from 'react';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className='px-4 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto flex justify-center align-center'>
      <SignUp signUpFallbackRedirectUrl={'/create-user'} signInUrl='/sign-in' />
    </div>
  );
};

export default SignUpPage;

// NEED TO SET UP SIGN UP FUNCTION TO CREATE USER IN DATABASE
