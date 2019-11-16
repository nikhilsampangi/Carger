import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import { pay } from '../authentication/userFunctions';
import Cookies from 'js-cookie';
import Modal from 'react-responsive-modal';

export default class Usr_wallet extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: '', redirectLink: '', errorFlag: false, errMsg: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    if (Cookies.get('usertoken')) {
      const add_money = {
        amount: this.state.amount,
        token: Cookies.get('usertoken')
      }
      console.log(Cookies.get('usertoken'));
      pay(add_money)
        .then(res => {
          if (res.status) {
            console.log(res.data)
            this.setState({ redirectLink: res.data })
          }
          else {
            this.setState({ errorFlag: true, errMsg: res.error })
            // console.log(res.error)
          }
        })
        .catch(err => {
          console.log('error:-' + err)
        })
    }
    else {
      alert("No token exist please login")
    }
    event.preventDefault();
  }

  render() {

    return (
      <div>
        <Modal open={this.state.errorFlag} onClose={() => this.setState({ errorFlag: false })} center={true}>
          <div className="container" style={{ "width": "35vw", "padding": "5%" }}>
            <div className="card text-center border-danger">
              <div className="card-header" style={{ "backgroundColor": "#dc3545", "color": "white" }}>
                <h3>Error</h3>
              </div>
              <div className="card-body">
                {this.state.errMsg}
              </div>
            </div>
          </div>
        </Modal>
        <Navbar />
        <br /> <br /> <br /> <br /> <br /> <br /> <br />
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
          <div className="input-group row">
            <div className="input-group-prepend">
              <span className="input-group-text">Amount /-</span>
            </div>
            <input type="text" className="form-control" placeholder="00.00" name="amount" value={this.state.amount} onChange={this.handleChange} />
            {this.state.redirectLink === '' ?
              <div className="input-group-prepend">
                <button className="btn btn-outline-dark" onClick={this.handleSubmit}>Add Money</button>
              </div>
              :
              <div className="input-group-prepend">
                <a className="btn btn-primary" href={this.state.redirectLink}><i className="fa fa-external-link-alt" />&nbsp;Redirect</a>
              </div>
            }
          </div>
        </div>
      </div >
    )
  }
}
