import React, { Component } from 'react';
import { ReactComponent as Car } from '../assets/fp_car.svg';
import "./Cust.css";
import { Link } from 'react-router-dom';

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}


export default class Stf extends Component {
  constructor(props) {
    super(props);
    this.state = { login: true }
  }
  render() {
    let classl = ""
    let classr = ""
    if (this.state.login) {
      classl = "form-wrapper is-active"
      classr = "form-wrapper"
    }
    else {
      classr = "form-wrapper is-active"
      classl = "form-wrapper"
    }
    return (
      <div onLoad={change_bg("auth")}>
        <div className="row">
          <div className="col-6">
            {/* <button className="btn btn-primary" onClick={() => this.setState({ login: true })}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => this.setState({ login: false })}>
              Register
            </button> */}
            <div className="forms">
              <div className={classl}>
                <button type="button" className="switcher switcher-login" onClick={() => this.setState({ login: true })}>
                  Login
                  <span class="underline"></span>
                </button>
                <Login />
              </div>
              <div className={classr}>
                <button type="button" className="switcher switcher-signup" onClick={() => this.setState({ login: false })}>
                  Register
                  <span class="underline"></span>
                </button>
                <Register />
              </div>
            </div>
            {/* {this.state.login ? <Login /> : <Register />} */}
          </div>
        </div>

        <Car id="car2" className="animated slideInLeft" />
      </div>
    )
  }
}

class Login extends Component {
  render() {
    return (
      <form className="form form-login">
        <fieldset>
          <legend> Please, enter your email and password for login</legend>
          <div className="input-block">
            <label for="login-email">E-mail</label>
            <input id="login-email" type="email" required />
          </div>
          <div className="input-block">
            <label for="login-password">Password</label>
            <input id="login-password" type="password" required />
          </div>
        </fieldset>
        <Link type="submit" className="btn btn-outline-success btn-login" to="/Employee_Home">
          {/* <Link to="Employee_home">Login</Link> */}
          Login
        </Link>
      </form>

    )
  }
}
class Register extends Component {
  render() {
    return (
      <form className="form form-signup">
        <fieldset>
          <legend>Please, enter your email, password and password confirmation for sign up.</legend>
          <div className="input-block">
            <label for="signup-email">E-mail</label>
            <input id="signup-email" type="email" required />
          </div>
          <div class="input-block">
            <label for="signup-password">Password</label>
            <input id="signup-password" type="password" required />
          </div>
          <div class="input-block">
            <label for="signup-password-confirm">Confirm password</label>
            <input id="signup-password-confirm" type="password" required />
          </div>
        </fieldset>
        <Link type="submit" className="btn btn-outline-primary btn-signup" to="/Employee_Home">Continue</Link>
      </form>

    )
  }
}