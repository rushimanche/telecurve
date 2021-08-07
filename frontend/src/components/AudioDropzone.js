import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import "./styles/Dropzone.css";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import S3 from "react-aws-s3";
import env from "react-dotenv";
import AWS from 'aws-sdk';
import axios from 'axios';

<script src="https://unpkg.com/@ffmpeg/ffmpeg@0.10.1/dist/ffmpeg.min.js"></script>

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

function AudioDropzone(props) {
  const [filename, setFilename] = useState(null)
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState(null)
  const [audioSrc, setAudioSrc] = useState(null)
  const ffmpeg = createFFmpeg({
    corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
    log: true,
  });

  var customer_id = props.customer_id || 1;

  const getSoundID = async (customer_id, file_name) => {
    
    var data = {
      "customer-id": customer_id,
      "file-name": file_name
    };

    //return await axios.post(`/files/retrieve-sound-id`, data);
    return await axios.post(`http://localhost:2000/files/retrieve-sound-id`, data);
    
  }

  const updateSoundData = async (sound_id, customer_id) => {
    
    var data = {
      "sound-id": sound_id,
      "customer-id": customer_id
    };

    //return await axios.post(`/files/update-database-with-s3`, data);
    return await axios.post(`http://localhost:2000/files/update-database-with-s3`, data);

  }


  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Uploading file');
    ffmpeg.FS('writeFile', filename, await fetchFile(file));
    await ffmpeg.run('-i', filename,  '-ac', '1', '-ar', '8000', 'test.wav');
    setMessage('Upload to manager complete. Sound file will be available and playable on the manger within 1-2 minutes.');
    const data = ffmpeg.FS('readFile', 'test.wav');
    setAudioSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'audio/wav' })));

    var file_name = prompt('What would you like to call this file?');

    if (!file_name) {
      file_name = Date.now()
    }
    
    (async function(){
      let output = await getSoundID(customer_id, file_name);
      let sound_id = output.data;
      var bucket_file = new File([new Blob([data.buffer], { type: 'audio/wav' })], "sounds/" + customer_id + "/" + sound_id + ".wav");
      uploadFileToS3(bucket_file);
      updateSoundData(sound_id, customer_id);
    })();
  };

  useEffect(() => {
    if (file) {
      doTranscode()
    }
  }, [file])

  //ffmpeg -i input.mp3 -acodec pcm_s16le -ac 1 -ar 16000 output.wav
  const onDrop = useCallback(acceptedFile => {
    setFilename(acceptedFile[0].name)
    setFile(acceptedFile[0])
    // console.log(acceptedFile)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const fileInput = useRef();

  const uploadFileToS3 = (file) => {

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    
    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          console.log('success!')
        })
        .send((err) => {
            if (err) console.log(err)
        })
  }

  return (
    <section className="UploadPage">
      <div className="AudioHeading">
        Welcome back!
      </div>
      <div className="FileDropzone mx-auto dropzone">
        <div className="">
          <div className="" {...getRootProps()}>
            <div className="">
              <input className="file-input" type="file" name="resume" {...getInputProps({ multiple: false })} accept=".wav,.mp3,.mp4,.m4a,.gsm"/>
              <div className="dropzoneContent">
                <span className="dropzoneDrag"> 📁 </span>
                <p className="dropzoneText">Choose a file or drag it here to upload</p>
              </div>
            </div>
          </div>
          <div className="">
            {message ? message : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudioDropzone;