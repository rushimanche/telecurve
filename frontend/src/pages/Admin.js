import '../App.css';
import '../components/styles/Admin.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import CreateUser from '../components/CreateUser';
import AccessUser from '../components/AccessUser';
import axios from 'axios';
import React, { useCallback, useState, useEffect, useRef } from 'react';

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function Admin(props) {

  const isAdmin = props.token;

  if(isAdmin === 'admin') {
    return (
      <div className="Admin">
        <head>
          <link rel="stylesheet" href="boxicons.min.css" />
        </head>
        <div className="row" >
          <div className="col-2">
            <Navbar isAdmin={isAdmin} setToken={props.setToken}/>
          </div>
          <div className="col-10 mx-auto AdminPage">
            <div className="AdminHeading">
              Your admin panel
            </div>
            <CreateUser />
            <AccessUser />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
