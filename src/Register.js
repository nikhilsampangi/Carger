import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Register.css"
// function change_bg_1() {
//   document
//     .getElementById("app")
//     .classList.remove(document.getElementById("app").classList[0]);
//   document.getElementById("app").classList.add("fp");
// }

export default class Register extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <img src="https://i.ibb.co/G35h9S1/logo-v1-2.png" alt="logo-v1-2" border="0" className="mlogo" width="85%" />
        </div>
        <div className="col-6" style={{ paddingTop: "11%", paddingRight: "4%" }}>
          <div className="signup">Sign Up</div>
          <br />
          <form
            onSubmit=""
            className="text-center"
            style={{ color: "#757575" }}
          >
            <div className="md-form">
              <input
                type="text"
                id="materialLoginFormEmail"
                className="form-control"
                name="username"
                placeholder="User Name"
              />
            </div>
            <br />
            <div className="md-form">
              <input
                type="email"
                id="materialLoginFormEmail"
                className="form-control"
                name="email"
                placeholder="E-mail"
              />
            </div>
            <br />
            <div className="md-form">
              <input
                type="password"
                id="materialLoginFormPassword"
                className="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <br />
            <div className="md-form">
              <input
                type="password"
                id="materialLoginFormPassword"
                className="form-control"
                name="password2"
                placeholder="Confirm Password"
              />
            </div>
            <button
              className="btn btn-outline-danger btn-rounded btn-block my-4 waves-effect z-depth-0"
              type="submit"
            >
              Register
              </button>
            <p>
              Already have an account?
                <br />
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div >
    );
  }
}
