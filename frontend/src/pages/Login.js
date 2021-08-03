import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../components/styles/Authentication.css';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import AuthenticateUser from '../components/LoginUser';
import PropTypes from 'prop-types';

function Login({ setToken }) {


  return (
    <div className="Login">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <AuthenticateUser setToken={setToken} />
    </div>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
 

