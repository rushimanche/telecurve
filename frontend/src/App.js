import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import AudioDropzone from './components/AudioDropzone';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import Upload from './pages/Upload';
import Manage from './pages/Manage';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import { useEffect } from 'react';

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
              <Route path="/menu">
                <Menu />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/admin/upload">
                <Upload />
              </Route>
              <Route path="/admin/manage">
                <Manage />
              </Route>
              <Route path="/admin/menu">
                <Menu />
              </Route>
            </Switch>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default App;
