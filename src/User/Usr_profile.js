import React, { Component } from 'react'
import Navbar from "./Navbar"
import { ReactComponent as Wallet } from '../assets/piggybank.svg';

export default class User_profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br /><br /><br /><br /><br /><br /><br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-1" />
            <div className="col-10">
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <div className="card-title row">
                    <span style={{ "fontSize": "2em" }} className="col-10">
                      Hello User.Name!!
                    </span>
                    <button className="btn btn-outline-dark col-2"><i className="fas fa-sign-out-alt"></i>&nbsp;Log Out</button>
                  </div>
                  <br /><br />
                  <div className="row">
                    <div className="col">
                      <Wallet_Balance />
                    </div>
                    <div className="col-1" />
                    <div className="col">
                      <Recent_Transactions />
                    </div>
                  </div>
                  <div className="row">

                  </div>
                </div>
              </div>
            </div>
            <div className="col-1" />
          </div>
        </div>
      </div>
    )
  }
}

class Wallet_Balance extends Component {
  render() {
    return (
      <div className="card border-success" >
        <div className="card-header" style={{ "backgroundColor": "#28a745", "color": "white", "fontFamily": "Roboto Condensed, sans-serif" }}>
          <center style={{ "fontSize": "1.6em" }}>
            Your  Balance
          </center>
        </div>
        <div className="card-body" style={{ "textAlign": "center" }}>
          <br />
          <h1 className="align-middle" style={{ "fontFamily": "Ubuntu Condensed, sans-serif", "paddingTop": "20px" }}>
            <i className="fa fa-wallet"></i>
            &nbsp;:&nbsp;&nbsp;
            69
            &nbsp;
            <i className="fa fa-coins"></i></h1>
          <br />
          <Wallet style={{ "height": "125px" }} />
        </div>
      </div>
    )
  }
}

class Recent_Transactions extends Component {
  render() {
    return (
      <div className="card border-primary">
        <div className="card-header" style={{ "backgroundColor": "#007bff", "color": "white", "fontFamily": "Roboto Condensed, sans-serif" }}>
          <center style={{ "fontSize": "1.6em" }}>
            Your Transactions
          </center>
        </div>
        <div className="card-body">
          <div className="row d-flex justify-content-between align-items-center">
            asdasdasd
            <span className="flex-row-reverse">
              asdsadasd
            </span>
          </div>
          <hr />
          <div className="row d-flex justify-content-between align-items-center">
            asdasdasd
            <span className="flex-row-reverse">
              asdsadasd
            </span>
          </div>
          <hr />
          <div className="row d-flex justify-content-between align-items-center">
            asdasdasd
            <span className="flex-row-reverse">
              asdsadasd
            </span>
          </div>
          <hr />
          <div className="row d-flex justify-content-between align-items-center">
            asdasdasd
            <span className="flex-row-reverse">
              asdsadasd
            </span>
          </div>
          <hr />
          <div className="row d-flex justify-content-between align-items-center">
            asdasdasd
            <span className="flex-row-reverse">
              asdsadasd
            </span>
          </div>
          <hr />

        </div>
      </div>

    )
  }
}