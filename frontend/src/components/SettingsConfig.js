import '../App.css';
import '../components/styles/Settings.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from '../components/Navbar';
import SettingsConfig from '../components/SettingsConfig';
import axios from 'axios';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import Loader from "react-loader-spinner";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function Settings(props) {

  const [firstVal, setFirstVal] = useState(0);
  const [secondVal, setSecondVal] = useState(10);

  const customer_id = props.customer_id;

  return (
    <div className="SettingsConfig">
        <div className="SettingsConfigBorder">
            <div className="SettingsConfigTitle">
                Settings
            </div>
        </div>
    </div>
  );
}

export default Settings;
