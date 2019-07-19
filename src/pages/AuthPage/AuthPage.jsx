import React from 'react';
import './AuthPage.css';
import GithubKeyForm from '../../containers/GithubKeyForm/GithubKeyForm';
import Warryn from '../../components/Warryn/Warryn';

function AuthPage() {
  const prompt = 'Hi, I\'m Warryn! Enter your GitHub API key to organize your repository issues.';

  return (
    <div className='AuthPage'>
      <GithubKeyForm />
      <Warryn message={prompt}/>
    </div>
  );
}

export default AuthPage;
