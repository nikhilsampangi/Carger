import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar"
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import Cookies from 'js-cookie';
import { ReactComponent as Logo_sym } from "../assets/logo_symbol.svg";

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
            <br />
            <div className="row" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
              <div className="col"></div>
              <div className="col-8">
                <div className="row">
                  <center><h1>SOAD Group 7</h1></center>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="row"><i className="fa fa-user-alt"></i></div>
                    <div className="row"><center>Kevin John</center></div>
                    <div className="row">S20170010070</div>
                  </div>
                  <div className="col">
                    <div className="row"><i className="fa fa-user-alt"></i></div>
                    <div className="row">Moosa Mohamed</div>
                    <div className="row">S20170010096</div>
                  </div>
                  <div className="col">
                    <div className="row"><i className="fa fa-user-alt"></i></div>
                    <div className="row">Ajith Nagelli</div>
                    <div className="row">S20170010100</div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <div className="row"><i className="fa fa-user-alt"></i></div>
                    <div className="row">Prashant Raj</div>
                    <div className="row">S20170010111</div>
                  </div>
                  <div className="col">
                    <div className="row"><i className="fa fa-user-alt"></i></div>
                    <div className="row">Nikhil Sampangi</div>
                    <div className="row">S20170010136</div>
                  </div>
                  <div className="col">
                    <div className="row"><i className="fa fa-user-alt"></i></div>
                    <div className="row">Bharath Sandepogu</div>
                    <div className="row">S20170010137</div>
                  </div>
                </div>
              </div>
              <div className="col"></div>
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
