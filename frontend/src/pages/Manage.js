import '../App.css';
import '../components/styles/ManageFiles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import AudioFile from '../components/AudioFile';
<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function Manage() {
  return (
    <div className="Manage">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <div className="row" >
        <div className="col-2">
          <Navbar />
        </div>
        <div className="col-9 mx-auto fileCollection">
          <AudioFile />
          <AudioFile />
        </div>
      </div>
    </div>
  );
}

export default Manage;
