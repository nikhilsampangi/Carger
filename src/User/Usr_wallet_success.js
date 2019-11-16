import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";

export default class Usr_wallet_success extends Component {
  render() {
    return (
      <div className="container">
        Payment Successful <Link to="/User_Wallet">Click Here</Link> to go Back to Home Page
      </div>
    )
  }
}
