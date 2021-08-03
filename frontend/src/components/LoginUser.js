import '../App.css';
import './styles/Authentication.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
   Redirect
  } from "react-router-dom";


<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function LoginUser({ setToken }) {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const toggleLogin = () => {
        var x = document.getElementById("LoginUser");
        var y = document.getElementById("RegisterUser");
        if (x.style.display === "none") {
          x.style.display = "block";
          y.style.display = "none";
        } else {
          x.style.display = "none";
          y.style.display = "block";
        }
    }

  return (
    <div className="AuthenticateUser">
        <div id="LoginUser" className="LoginUser">
            <div className="LoginUserBorder">
            <div className="LoginUserTitle">
                Login
            </div>
            <br></br>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string()
                        .required('Username is required'),
                        password: Yup.string()
                        .required('Password is required'),
                    })}
                    onSubmit={(fields, {resetForm}) => {
                        var data = {
                            "username": fields.username,
                            "password": fields.password,
                        };

                        /*
                        axios.post(`http://localhost:2000/accounts/login-user`, data).then(function(result) {
                            if(result.data){
                                setToken(result.data)
                                resetForm();
                                return <Redirect to='/upload'/>;
                            }
                            else{
                                alert('Error logging in user! Please try again.');
                                resetForm();
                            }
                        });;
                        */

                        axios.post(`/accounts/login-user`, data).then(function(result) {
                            if(result.data){
                                setToken(result.data)
                                resetForm();
                                return <Redirect to='/upload'/>;
                            }
                            else{
                                alert('Error logging in user! Please try again.');
                                resetForm();
                            }
                        });;

                        fields = {}
                    }}
                    render={({ errors, status, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <br></br>
                            <span className="form-group LoginSubmit">
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            </span>
                            <span className="form-group">
                                <a href="#" className="RegisterPrompt" onClick={toggleLogin}>
                                    Create an account
                                </a>
                            </span>
                            <br></br>
                            <br></br>
                        </Form>
                    )}
                />
                <div>
                    
                </div>
            </div>
        </div>

        <div id="RegisterUser" className="RegisterUser">
            <div className="RegisterUserBorder">
            <div className="RegisterUserTitle">
                Register
            </div>
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
                    organizationName: Yup.string()
                    .required('Organization Name is required'),
                    organizationEmail: Yup.string()
                    .required('Organization Email is required'),
                    phoneNumber: Yup.string()
                    .matches(phoneRegExp, 'Phone number is not valid')
                    .required('Phone Number is required'),
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    username: Yup.string()
                        .required('Username is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
                onSubmit={(fields, {resetForm}) => {
                    var data = {
                        "organizationName": fields.organizationName,
                        "organizationEmail": fields.organizationEmail,
                        "phoneNumber": fields.phoneNumber,
                        "firstName": fields.firstName,
                        "lastName": fields.lastName,
                        "email": fields.email,
                        "username": fields.username,
                        "password": fields.password
                    };
                    
                    /*
                    axios.post(`http://localhost:2000/accounts/create-user`, data).then(function(result) {
                        if(result){
                            setToken(result.data)
                            resetForm();
                            return <Redirect to='/upload'/>;
                        }
                        else{
                            alert('Error creating user! Please try again.');
                            resetForm();
                        }
                      });;
                    */

                    axios.post(`/accounts/create-user`, data).then(function(result) {
                        if(result){
                            setToken(result.data)
                            resetForm();
                            return <Redirect to='/upload'/>;
                        }
                        else{
                            alert('Error creating user! Please try again.');
                            resetForm();
                        }
                    });;
                    fields = {}
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="organizationName">Organization Name</label>
                            <Field name="organizationName" type="text" className={'form-control' + (errors.organizationName && touched.organizationName ? ' is-invalid' : '')} />
                            <ErrorMessage name="organizationName" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="organizationEmail">Organization Email</label>
                            <Field name="organizationEmail" type="text" className={'form-control' + (errors.organizationEmail && touched.organizationEmail ? ' is-invalid' : '')} />
                            <ErrorMessage name="organizationEmail" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field name="phoneNumber" type="text" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
                            <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        </div>
                        <br></br>
                        <br></br>
                    </Form>
                )}
                />
                <div>
                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginUser;
