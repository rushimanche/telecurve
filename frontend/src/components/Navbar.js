import React, { Component } from 'react';
import './styles/Navbar.css'
import 'boxicons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export class Navbar extends Component {

  render() {
    var isAdmin = this.props.isAdmin;
    var adminIsAccessing = this.props.adminIsAccessing;
    var customer_id = this.props.customer_id;
    
    return(

            <div className="vertical-nav" id="sidebar">
                {isAdmin
                    ? 
                    <div>
                        <div className="py-4 px-3">
                        <div className="media">
                            <div className="media-body">
                            <h5 className="m-0 text-white media-body-heading">telecurve</h5>
                            </div>
                        </div>
                        </div>

                        <ul className="nav flex-column align-items-start mb-0">
                        <li className="nav-item">
                            <Link className="nav-redirect" to="/admin">
                                <a href="#" className="nav-link text-white font-italic">
                                <i className="admin-icon">
                                    <box-icon name='user-plus' color='#ffffff' size="md"></box-icon>
                                </i>
                                <span className="navbar-text" >admin</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-redirect" to="/logout">
                                <a href="#" className="nav-link text-white font-italic">
                                    <box-icon name='door-open' color='#ffffff' size="md"></box-icon>
                                    <span className="navbar-text">logout</span>
                                </a>
                            </Link>
                        </li>
                        </ul>
                    </div>

                    : 

                    adminIsAccessing

                    ? 
                    
                    <div>
                    <div className="py-4 px-3">
                    <div className="media">
                        <div className="media-body">
                        <h5 className="m-0 text-white media-body-heading">telecurve</h5>
                        </div>
                    </div>
                    </div>

                    <ul className="nav flex-column align-items-start mb-0">
                    <li className="nav-item">
                    <Link className="nav-redirect"
                        to={{
                            pathname: "/upload",
                            state: {
                            customer_id: customer_id,
                            adminIsAccessing: adminIsAccessing
                            },
                        }}
                    >
                            <a href="#" className="nav-link text-white font-italic">
                            <i className="nav-icon">
                                <box-icon name='upload' color='#ffffff' size="md"></box-icon>
                            </i>
                            <span className="navbar-text" >upload</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect"
                            to={{
                                pathname: "/manage",
                                state: {
                                customer_id: customer_id,
                                adminIsAccessing: adminIsAccessing
                                },
                            }}
                        >
                            <a href="#" className="nav-link text-white font-italic">
                                <i className="nav-icon">
                                    <box-icon name='file-blank' color='#ffffff' size="md"></box-icon>
                                </i>
                                <span className="navbar-text">manage</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect"
                                to={{
                                    pathname: "/menu",
                                    state: {
                                    customer_id: customer_id,
                                    adminIsAccessing: adminIsAccessing
                                    },
                                }}
                        >
                            <a href="#" className="nav-link text-white font-italic">
                                <i className="nav-icon">
                                    <box-icon name='phone' color='#ffffff' size="md"></box-icon>
                                </i>
                                <span className="navbar-text">menu</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect"
                                to={{
                                    pathname: "/settings",
                                    state: {
                                    customer_id: customer_id,
                                    adminIsAccessing: adminIsAccessing
                                    },
                                }}
                        >
                            <a href="#" className="nav-link text-white font-italic">
                                <i className="nav-icon text-primary">
                                    <box-icon name='cog' color='#ffffff' size="md"></box-icon>
                                </i>
                                <span className="navbar-text">settings</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect" to="/admin">
                            <a href="#" className="nav-link text-white font-italic">
                            <i className="admin-icon">
                                <box-icon name='user-plus' color='#ffffff' size="md"></box-icon>
                            </i>
                            <span className="navbar-text" >admin</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect" to="/logout">
                            <a href="#" className="nav-link text-white font-italic">
                                <box-icon name='door-open' color='#ffffff' size="md"></box-icon>
                                <span className="navbar-text">logout</span>
                            </a>
                        </Link>
                    </li>
                    </ul>
                    </div>

                    :
                    <div>
                    <div className="py-4 px-3">
                    <div className="media">
                        <div className="media-body">
                        <h5 className="m-0 text-white media-body-heading">telecurve</h5>
                        </div>
                    </div>
                    </div>

                    <ul className="nav flex-column align-items-start mb-0">
                    <li className="nav-item">
                        <Link className="nav-redirect" to="/upload">
                            <a href="#" className="nav-link text-white font-italic">
                            <i className="nav-icon">
                                <box-icon name='upload' color='#ffffff' size="md"></box-icon>
                            </i>
                            <span className="navbar-text" >upload</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect" to="/manage">
                            <a href="#" className="nav-link text-white font-italic">
                                <i className="nav-icon">
                                    <box-icon name='file-blank' color='#ffffff' size="md"></box-icon>
                                </i>
                                <span className="navbar-text">manage</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect" to="/menu">
                            <a href="#" className="nav-link text-white font-italic">
                                <i className="nav-icon">
                                    <box-icon name='phone' color='#ffffff' size="md"></box-icon>
                                </i>
                                <span className="navbar-text">menu</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect" to="/settings">
                            <a href="#" className="nav-link text-white font-italic">
                                <i className="nav-icon text-primary">
                                    <box-icon name='cog' color='#ffffff' size="md"></box-icon>
                                </i>
                                <span className="navbar-text">settings</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-redirect" to="/logout">
                            <a href="#" className="nav-link text-white font-italic">
                                <box-icon name='door-open' color='#ffffff' size="md"></box-icon>
                                <span className="navbar-text">logout</span>
                            </a>
                        </Link>
                    </li>
                    </ul>
                    </div>
                }
            </div>
    )
  }

}

export default Navbar;