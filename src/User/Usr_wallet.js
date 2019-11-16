import React, { Component } from 'react';
import Navbar from "./Navbar";

export default class Usr_wallet extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br /><br /><br /><br /><br /><br /><br />
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-6">
                  <h3>Add Money to Wallet</h3>
                </div>
                <div className="col">
                  <i className="fa fa-money-bill-wave" />
                  &nbsp;&nbsp;&nbsp;
                  <i className="fa fa-angle-double-right" />
                  &nbsp;&nbsp;&nbsp;
                  <i className="fa fa-coins" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
