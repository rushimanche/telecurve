import '../App.css';
import './styles/Admin.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UserListItem from './UserListItem';

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
function AccessUsers() {
    const [users, setUsers] = useState([]);
    const adminIsAccessing = true;
    var customer_id = 1;

    useEffect(() => {
        async function getUsers() {
            axios.get(`http://localhost:2000/accounts/get-users`).then(function(result) {
                setUsers(result.data)
            });;
        }
        getUsers() 
        
    }, []);

  return (
    <div className="AccessUser">
        <div className="AccessUserBorder">
            <div className="AccessUserTitle">
                Manage Telecurve Users
            </div>
            <br></br>
            {users.map((fl) => <div>{(users.length !== 0) && <UserListItem key={fl.customer}  user={fl.user} customer_id={fl.customer} adminIsAccessing={adminIsAccessing} />}</div>)}
        </div>
    </div>
  );
}

export default AccessUsers;
