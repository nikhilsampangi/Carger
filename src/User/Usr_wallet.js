import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import { ReactComponent as Grad_Strip } from '../assets/gradient_strip.svg';
import { ReactComponent as Wallet } from '../assets/wallet.svg';
import { pay, profile } from '../authentication/userFunctions';
import Cookies from 'js-cookie';
import Modal from 'react-responsive-modal';

export default class Usr_wallet extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: '', redirectLink: '', errorFlag: false, errMsg: "", username:'', wallet:'', transactions:[] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
    if (Cookies.get('usertoken')) {
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
          <Modal open={this.state.redirectLink === '' ? false : true} center={true}>
            <div className="card text-center">
              <div className="card-header">
                <h2>Info</h2>
              </div>
              <div className="card-body" style={{ "fontSize": "1.3em" }}>
                You are about visit an external site<br />
                <a href={this.state.redirectLink}>Click Here</a> to proceed to Paypal
            </div>
            </div>
          </Modal>
          <Navbar />
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <div className="container">
            <Grad_Strip />
            <div className="row">
              <div className="col-6" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
                <h2>Add Money to Wallet</h2>
                <br /><br /><br />
                <span style={{ "fontSize": "3em" }}>
                  {/* Amount /- */}
                  <div className="d-flex justify-content-center">
                    <span >
                      <i className="fa fa-money-bill-wave" />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                        <span >
                      <i className="fa fa-angle-double-right" />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                        <span >
                      <i className="fa fa-coins" />
                    </span>
                  </div>
                </span>
                <div className="input-group row">

                  <input type="text" className="form-control" placeholder="00.00" name="amount" value={this.state.amount} onChange={this.handleChange} />
                  {/*             
                    <div className="input-group-prepend">
                      <a className="btn btn-primary" href={this.state.redirectLink}><i className="fa fa-external-link-alt" />&nbsp;Redirect</a>
                    </div> */}
                </div>
                <br />
                <div className="input-group row">
                  <button className="btn btn-outline-dark btn-block" onClick={this.handleSubmit}>Add Money</button>
                </div>
              </div>
              <WalletBalance wallet={this.state.wallet}/>
            </div>
          </div>
        </div >
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
            :&nbsp;{this.props.wallet}
          {/* &nbsp;&nbsp;<i className="fa fa-coins" /> */}
          </span>
        </div>
      </div>

    )
  }
}
