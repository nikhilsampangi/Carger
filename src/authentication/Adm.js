import React, { Component } from 'react';
import { ReactComponent as Car } from '../assets/fp_car.svg';
import "./Adm.css";
import { Link, Redirect } from "react-router-dom";
import { login } from './adminFunctions';

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}


export default class Adm extends Component {
  constructor(props) {
    super(props);
    this.state = { login: true }
  }

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
  constructor() {
    super();
    this.state = { email: '', hashedPassword: '' , authenticated: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const user = {
      email: this.state.email,
      hashedPassword: this.state.hashedPassword
    }
    console.log(user)
    login(user)
      .then(res => {
        if (res.status) {
          // this.props.history.push('/')
          console.log(res.data)
          this.setState({authenticated:true})
        }
        else {
          console.log(res.error)
        }
      })
      .catch(err => {
        console.log('error:-' + err)
      })

    event.preventDefault();
  }

  render() {
    if (this.state.authenticated){
      return (<Redirect to="/Admin_home"/>)
    }
    return (
      <form className="form form-login" style={{ "border": "2px solid #a7e245" }} onSubmit={this.handleSubmit}>
        <fieldset>
          <legend> Please, enter your email and password for login</legend>
          <div className="input-block">
            <label for="login-email">E-mail</label>
            <input id="login-email" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          </div>
          <div className="input-block">
            <label for="login-password">Password</label>
            <input id="login-password" type="password" name="hashedPassword" value={this.state.hashedPassword} onChange={this.handleChange} required />
          </div>
        </fieldset>
        {/* <Link type="submit" className="btn btn-outline-success btn-login" to="/Admin_home">Login</Link> */}
        <button type="submit" className="btn btn-outline-success btn-login">Login</button>
      </form>

    )
  }
}