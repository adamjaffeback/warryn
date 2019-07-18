import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './GithubKeyForm.css';
import { setToken } from '../../state/actions/userActions';

function GithubKeyForm({setToken, history, place}) {
  const [key, updateKey] = useState('');

  function handleSubmit (ev) {
    ev.preventDefault();
    setToken(key);
    history.push('/prioritize');
  }

  function handleChange (ev) {
    ev.preventDefault();
    updateKey(ev.target.value);
  }

  return (
    <form onSubmit={handleSubmit} style={place} className='GHForm'>
      <label htmlFor='apiKey'>
        Enter GitHub API Key:
        <input autoFocus={true} type='text' value={key} name='apiKey' onChange={handleChange} />
      </label>  
      <input type='submit' value='Submit' id='submitApiKey' disabled={key === ''} />
    </form>
  );
}

export default connect(null, {setToken})(withRouter(GithubKeyForm));
