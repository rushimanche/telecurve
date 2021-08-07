import '../App.css';
import './styles/Menu.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import Select from "react-select";
import axios from 'axios';

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function StoryCarouselItem(props) {

  var dtmf = props.dest_id;
  var dtmf_val = dtmf
  var customer_id = props.customer_id || 1;
  const [selectedIVROption, setSelectedIVROption] = useState(null);
  const [IVRSound, setIVRSound] = useState(null);
  const [spaceState, setSpaceState] = useState(false);
  

  useEffect(() => {
    async function sortIVRDests() {
      var found = props.ivr_dests.some(el => el.dtmf.toString() === dtmf_val);

      if(found) {
        var ivr_sound = props.options.find(x => x.value === props.ivr_dests.find(x => x.dtmf.toString() === dtmf.toString()).sound);
        
        setIVRSound(ivr_sound && ivr_sound['label'])
      }
    }
    if(props.ivr_dests[0] !== 'none') {
      sortIVRDests() 
    }
    
  }, []);

  const updateIVR = async (selectedOption) => {

    setSelectedIVROption(selectedOption)
    var data = {
        "customer-id": customer_id,
        "dtmf-id": dtmf,
        "sound-id": selectedOption['value']
    };
    let response = await axios.post(`http://localhost:2000/files/update-ivr-dest`, data);
    //let response = await axios.post(`/files/update-ivr-dest`, data);
    setIVRSound(selectedOption.label)
  }

  const increaseSpace = () => {
    var element = document.getElementsByClassName('react-multi-carousel-list')[0];
    if(spaceState) {
      element.style.paddingBottom = '0';
      setSpaceState(false)
    }
    else {
      element.style.paddingBottom = '40%';
      setSpaceState(true)

    }

    const concernedElement = document.querySelector(".StoryDropdown");

    document.addEventListener("mousedown", (event) => {
      if (concernedElement.contains(event.target)) {
        element.style.paddingBottom = '40%';
        setSpaceState(true)
      } else {
        element.style.paddingBottom = '0';
        setSpaceState(false)
      }
    });
  }


  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F4F4ED",
      width: "80%",
      display: 'flex',
      marginLeft: '10%',
      fontSize: '10px',
      marginTop: '20%',
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
      borderRadius: 40,
      width: "100%",
      marginLeft: '0%',
      fontSize: '12px',
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
    };

  return (
    <div className="StoryCarouselItem">
        <div className="StoryCarouselItemCounter">
            <div className="StoryCarouselItemCounterText">
                {dtmf}
            </div>        
        </div>
        <div className="StoryDropdown" id="StoryDropdown" onClick={increaseSpace}>
            <Select styles={customStyles} 
                    options={props.options} 
                    placeholder={IVRSound} 
                    value={selectedIVROption}
                    onChange={updateIVR}
            />
        </div>
    </div>
  );
}

export default StoryCarouselItem;
