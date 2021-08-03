import '../App.css';
import './styles/ManageFiles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";

const fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const AWS = require('aws-sdk');

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

const customStyles = {
  content: {
    top: '50%',
    left: '60%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#392F5A'
  },
};

function UserListItem(props) {
  var [firstName, setfirstName] = useState(props.fname);
  var [lastName, setlastName] = useState(props.lname);
  var [email, setEmail] = useState(props.email);
  var [username, setUsername] = useState(props.user);
  var [organizationName, setorganizationName] = useState(props.organizationName);
  var [organizationEmail, setorganizationEmail] = useState(props.organizationEmail);
  var [phoneNumber, setphoneNumber] = useState(props.phoneNumber);

  var customer_id = props.customer_id;

  var adminIsAccessing = props.adminIsAccessing;

  var [modalOpened, setModal] = useState(false);

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  return (
    <div className="UserListItem">
      <div className="UserListElements">
        <span className="UserListLogo">
          <box-icon name='user-circle' color='black' size="md"></box-icon>
        </span>
        <span className="UserListName">
          { username }
        </span>
        <span className="UserEditButton" onClick={openModal}>
          <box-icon name='pencil' color='black' size="md"></box-icon>
        </span>
        <span className="UserEditButtonTitle" onClick={openModal}>
          edit
        </span>
        <Modal 
           isOpen={modalOpened}
           onRequestClose={closeModal}
           style={customStyles}
           contentLabel="Edit Telecurve User"
        >
          <div className="UserEditPopup">
            <button className="UserEditPopupCloseButton" onClick={closeModal}><box-icon className="UserEditPopupCloseButtonIcon" name='x' color='white' size="md"></box-icon></button>
            <span className="UserEditPopupTitle">
              Edit Telecurve User
            </span>
            <br></br>
            <br></br>
            <Formik
                initialValues={{
                    organizationName: '',
                    organizationEmail: '',
                    phoneNumber: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    organizationName: Yup.string(),
                    organizationEmail: Yup.string(),
                    phoneNumber: Yup.string()
                    .matches(phoneRegExp, 'Phone number is not valid'),
                    firstName: Yup.string(),
                    lastName: Yup.string(),
                    email: Yup.string()
                        .email('Email is invalid'),
                    username: Yup.string(),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                })}
                onSubmit={(fields, {resetForm}) => {
                    var data = {
                        "customer_id": customer_id,
                        "organizationName": fields.organizationName,
                        "organizationEmail": fields.organizationEmail,
                        "phoneNumber": fields.phoneNumber,
                        "firstName": fields.firstName,
                        "lastName": fields.lastName,
                        "email": fields.email,
                        "username": fields.username,
                        "password": fields.password
                    };
                    
                    if(data.organizationName){
                      setorganizationName(data.organizationName)
                    }
                    if(data.organizationEmail){
                      setorganizationEmail(data.organizationEmail)
                    }
                    if(data.phoneNumber){
                      setphoneNumber(data.phoneNumber)
                    }
                    if(data.firstName){
                      setfirstName(data.firstName)
                    }
                    if(data.lastName){
                      setlastName(data.lastName)
                    }
                    if(data.email){
                      setEmail(data.email)
                    }
                    if(data.username){
                      setUsername(data.username)
                    }

                    /*
                    axios.post(`http://localhost:2000/accounts/patch-user`, data).then(function(result) {
                        if(result){
                            alert('User successfully updated!');
                            resetForm();
                            closeModal();
                        }
                        else{
                            alert('Error updating user! Please try again.');
                            resetForm();
                            closeModal();
                        }
                      });;
                    */

                    axios.post(`/accounts/patch-user`, data).then(function(result) {
                        if(result){
                            alert('User successfully updated!');
                            resetForm();
                            closeModal();
                        }
                        else{
                            alert('Error updating user! Please try again.');
                            resetForm();
                            closeModal();
                        }
                      });;
                    fields = {}
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group editUser">
                            <label htmlFor="organizationName">Organization Name</label>
                            <Field name="organizationName" type="text" placeholder={organizationName} className={'form-control' + (errors.organizationName && touched.organizationName ? ' is-invalid' : '')} />
                            <ErrorMessage name="organizationName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="organizationEmail">Organization Email</label>
                            <Field name="organizationEmail" type="text" placeholder={organizationEmail} className={'form-control' + (errors.organizationEmail && touched.organizationEmail ? ' is-invalid' : '')} />
                            <ErrorMessage name="organizationEmail" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field name="phoneNumber" type="text" placeholder={phoneNumber}  className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
                            <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" placeholder={firstName} className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" placeholder={lastName} className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" placeholder={email} className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" placeholder={username} className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group editUser">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group submitEditUser">
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        </div>
                    </Form>
                )}
              />
          </div>
        </Modal>
        <Link
          to={{
            pathname: "/upload",
            state: {
              customer_id: customer_id,
              adminIsAccessing: adminIsAccessing
            },
          }}
        >
          <span className="UserUploadButton">
          <box-icon name='upload' color='black' size="md"></box-icon>
          </span>
          <span className="UserUploadButtonTitle">
            upload
          </span>
        </Link>
        <Link
          to={{
            pathname: "/manage",
            state: {
              customer_id: customer_id,
              adminIsAccessing: adminIsAccessing
            },
          }}
        >
        <span className="UserManageButton">
          <box-icon name='file-blank' type='solid' color='black' size="md"></box-icon>
        </span>
        <span className="UserManageButtonTitle">
          manage
        </span>
        </Link>
        <Link
          to={{
            pathname: "/menu",
            state: {
              customer_id: customer_id,
              adminIsAccessing: adminIsAccessing
            },
          }}
        >
        <span className="UserMenuButton">
          <box-icon name='phone' color='black' size="md"></box-icon>
        </span>
        <span className="UserMenuButtonTitle">
          menu
        </span>
        </Link>
        <br />
        <br />
      </div>
    </div>
  );
}

export default withRouter(UserListItem);
