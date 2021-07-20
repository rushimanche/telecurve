import '../App.css';
import './styles/ManageFiles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
const fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const AWS = require('aws-sdk');


<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function AudioFileListItem(props) {
  var name = props.name;
  var id = props.id;
  var customer_id = props.customer_id;
  var s3_url = props.s3_url;

  const [playing, setPlaying] = useState(false);
  const [playingAudio, setPlayingAudio] = useState([]);

  const handleAudioPlay = (customer_id, sound_id, state) => {
    
    var data = {
      "customer-id": customer_id,
      "sound-id": sound_id
    };

    if(state) {
      axios.post(`/files/get-temporary-url`, data).then(function(result) {
        var audio = new Audio(result.data)
        setPlayingAudio(audio)
        if(playing) {
          audio.pause()
        }
        else {
          audio.play()
          setPlaying(true)
          audio.addEventListener('ended', function() {
            setPlaying(false)
            }, false);
        }
      });;
    }
    else {
      playingAudio.pause()
      setPlaying(false)
    }
  
  }


  const handleAudioDownload = (customer_id, sound_id) => {
    
    var data = {
      "customer-id": customer_id,
      "sound-id": sound_id
    };

    axios.post(`/files/get-temporary-url`, data).then(async function(result) {
      window.open(result.data)
    });;
  
  }

  const downloadFile = async (presignedGETURL) => {
    const url = presignedGETURL
		try {
			const response = await Axios({
					url,
					method: 'GET',
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/wav' // <-- declare the file format in s3
					}
				})
				return response.data;
		} catch (err) {
			console.log("error in axios call", err)
			throw err;
		}
  }

  

  return (
    <div className="AudioFileListItem">
      <div className="AudioFileListElements">
        <span className="AudioFileListLogo">
          <box-icon name='file-find' color='#ffffff' size="md"></box-icon>
        </span>
        <span className="AudioFileListName">
          { name }
        </span>
        {playing
        ? 
        
        <span className="AudioFilePlayButton" onClick={() => handleAudioPlay(customer_id, id, false)}>
        <box-icon name='pause-circle' color='#ffffff' size="sm"></box-icon>
        </span>

        : 

        <span className="AudioFilePlayButton" onClick={() => handleAudioPlay(customer_id, id, true)}>
        <box-icon name='play-circle' color='#ffffff' size="sm"></box-icon>
        </span>
        }

        {playing
        ? 
        
        <span className="AudioFilePlayButtonTitle" onClick={() => handleAudioPlay(customer_id, id, false)}>
          Pause
        </span>

        : 

        <span className="AudioFilePlayButtonTitle" onClick={() => handleAudioPlay(customer_id, id, true)}>
          Play
        </span>

        }

        <span className="AudioFileDownloadButton" onClick={() => handleAudioDownload(customer_id, id)}>
          <box-icon name='download' type='solid' color='#ffffff' size="sm"></box-icon>
        </span>
        <span className="AudioFileDownloadButtonTitle" onClick={() => handleAudioDownload(customer_id, id)}>
          Download
        </span>
        <span className="AudioFileDeleteButton" onClick={() => props.handleAudioDelete(id)}>
          <box-icon name='trash' color='#ffffff' size="sm"></box-icon>
        </span>
        <span className="AudioFileDeleteButtonTitle" onClick={() => props.handleAudioDelete(id)}>
          Delete
        </span>
        <br />
        <br />
      </div>
    </div>
  );
}

export default AudioFileListItem;
