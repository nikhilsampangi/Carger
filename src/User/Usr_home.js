import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import "./Usr_home.css";
import Navbar from "./Navbar"
import Cookies from 'js-cookie';
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import { ReactComponent as Pump_art } from '../assets/home_pump_art.svg';
import { ReactComponent as Fuel_price_art } from '../assets/fuel_price_art.svg';
import { profile } from '../authentication/userFunctions'

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}

export default class Usr_home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: true, username:'', wallet:'', transactions:[] }
  }


  handleprofile(event) {
    let prof;
    if(Cookies.get('usertoken')) {
      prof = {
        token: Cookies.get('usertoken')
      }
    }
    console.log(Cookies.get('usertoken'))
    profile(prof)
    .then(res => {
      console.log(res)
      this.setState({
        username: res.data.username,
        wallet: res.data.balance,
        transactions: res.data.gasTransactions
      })
    })
  }

  componentDidMount(event) {
    this.handleprofile();
  }

  render() {
    if (Cookies.get('usertoken')) {
      return (
        <div className="container-fluid" onLoad={change_bg("usrhome")}>
          <Navbar />
          <br /><br /><br /><br /><br /><br /><br />
          <div className="container">
            <div className="row">
              <div className="col" >
                <Grad_Strip />
                <h1 style={{ "fontFamily": "josefin sans", "fontSize": "4em" }}>Hello {this.state.username}!<br /> Welcome Back!!</h1>
              </div>
              <div className="col-1" />
              <div className="col" >
                <Pump_art />
              </div>
            </div>
            <br /><br /><br /><br />
            <Grad_Strip />
            <br /><br /><br /><br />
            <div className="row">
              <div className="col" >
                <Fuel_price_art />
              </div>
              <div className="col-1" />
              <div className="col" >
                <Grad_Strip />
                <h1 style={{ "fontFamily": "josefin sans", "fontSize": "3.8em" }}>Today's Prices</h1>
                <br />
                <ul className="list-group list-group-flush" style={{ "fontSize": "1em" }}>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Diesel
                    <span className="flex-row-reverse">
                      {/* backend */}
                      <i className="fa fa-rupee-sign"></i>&nbsp;69.47 per Litre
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Petrol
                    <span className="flex-row-reverse">
                      {/* backend */}
                      <i className="fa fa-rupee-sign"></i>&nbsp;77.89 per Litre
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    CNG
                    <span className="flex-row-reverse">
                      {/* backend */}
                      <i className="fa fa-rupee-sign"></i>&nbsp;64.92 per Litre
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <br /><br /><br />
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

