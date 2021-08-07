import '../App.css';
import '../components/styles/Settings.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../components/Navbar';
import SettingsConfig from '../components/SettingsConfig';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function Settings(props) {

  const location = useLocation();
  
  if(location.state){
    var customer_id  = location.state.customer_id;
    var adminIsAccessing = location.state.adminIsAccessing;
  }
  else {
    var customer_id = props.customer_id;
  }

 
  if(customer_id === 'admin') {
    window.location.href = "/admin";
  }
  
  return (
    <div className="Settings">
      <head>
        <link rel="stylesheet" href="boxicons.min.css" />
      </head>
      <div className="row" >
        <div className="col-2">
          <Navbar customer_id={customer_id} adminIsAccessing={adminIsAccessing} setToken={props.setToken}/>
        </div>
        <div className="col-9 mx-auto settingsPage">
          <SettingsConfig customer_id={customer_id} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
