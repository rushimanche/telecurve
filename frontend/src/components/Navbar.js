import React, { Component } from 'react';
import './styles/Navbar.css'
import 'boxicons';

export class Navbar extends Component {

  render() {
    return(
        <div class="vertical-nav" id="sidebar">
            <div class="py-4 px-3">
            <div class="media">
                <div class="media-body">
                <h5 class="m-0 text-white media-body-heading">telecurve</h5>
                </div>
            </div>
            </div>

            <ul class="nav flex-column align-items-start mb-0">
            <li class="nav-item">
                <a href="#" class="nav-link text-white font-italic">
                <i class="nav-icon">
                    <box-icon name='upload' color='#ffffff' size="md"></box-icon>
                </i>
                <span class="navbar-text" >upload</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-white font-italic">
                    <i class="nav-icon">
                        <box-icon name='file-blank' color='#ffffff' size="md"></box-icon>
                    </i>
                    <span class="navbar-text">manage</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-white font-italic">
                    <i class="nav-icon">
                        <box-icon name='phone' color='#ffffff' size="md"></box-icon>
                    </i>
                    <span class="navbar-text">menu</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-white font-italic">
                    <i class="nav-icon text-primary">
                        <box-icon name='cog' color='#ffffff' size="md"></box-icon>
                    </i>
                    <span class="navbar-text">settings</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-white font-italic">
                    <box-icon name='door-open' color='#ffffff' size="md"></box-icon>
                    <span class="navbar-text">logout</span>
                </a>
            </li>
            </ul>

        </div>
    )
  }

}

export default Navbar;