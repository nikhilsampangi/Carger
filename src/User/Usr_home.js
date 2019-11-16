import React, { Component } from 'react'
import { ReactComponent as Navbarbg } from "../assets/navbar.svg";
import "./Usr_home.css";

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}

export default class Usr_home extends Component {
  render() {
    return (
      <div className="container-fluid" onLoad={change_bg("usrhome")}>
        <Navbar />
      </div>
    )
  }
}

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light userhomenavbar row">
          <div className="col">
            1
          </div>
          <div className="col">
            2
          </div>
          <div className="col">

          </div>
          <div className="col">
            3
          </div>
          <div className="col">
            4
          </div>
        </nav>

      </div>
    )
  }
}