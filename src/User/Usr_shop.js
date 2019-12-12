import React, { Component, Fragment } from 'react'
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar"
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import "./Usr_shop.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { profile } from "../authentication/userFunctions";
import { gasTrans } from "../authentication/userFunctions";



export default class Usr_shop extends Component {
  constructor(props) {
    super(props);
    // default set fuelavail to -1
    this.state = { fuelAvail: 0, quantity: 0, fuelType: 1, OutletName: 0, authenticated: true, username: '', wallet: '', transactions: [] };
    this.handleChange = this.handleChange.bind(this)
  }

  handleprofile(event) {
    let prof;
    if (Cookies.get('usertoken')) {
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

  getOutlets() {
    gasTrans()
      .then(res => {
        console.log(res.data)
      }).catch(
        err => { console.log(err) }
      )
  }

  componentDidMount(event) {
    this.handleprofile();
    this.getOutlets();

  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
              <div className="col usr_hdngs">
                <h2>Buy Fuel</h2>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="container">
                <div className="form-group row">
                  <label className="col-2">Choose Fuel Type</label>
                  <select className="form-control custom-select col-7" name="fuelType" onChange={this.handleChange} value={this.state.value}>
                    <option value="1">Diesel</option>
                    <option value="2">Petrol</option>
                    <option value="3">CNG</option>
                  </select>
                  <div className="col-2" />
                </div>
                <div className="form-group row">
                  <label className="col-2">Enter Quantity</label>
                  <input className="form-control col-7" type="text" placeholder="amount in litres" name="quantity" onChange={this.handleChange} />
                </div>
                <div className="form-group row">
                  <label className="col-2">Select Outlet</label>
                  <select className="form-control custom-select col-5" name="OutletName" onChange={this.handleChange} value={this.state.value}>
                    {/* Backend */}
                    {/* <option value="0">Select outlet to show availability</option> */}
                    <option value="1">Petrol Station 1</option>
                    <option value="2">Petrol Station 2</option>
                    <option value="3">Petrol Station 3</option>
                  </select>
                  <div className="col-2">
                    <button className="btn btn-outline-dark">
                      Check availability
                    </button>
                  </div>
                  <div className="col-3">
                    {/* Backend if available show available */}
                    {this.state.fuelAvail == -1 ?
                      <span><i className="fa fa-info-circle" /></span>
                      : (this.state.fuelAvail == 0 ?
                        <span style={{ "color": "tomato" }}><i className="fa fa-exclamation" />&nbsp;&nbsp;Sorry We're out of fuel</span>
                        :
                        <span style={{ "color": "green" }}><i className="fa fa-check" />&nbsp;&nbsp;Available</span>
                      )

                    }
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-2">Total Cost</div>
                  <div className="col-7">
                    <i className="fa fa-rupee-sign" />&nbsp;
                  {this.state.fuelType == 1 ?
                      this.state.quantity * 69.47 :
                      this.state.fuelType == 2 ?
                        this.state.quantity * 77.89 :
                        this.state.quantity * 64.92
                    }/-
                </div>
                </div>
                <div className="form-group row">
                  <div className="col-2" />
                  <button className="btn btn-outline-dark btn-block col-7" disabled={this.state.fuelAvail == 1 ? false : true}>Buy Fuel</button>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <Frequent_Outlets />
              <div className="col-1" />
              <div className="col">
                <Grad_Strip />
                <h2 className="usr_hdngs">Recent Purchaces</h2>
                <Recent_Transactions transactions={this.state.transactions} />
              </div>
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

class Frequent_Outlets extends Component {
  render() {
    var OutletList = []
    // var len = OutletList.length; // backend
    var len = 7 // hardcoded for now
    var render_outlet = []
    for (var i = 0; i < len; i++) {
      render_outlet.push(<Outlet />);// Add required props here
      render_outlet.push(<hr />);
    }
    return (
      <div className="col">
        <Grad_Strip />
        <h2 className="usr_hdngs">Your Recent Outlets</h2>
        <div className="card-body">
          {/* {render_outlet} */}
        </div>
      </div>

    )
  }
}

class Outlet extends Component {
  render() {
    return (
      <div className="row d-flex justify-content-between align-items-center" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
        {/* send through props */}
        outlet.name
          <span className="flex-row-reverse">
          {/* send through props */}
          outlet.lastvisited
      </span>
      </div>
    )
  }
}

class Recent_Transactions extends Component {

  render() {
    {/* backend: send array of all gas transactions here */ }
    var gasTrans = []
    // var len = gasTrans.length // comment below one and uncomment this
    var len = this.props.transactions.length // hardcoded for now
    var render_tr = []
    for (var i = 0; i < len; i++) {
      render_tr.push(<Transaction transaction={this.props.transactions[i]} />);// Add required props here
      render_tr.push(<hr />);
    }
    return (
      <div className="col" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
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
        {this.props.transaction.quantity}
        <span className="flex-row-reverse">
          {/* send through props */}
          {this.props.transaction.cost}
        </span>
      </div>
    )
  }
}
