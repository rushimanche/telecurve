import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../components/styles/Authentication.css';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import LoginUser from '../components/LoginUser';
import PropTypes from 'prop-types';

function Login(props) {


  return (
    <div className="Login">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <LoginUser setToken={props.setToken}/>
    </div>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
 

