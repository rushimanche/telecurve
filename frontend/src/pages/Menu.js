import '../App.css';
import '../components/styles/Menu.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import GreetingMenu from '../components/GreetingMenu';
import axios from 'axios';
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

function Menu() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstVal, setFirstVal] = useState(0);
  const [secondVal, setSecondVal] = useState(10);

  const location = useLocation();
  if(location.state){
    var customer_id  = location.state.customer_id;
    var adminIsAccessing = location.state.adminIsAccessing;
  }
  else {
    var customer_id = 1;
  }

  useEffect(() => {
    
    if(location.state){
      var customer_id  = location.state.customer_id;
    }
    else {
      var customer_id = 1;
    }
    
    async function getFiles() {
      setLoading(true);

      var data = {
        "customer-id": customer_id
      };
      let response = await axios.post(`http://localhost:2000/files/get-files`, data)
      //let response = await axios.post(`/files/get-files`, data)
      setFiles(response.data)
      setLoading(false);
    }
    getFiles() 
    
  }, [location]);


  return (
    <div className="Menu">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <div className="row" >
        <div className="col-2">
          <Navbar customer_id={customer_id} adminIsAccessing={adminIsAccessing}/>
        </div>
        <div className="col-10 mx-auto MenuPage">
          <div className="MenuHeading">
            Your phone menu
          </div>
          {(files.length !== 0) && <GreetingMenu customer_id={customer_id} />}
        </div>
      </div>
    </div>
  );
}

export default Menu;
