import React, { Component } from 'react';
import { ReactComponent as Car } from '../assets/fp_car.svg';
import "./Cust.css";
import { register } from './userFunctions';
import { login } from './userFunctions'

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}

// const switchers = [...document.querySelectorAll('.switcher')]

// switchers.forEach(item => {
//   item.addEventListener('click', function () {
//     switchers.forEach(item => item.parentElement.classList.remove('is-active'))
//     this.parentElement.classList.add('is-active')
//   })
// })


export default class Cust extends Component {
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
  constructor() {
    super();
    this.state = { email: '', hashedPassword: '' };
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

    login(user)
      .then(res => {
        if (res.status) {
          // this.props.history.push('/')
          console.log(res.data)
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
    return (
      <form className="form form-login" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend> Please, enter your email and password for login</legend>
          <div className="input-block">
            <label for="login-email">E-mail</label>
            <input id="login-email" type="text" name="email" value={this.state.email} onChange={this.handleChange} required />
          </div>
          <div className="input-block">
            <label for="login-password">Password</label>
            <input id="login-password" type="password" name="hashedPassword" value={this.state.hashedPassword} onChange={this.handleChange} required />
          </div>
        </fieldset>
        <button type="submit" className="btn btn-outline-success btn-login">Login</button>
      </form>

    )
  }
}
class Register extends Component {
  constructor() {
    super();
    this.state = { username: '', hashedPassword: '', confirmPassword:'', phone: '', email: '', gender: 'Prefer not to say'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

    const newUser = {
      username: this.state.username,
      hashedPassword: this.state.hashedPassword,
      email: this.state.email,
      phone: this.state.phone,
      gender: this.state.gender,
      confirmPassword: this.state.confirmPassword
    }

    register(newUser)
      .then(res => {
        console.log(res.status)
        if (res.status) {
          // this.props.history.push('/login')
          console.log(res.data)
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
    return (
      <form className="form form-signup row" onSubmit={this.handleSubmit}>
        <fieldset className="col-5">
          <legend>Please, enter your email, password and password confirmation for sign up.</legend>
          <div className="input-block">
            <label for="signup-email">E-mail</label>
            <input id="signup-email" type="text" name="email" value={this.state.email} onChange={this.handleChange} required />
          </div>
          <div class="input-block">
            <label for="signup-password">Password</label>
            <input id="signup-password" type="password" name="hashedPassword" value={this.state.hashedPassword} onChange={this.handleChange} required />
          </div>
          <div class="input-block">
            <label for="signup-password-confirm">Confirm password</label>
            <input id="signup-password-confirm" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required />
          </div>
        </fieldset>
        <div className="col-2" />
        <fieldset className="col-5">
          <div class="input-block">
            <label for="signup-uname">Username</label>
            <input id="signup-uname" type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
          </div>
          <div class="input-block">
            <label for="signup-phone-num">Phone</label>
            <input id="signup-phone-num" type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
          </div>
          <div class="input-block">
            <label for="signup-gender">Gender</label>
            <select id="signup-gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </fieldset>
        <button type="submit" className="btn btn-outline-primary btn-signup">Continue</button>
      </form>

    )
  }
}