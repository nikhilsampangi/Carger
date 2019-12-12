import React, { Component, Fragment } from 'react';
import { ReactComponent as Logo } from "../assets/logo_v1.svg";
import { Link } from "react-router-dom";
import "./Stf_home.css"
import Dashboard from './Dashboard';
import RevenueStatistics from './RevenueStatistics';
import PumpStatistics from './PumpStatistics';
import CustomerFeedback from './CustomerFeedback';
import Cookies from "js-cookie";


function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}

export default class Stf_home extends Component {
  // state = {
  //   isTop: true
  // };
  // componentDidMount() {
  //   document.addEventListener("scroll", () => {
  //     const isTop = window.scrollY < 75;
  //     if (isTop !== this.state.isTop) {
  //       this.setState({ isTop });
  //     }
  //   });
  // }
  constructor(props) {
    super(props);
    this.state = { Tab: 1, }
  }
  // componentDidMount() {
  //   this.refs.myComponentDiv.addEventListener('click', this.clickHandler);
  // }
  // clickHandler() {
  // }

  logOut(event) {
    Cookies.remove('usertoken')
  }
  
  render() {
    let Db = "Db"
    let Rs = "Rs"
    let Ps = "Ps"
    let Cf = "Cf"
    if (this.state.Tab === 1) {
      Db = "DbActive"
    }
    else if (this.state.Tab === 2) {
      Rs = "RsActive"
    }
    else if (this.state.Tab === 3) {
      Ps = "PsActive"
    }
    else if (this.state.Tab === 4) {
      Cf = "CfActive"
    }

    
    return (
      <Fragment onLoad={change_bg("boo")} className="container-fluid">
        <nav class="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow" style={{ "backgroundColor": "#1f262d" }}>
          <Link to="/Employee_home">
            <Logo id="stfhmlogo" />
          </Link>
          {/* <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
          {/* <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link">Sign out</a>
            </li>
          </ul> */}
          <Link className="flex-row-reverse" to="/">
            <h5 style={{ "color": "white", "marginRight": "1.7vw" }} onClick={this.logOut.bind(this)}><i className="fas fa-sign-out-alt"></i>&nbsp;Log out</h5>
          </Link>
        </nav>
        <div>
          <div className="SideBar" style={{ "paddingTop": "9vh" }}>
            <hr style={{ "backgroundColor": "#1f262d" }} />
            <div className="SBItem" id={Db} ref="TabChange" onClick={() => this.setState({ Tab: 1 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-home"></i>
              &nbsp;&nbsp;&nbsp;
              Dashboard
              {/* <i className="fas fa-chevron-right"></i> */}
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={Rs} ref="TabChange" onClick={() => this.setState({ Tab: 2 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i class="fas fa-money-check-alt"></i>
              &nbsp;&nbsp;&nbsp;
              Revenue Statistics
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={Ps} ref="TabChange" onClick={() => this.setState({ Tab: 3 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i class="fas fa-gas-pump"></i>
              &nbsp;&nbsp;&nbsp;
              Pump Statistics
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={Cf} ref="TabChange" onClick={() => this.setState({ Tab: 4 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i class="fas fa-comment-dots"></i>
              &nbsp;&nbsp;&nbsp;
              Customer Feedback
            </div>
          </div>
          <br /><br /><br /><br /><br />
          <div className="MainContent" style={{ "marginLeft": "19vw" }}>
            {this.state.Tab === 1 ? <Dashboard /> : null}
            {this.state.Tab === 2 ? <RevenueStatistics /> : null}
            {/* backend - array of no of pumps [diesel, petrol, cng] should be passed in here - */}
            {this.state.Tab === 3 ? <PumpStatistics pumpcount={[3, 4, 3]} /> : null}
            {this.state.Tab === 4 ? <CustomerFeedback /> : null}
          </div>
        </div>
        {/* <script src="dashboard.js"></script> */}
      </Fragment>
    )
  }
}




