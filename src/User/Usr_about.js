import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar"
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import Cookies from 'js-cookie';

export default class User_about extends Component {
  render() {
    if (Cookies.get('usertoken')) {
      return (
        <div>
          <Navbar />
          <br /><br /><br /><br /><br /><br /><br />
          <div className="container">
            <Grad_Strip />
            <div className="row">
              <div className="col" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
                <h2>About Us</h2>
              </div>
            </div>
            <br />
            <div className="row">
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col"></div>
            <div className="col-8">
              Soad Group 7
              <ul>
                <li>Kevin John S20170010070</li>
                <li>Moosa Mohamed S20170010096</li>
                <li>Ajith Nagelli S20170010100</li>
                <li>Prashant Raj S20170010111</li>
                <li>Nikhil Sampangi S20170010136</li>
                <li>Bharath Sandepogu S20170010137</li>
              </ul>
            </div>
            <div className="col"></div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Fragment>
          <Redirect to="/Customer" />
        </Fragment>
      )
    }
  }
}
