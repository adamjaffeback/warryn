import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setToken } from '../../state/actions/userActions';
import { withRouter } from 'react-router-dom';

function GithubKeyForm({setToken, history}) {
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
    <form onSubmit={handleSubmit}>
      <label>
        GitHub API Key:
        <input type='text' value={key} name='apiKey' onChange={handleChange} />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
}

export default connect(null, {setToken})(withRouter(GithubKeyForm));
