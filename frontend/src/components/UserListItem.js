import '../App.css';
import './styles/ManageFiles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";

const fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const AWS = require('aws-sdk');

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function UserListItem(props) {
  var username = props.user;
  var customer_id = props.customer_id;
  var adminIsAccessing = props.adminIsAccessing;

  return (
    <div className="UserListItem">
      <div className="UserListElements">
        <span className="UserListLogo">
          <box-icon name='user-circle' color='black' size="md"></box-icon>
        </span>
        <span className="UserListName">
          { username }
        </span>
        <Link
          to={{
            pathname: "/upload",
            state: {
              customer_id: customer_id,
              adminIsAccessing: adminIsAccessing
            },
          }}
        >
          <span className="UserUploadButton">
          <box-icon name='upload' color='black' size="md"></box-icon>
          </span>
          <span className="UserUploadButtonTitle">
            upload
          </span>
        </Link>
        <Link
          to={{
            pathname: "/manage",
            state: {
              customer_id: customer_id,
              adminIsAccessing: adminIsAccessing
            },
          }}
        >
        <span className="UserManageButton">
          <box-icon name='file-blank' type='solid' color='black' size="md"></box-icon>
        </span>
        <span className="UserManageButtonTitle">
          manage
        </span>
        </Link>
        <Link
          to={{
            pathname: "/menu",
            state: {
              customer_id: customer_id,
              adminIsAccessing: adminIsAccessing
            },
          }}
        >
        <span className="UserMenuButton">
          <box-icon name='phone' color='black' size="md"></box-icon>
        </span>
        <span className="UserMenuButtonTitle">
          menu
        </span>
        </Link>
        <br />
        <br />
      </div>
    </div>
  );
}

export default withRouter(UserListItem);
