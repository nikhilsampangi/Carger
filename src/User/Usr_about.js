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
