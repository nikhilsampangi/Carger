import React, { Component, Fragment } from 'react'
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar"
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import "./Usr_shop.css"
import Cookies from 'js-cookie';
import axios from 'axios';

export default class Usr_shop extends Component {
  constructor(props) {
    super(props);
    // default set fuelavail to -1
    this.state = { fuelAvail: 0, quantity: 0, fuelType: 1, OutletName: 0 };
    this.handleChange = this.handleChange.bind(this)
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
                    <option value="1">Outlet A</option>
                    <option value="2">Outlet B</option>
                    <option value="3">Outlet C</option>
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
                Backend: copy paste code from your transactions in profile page
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
        <h2 className="usr_hdngs">Your Frequent Outlets</h2>
        <div className="card-body">
          {render_outlet}
        </div>
      </div>

    )
  }
}

class Outlet extends Component {
  render() {
    return (
      <div className="row d-flex justify-content-between align-items-center">
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
