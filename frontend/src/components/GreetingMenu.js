import '../App.css';
import './styles/Menu.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Select, { components } from "react-select";
import StoryCarousel from './StoryCarousel';

const fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const AWS = require('aws-sdk');


<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>


function GreetingMenu(props) {
    const [files, setFiles] = useState([]);
    const [greeting, setGreeting] = useState('');
    const [menu, setMenu] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedGreetingOption, setSelectedGreetingOption] = useState(null);
    const [selectedMenuOption, setSelectedMenuOption] = useState(null);

    var customer_id = props.customer_id || 1;

    useEffect(() => {
        async function getFiles() {
          
          var data = {
            "customer-id": customer_id
          };
          //let response = await axios.post(`http://localhost:2000/files/get-files`, data)
          let response = await axios.post(`/files/get-files`, data)
          for (let i = 0; i < response.data.length; i++) {
            setOptions(oldArray => [...oldArray, {'value': response.data[i]['id'], 'label': response.data[i]['name']}])
          }
          setFiles(response.data)
        }
        async function getIVR() {
          
            var data = {
              "customer-id": customer_id
            };
            //let response = await axios.post(`http://localhost:2000/files/get-ivr`, data)
            let response = await axios.post(`/files/get-ivr`, data)
            if (response.data[0]){
              setGreeting(response.data[0]['greeting'])
              setMenu(response.data[0]['menu'])
            }
        }

        getFiles()
        getIVR() 
    }, []);

    var grresult = (options.find(x => x.value === greeting));
    if(grresult){
        setGreeting(grresult && grresult['label']);
    }
    var meresult = (options.find(x => x.value === menu))
    if(meresult){
        setMenu(meresult && meresult['label']);
    }

    const customStyles = {
        control: (base, state) => ({
          ...base,
          background: "#F4F4ED",
          width: "60%",
          display: 'flex',
          marginLeft: '20%',
          // match with the menu
          borderRadius: state.isFocused ? "20px 20px 20px 20px" : 20,
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "black" : "white",
          // Removes weird border around container
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "black" : "white"
          }
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          borderRadius: 20,
          width: "60%",
          marginLeft: '20%',
          // kill the gap
          marginTop: 0
        }),
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        })
    };

    const updateGreeting = async (selectedOption) => {
        setSelectedGreetingOption(selectedOption)
        var data = {
            "customer-id": customer_id,
            "sound-id": selectedOption['value']
        };
        //let response = await axios.post(`http://localhost:2000/files/update-greeting`, data);
        let response = await axios.post(`/files/update-greeting`, data);
        setGreeting(selectedOption)
    }


    const updateMenu = async (selectedOption) => {
        setSelectedMenuOption(selectedOption)
        var data = {
            "customer-id": customer_id,
            "sound-id": selectedOption['value']
        };
        //let response = await axios.post(`http://localhost:2000/files/update-menu`, data);
        let response = await axios.post(`/files/update-menu`, data);
        setMenu(selectedOption)
    }

  return (
    <div className="GreetingMenu">
        <div className="GreetingSelection">
            Greeting
        </div>
        <div className="GreetingDropdown">
            <Select styles={customStyles} 
                    options={options} 
                    placeholder={greeting} 
                    value={selectedGreetingOption}
                    onChange={updateGreeting}
            />
        </div>
        <div className="MenuSelection">
            Menu
        </div>
        <div className="MenuDropdown">
            <Select styles={customStyles} 
                    options={options} 
                    placeholder={menu} 
                    value={selectedMenuOption}
                    onChange={updateMenu}
            />
        </div>
        <div className="StorySelection">
            Stories
            {(options.length !== 0) && <StoryCarousel options={options} customer_id={customer_id} />}      
        </div>
        
    </div>
  );
}

export default GreetingMenu;
