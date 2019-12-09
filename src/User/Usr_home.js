import React, { Component } from 'react';
import "./Usr_home.css";
import Navbar from "./Navbar"

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
        <br /><br /><br /><br /><br /><br /><br />
        <div className="container">
          <div className="row">
            <div className="col" >1</div>
            <div className="col-1" />
            <div className="col" >2</div>
          </div>
        </div>
      </div>
    )
  }
}

