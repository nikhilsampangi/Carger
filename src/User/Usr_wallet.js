import React, { Component } from 'react';
import Navbar from "./Navbar";
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';

export default class Usr_wallet extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br /><br /><br /><br /><br /><br /><br />
        <div className="container">
          <Grad_Strip />
          <div className="row">
            <div className="col-9" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
              <h2>Add Money to Wallet</h2>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <span style={{ "fontSize": "2.2em", "color": "green" }}>
                <i className="fa fa-money-bill-wave" />
              </span>
              &nbsp;&nbsp;&nbsp;
              <span style={{ "fontSize": "2.2em" }}>
                <i className="fa fa-angle-double-right" />
              </span>
              &nbsp;&nbsp;&nbsp;
              <span style={{ "fontSize": "2.2em", "color": "gold" }}>
                <i className="fa fa-coins" />
              </span>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Amount in rupees</span>
              </div>
              <input type="text" className="form-control" placeholder="00.00" />
              <div className="input-group-prepend">
                <button className="btn btn-outline-dark">Add Money</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
