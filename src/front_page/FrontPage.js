import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ReactComponent as Logo_1 } from '../assets/logo_v1.svg';
import { ReactComponent as Cust } from '../assets/cust.svg';
import { ReactComponent as Stf } from '../assets/stf.svg';
import { ReactComponent as Adm } from '../assets/adm.svg';
import { ReactComponent as Car } from '../assets/fp_car.svg';
import DelayLink from '../DelayLink.js';
import "./FrontPage.css";

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}

export default class FrontPage extends Component {
  constructor(props) {
    super(props);
    // this.MoveButton = this.MoveButton.bind(this);
    this.state = { cust: false, stf: false, adm: false };


  }
  // MoveButton() {
  //   if (this.state.flag == 1) {
  //     document.getElementById("cust").classList.add("animated zoomOutRight Slower");
  //   }

  // }

  // addClasses(x) {
  //   if (this.state.cust) {
  //     this.setState({ isPressed: !this.state.isPressed });
  //   }
  // }
  // moveCar() {
  //   cr = "animated fadeOutRightBig"
  // }
  // carcar() {
  //   this.setState({ car: true });
  // }
  render() {
    // let classList = "fpbtn"
    // if (this.state.flag == 1) classList += "animated zoomOutRight Slower";

    // var classList = 'fpbtn';
    // if (this.state.isPressed) classList += ' animated zoomOutRight Slower';
    let custClass = "fpbtn";
    if (this.state.cust) {
      // this.carcar();
      custClass += " animated pulse";
    }
    let stfClass = "fpbtn";
    if (this.state.stf) {
      stfClass += " animated pulse";
    }
    let admClass = "fpbtn";
    if (this.state.adm) {
      admClass += " animated pulse";
    }
    let cr = "";
    if (this.state.cust | this.state.stf | this.state.adm) cr = "animated slideOutRight fast";
    return (
      <div className="row" onLoad={change_bg("fp")}>
        <div className="col-5">
          {/* <img src={logo} alt="logo-v1-2" border="0" className="mlogo" width="85%" /> */}
          <Logo_1 id="fp_logo" />
        </div>
        <div className="col-7" style={{ "paddingTop": "15vh" }}>
          <div>
            <button className={custClass} id="cust" style={{ "marginLeft": "20vw" }} onClick={() => this.setState({ cust: !this.state.cust })}>
              <DelayLink to="/Customer" delay={800}>
                <Cust className="fpbtnico" />
              </DelayLink>
            </button>
            <div style={{ "height": "1vh" }}></div>
            <button className={stfClass} id="stf" style={{ "marginLeft": "12vw" }} onClick={() => this.setState({ stf: true })}>
              <DelayLink to="/Staff" delay={800}>
                <Stf className="fpbtnico" />
              </DelayLink>
            </button>
            <div style={{ "height": "1vh" }}></div>
            <button className={admClass} id="adm" style={{ "marginLeft": "4vw" }} onClick={() => this.setState({ adm: true })}>
              <DelayLink to="/Admin" delay={800}>
                <Adm className="fpbtnico" />
              </DelayLink>
            </button>
          </div>
          <Car id="car" className={cr} />
        </div>
      </div >
    );
  }
}
