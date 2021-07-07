import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import FileDropzone from './components/FileDropzone';

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function App() {
  return (

    <div className="App">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <div className="row" >
        <div class="col-2">
          <Navbar />
        </div>
        <div class="col-9 mx-auto">
          <FileDropzone />
        </div>
      </div>
    </div>
  );
}

export default App;
