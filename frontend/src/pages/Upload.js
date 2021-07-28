import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import AudioDropzone from '../components/AudioDropzone';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>


function Upload() {

  const location = useLocation();

  if (location.state){
    var customer_id = location.state.customer_id || 1;
    var adminIsAccessing = location.state.adminIsAccessing;
  }
  else {
    var customer_id = 1;
  }
  return (
    <div className="Upload">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <div className="row" >
        <div className="col-2">
          <Navbar customer_id={customer_id} adminIsAccessing={adminIsAccessing}/>
        </div>
        <div className="col-9 mx-auto">
          <AudioDropzone customer_id={customer_id} />
        </div>
      </div>
    </div>
  );
}

export default Upload;
