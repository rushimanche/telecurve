import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import React from 'react';
import AudioDropzone from './components/AudioDropzone';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Upload from './pages/Upload';
import Manage from './pages/Manage';

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function App() {
  return (
    <div className="App">
      <Router>
        <head>
          <link rel="stylesheet" href="boxicons.min.css" />
        </head>
        <div className="row" >
          <div class="col-2">
            <Navbar />
          </div>
          <div class="col-9">
            <Switch>
              <Route path="/upload">
                <Upload />
              </Route>
              <Route path="/manage">
                <Manage />
              </Route>
            </Switch>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default App;
