import React, { Component } from 'react';
import { ReactComponent as Car } from '../assets/fp_car.svg';
import "./Adm.css";
import { Link } from "react-router-dom";

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}


export default class Adm extends Component {
  render() {
    return (
      <div onLoad={change_bg("auth")}>
        <div className="row">
          {/* <button className="btn btn-primary" onClick={() => this.setState({ login: true })}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => this.setState({ login: false })}>
              Register
            </button> */}
          <div className="forms">
            <div className="form-wrapper is-active">
              <button className="switcher switcher-login">
                Login
                  <span class="underline"></span>
              </button>
              <Login />
            </div>
          </div>
          {/* {this.state.login ? <Login /> : <Register />} */}
        </div>

        <Car id="car2" className="animated slideInLeft" />
      </div>
    )
  }
}

class Login extends Component {
  render() {
    return (
      <form className="form form-login" style={{ "border": "2px solid #a7e245" }}>
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
        <Link type="submit" className="btn btn-outline-success btn-login" to="/Admin_home">Login</Link>
        {/* <button type="submit" className="btn btn-outline-success btn-login">Login</button> */}
      </form>

    )
  }
}