import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import AudioDropzone from '../components/AudioDropzone';
<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function Upload() {
  return (
    <div className="Upload">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <div className="row" >
        <div className="col-2">
          <Navbar />
        </div>
        <div className="col-9 mx-auto">
          <AudioDropzone />
        </div>
      </div>
    </div>
  );
}

export default Upload;
