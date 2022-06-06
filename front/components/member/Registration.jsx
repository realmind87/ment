import React from 'react';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import SiginupForm from './SiginupForm';

const Registration = ({ to, title, show, setShow }) => {
  return (
    <AuthLayout title={title} show={show} setShow={setShow}>
      {to === 'login' && <LoginForm />}
      {to === 'signup' && <SiginupForm />}
    </AuthLayout>
  );
};

export default Registration;
