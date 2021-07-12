import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
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

function AudioDropzone() {
  const [filename, setFilename] = useState(null)
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState(null)
  const [audioSrc, setAudioSrc] = useState(null)
  const ffmpeg = createFFmpeg({
    corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
    log: true,
  });

  
  const getSoundID = async (customer_id, file_name) => {
    
    var data = {
      "customer-id": customer_id,
      "file-name": file_name
    };
    return await axios.post(`http://localhost:4000/files/retrieve-sound-id`, data);
  }

  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', filename, await fetchFile(file));
    await ffmpeg.run('-i', filename, 'test.wav');
    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'test.wav');
    setAudioSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'audio/wav' })));


    //hardcoded customer id and name for temporary usage
    var customer_id = 1;
    var file_name = String(Date.now());

    (async function(){
      let output = await getSoundID(customer_id, file_name);
      let sound_id = output.data;
      var bucket_file = new File([new Blob([data.buffer], { type: 'audio/wav' })], "sounds/" + customer_id + "/" + sound_id + ".wav");
      uploadFileToS3(bucket_file);
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
    console.log(acceptedFile[0])
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
      <div className="FileDropzone mx-auto dropzone">
        <div className="">
          <div className="" {...getRootProps()}>
            <label className="">
              <input className="file-input" type="file" name="resume" {...getInputProps({ multiple: false })} />
              <div className="dropzoneContent">
                <span className="dropzoneDrag"> 📁 </span>
                <p className="dropzoneText">Choose a file or drag it here to upload</p>
              </div>
            </label>
          </div>
          <div className="">
            {message ? message : null}
          </div>
          {
            audioSrc ? 
            <audio controls>
            <source src={audioSrc} type="audio/wav"/>
                Your browser does not support the audio tag.
        </audio> : null
          }
          
        </div>
      </div>
    </section>
  );
}

export default AudioDropzone;