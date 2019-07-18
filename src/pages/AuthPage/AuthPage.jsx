import React from 'react';
import './AuthPage.css';
import GithubKeyForm from '../../containers/GithubKeyForm/GithubKeyForm';

function AuthPage() {
  return (
    <div className='AuthPage'>
      <GithubKeyForm />
    </div>
  );
}

export default AuthPage;
