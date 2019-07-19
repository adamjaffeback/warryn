import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './GithubKeyForm.css';
import { setToken } from '../../state/actions/userActions';

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
    <form onSubmit={handleSubmit} className='GHForm'>
      <label htmlFor='apiKey'>
        GitHub API Key:
        <input autoFocus={true} type='text' value={key} name='apiKey' onChange={handleChange} />
      </label>  
      <input type='submit' value='Submit' id='submitApiKey' disabled={key === ''} />
    </form>
  );
}

GithubKeyForm.propTypes = {
  setToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect(null, {setToken})(withRouter(GithubKeyForm));
