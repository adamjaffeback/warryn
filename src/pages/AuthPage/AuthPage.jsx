import React from 'react';
import './AuthPage.css';
import GithubKeyForm from '../../containers/GithubKeyForm/GithubKeyForm';

const formPlacement = {
  gridColumn: 'left / middle-column',
  gridRow: 'top / bottom',
};

function AuthPage() {
  return (
    <div className='AuthPage'>
      <GithubKeyForm place={formPlacement} />
    </div>
  );
}

export default AuthPage;
