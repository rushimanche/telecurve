import React, { useState } from "react";
import "./styles/Dropzone.css";

import Dropzone from "react-dropzone";

export default function FileDropzone() {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = acceptedFiles =>
    setFileNames(acceptedFiles.map(file => file.name));

  return (
    <div className="UploadPage">
      <div className="FileDropzone mx-auto">
        <Dropzone
          onDrop={handleDrop}
          accept="image/*"
          minSize={1024}
          maxSize={3072000}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject
          }) => {
            const additionalClass = isDragAccept
              ? "accept"
              : isDragReject
              ? "reject"
              : "";

            return (
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass} mx-auto`
                })}
              >
                <input {...getInputProps()} />
                <div className="dropzoneContent">
                  <span className="dropzoneDrag">{isDragActive ? "📂" : "📁"}</span>
                  <p className="dropzoneText">Choose a file or drag it here to upload</p>
                </div>
              </div>
            );
          }}
        </Dropzone>
        <div>
          <strong>Files:</strong>
          <ul className="fileList">
            {fileNames.map(fileName => (
              <li key={fileName}>{fileName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
