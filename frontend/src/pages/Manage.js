import '../App.css';
import '../components/styles/ManageFiles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from '../components/Navbar';
import AudioFileListItem from '../components/AudioFileListItem';
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

function Manage(props) {

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
    var customer_id = props.customer_id;
  }

  useEffect(() => {

    if(location.state){
      var customer_id  = location.state.customer_id;
    }
    else {
      var customer_id = props.customer_id;
    }
    
    async function getFiles() {
      setLoading(true);
      
      var data = {
        "customer-id": customer_id
      };
      let response = await axios.post(`http://localhost:2000/files/get-files`, data)
      //let response = await axios.post(`/files/get-files`, data)
      response.data.shift();
      setFiles(response.data)
      setLoading(false);
    }
    getFiles() 
    
  }, []);

  const handleAudioDelete = (sound_id) => {
    
    var data = {
      "customer-id": customer_id,
      "sound_id": sound_id
    };

    if (window.confirm("Are you sure you want to delete this file?")) {
    
      
      axios.post(`http://localhost:2000/files/delete-file`, data).then(function(result) {
        //remove item from react list through hook
        console.log(result.data)
        if(result.data){
          setFiles(files => files.filter(fl => fl.id !== sound_id));
        }
        else{
          alert('This file is currently in use! Please go to the menu tab to remove this audio from your system.')
        }
      });
      
      
      /*
      axios.post(`/files/delete-file`, data).then(function(result) {
        //remove item from react list through hook
        setFiles(files => files.filter(fl => fl.id !== sound_id));
      });
      */
      
    }

  }

  const handlePreviousChoice = () => {
    
   if(firstVal >= 10) {
    setFirstVal(firstVal - 10)
    setSecondVal(secondVal - 10)
   }

  }

  const handleNextChoice = () => {
    
    setFirstVal(firstVal + 10)
    setSecondVal(secondVal + 10)
 
  }
 
  if(customer_id === 'admin') {
    window.location.href = "/admin";
  }
  
  return (
    <div className="Manage">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <div className="row" >
        <div className="col-2">
          <Navbar customer_id={customer_id} adminIsAccessing={adminIsAccessing} setToken={props.setToken}/>
        </div>
        <div className="col-9 mx-auto fileCollection">
          <div className="ManageHeading">
            Your active files
          </div>
          {loading ? (
            <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
            />
          ) : (
            files.slice(firstVal, secondVal).map((fl) => <AudioFileListItem key={fl.id} id={fl.id} customer_id={customer_id} name={fl.name} s3_url={fl.s3_url} handleAudioDelete={handleAudioDelete}/>)
          )}
          <div className="ListChoices">
            <span className="PreviousChoiceButton" onClick={() => handlePreviousChoice()}>
              <box-icon name='caret-left-circle' color='#ffffff' size="lg"></box-icon>
            </span>
            <span className="NextChoiceButton" onClick={() => handleNextChoice()}>
              <box-icon name='caret-right-circle' color='#ffffff' size="lg"></box-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage;
