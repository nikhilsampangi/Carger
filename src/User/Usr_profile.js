import React, { Component, Fragment } from 'react'
import { Link, Redirect } from "react-router-dom"
import Navbar from "./Navbar"
import { ReactComponent as Wallet } from '../assets/wallet.svg';
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import Cookies from "js-cookie";

export default class User_profile extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: true }
  }

  logOut(event) {
    event.preventDefault()
    Cookies.remove('usertoken')
    this.setState({ authenticated: false })
  }
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
                <h2>Profile</h2>
              </div>
            </div>
            <br />
            <div className="row">
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-1" />
              <div className="col-10">
                <div className="card">
                  <Grad_Strip />
                  <div className="card-body">
                    <div className="card-title row">
                      <span style={{ "fontFamily": "Josefin Sans, sans-serif", "fontSize": "2em" }} className="col-10">
                        Hello User.Name!!
                      </span>
                      <button className="btn btn-outline-dark col-2" onClick={this.logOut.bind(this)}><i className="fas fa-sign-out-alt"></i>&nbsp;Log Out</button>
                    </div>
                    <br /><br />
                    <div className="row">
                      {/* <Wallet_Balance /> */}
                      <WalletBalance />
                      <Recent_Transactions />
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
    else {
      return (
        <Fragment>
          <Redirect to="/" />
        </Fragment>
      )
    }
  }
}

class WalletBalance extends Component {
  render() {
    return (
      <div className="col-6" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
        <h2>Wallet Balance</h2>
        <br />
        <div style={{ "textAlign": "center" }}>
          <Wallet style={{ "height": "35vh" }} />
          &nbsp;&nbsp;&nbsp;
        <span style={{ "fontSize": "3em" }}>
            :&nbsp;69
          {/* &nbsp;&nbsp;<i className="fa fa-coins" /> */}
          </span>
        </div>
      </div>

    )
  }
}

// class Wallet_Balance extends Component {
//   render() {
//     return (
//       <div className="card border-success" >
//         <div className="card-header" style={{ "backgroundColor": "#28a745", "color": "white", "fontFamily": "Roboto Condensed, sans-serif" }}>
//           <center style={{ "fontSize": "1.6em" }}>
//             Your  Balance
//           </center>
//         </div>
//         <div className="card-body" style={{ "textAlign": "center" }}>
//           <br />
//           <h1 className="align-middle" style={{ "fontFamily": "Ubuntu Condensed, sans-serif", "paddingTop": "20px" }}>
//             <i className="fa fa-wallet"></i>
//             &nbsp;:&nbsp;&nbsp;
//             69
//             &nbsp;
//             <i className="fa fa-coins"></i></h1>
//           <br />
//           <Wallet style={{ "height": "125px" }} />
//         </div>
//       </div>
//     )
//   }
// }

class Recent_Transactions extends Component {

  render() {
    {/* backend: send array of all gas transactions here */ }
    var gasTrans = []
    // var len = gasTrans.length // comment below one and uncomment this
    var len = 10 // hardcoded for now
    var render_tr = []
    for (var i = 0; i < len; i++) {
      render_tr.push(<Transaction />);// Add required props here
      render_tr.push(<hr />);
    }
    return (
      <div className="col" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
        <h2>Your Transactions</h2>
        <div className="card-body">
          {render_tr}
        </div>
      </div>

    )
  }
}

class Transaction extends Component {
  render() {
    return (
      <div className="row d-flex justify-content-between align-items-center">
        {/* send through props */}
        transaction.details
      <span className="flex-row-reverse">
          {/* send through props */}
          transaction.time
      </span>
      </div>
    )
  }
}