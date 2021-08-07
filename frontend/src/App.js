import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import useToken from './components/useToken';
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
import Settings from './pages/Settings';
import Login from './pages/Login';

import { useEffect, useState } from 'react';

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return(
      <div className="App">
        <div className="row">
          <div class="col-2">
          </div>
          <div class="col-9">
            <Login setToken={setToken} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <head>
          <link rel="stylesheet" href="boxicons.min.css" />
        </head>
        <div className="row" >
          <div class="col-2">
          </div>
          <div class="col-9">
            <Switch>
              <Route path="/upload">
                <Upload customer_id={token} setToken={setToken} />
              </Route>
              <Route path="/manage">
                <Manage customer_id={token} setToken={setToken}/>
              </Route>
              <Route path="/menu">
                <Menu customer_id={token} setToken={setToken}/>
              </Route>
              <Route path="/settings">
                <Settings customer_id={token} setToken={setToken}/>
              </Route>
              <Route path="/admin">
                <Admin token={token} setToken={setToken}/>
              </Route>
            </Switch>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default App;
