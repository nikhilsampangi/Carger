import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo_v1.svg";
import "./Adm_home.css";

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}

export default class Adm_home extends Component {
  constructor(props) {
    super(props);
    this.state = { Tab: 1 }
  }

  render() {
    let AOo = "AOo"
    let ASd = "ASd"
    let ARs = "ARs"
    let AUo = "AUo"
    let ACf = "ACf"
    switch (this.state.Tab) {
      case 1:
        AOo = "AOoActive"
        break;
      case 2:
        ASd = "ASdActive"
        break;
      case 3:
        ARs = "ARsActive"
        break;
      case 4:
        AUo = "AUoActive"
        break;
      case 5:
        ACf = "ACfActive"
        break;
    }
    return (
      <div onLoad={change_bg("boo")} className="container-fluid">
        <nav class="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow" style={{ "backgroundColor": "#1f262d" }}>
          <Link to="/Admin_home">
            <Logo id="stfhmlogo" />
          </Link>
          {/* <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
          {/* <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link">Sign out</a>
            </li>
          </ul> */}
          {/* backend: log out */}
          <Link className="flex-row-reverse" to="/">
            <h5 style={{ "color": "white", "marginRight": "1.7vw" }}><i className="fas fa-sign-out-alt"></i>&nbsp;Log out</h5>
          </Link>
        </nav>
        <div>
          <div className="SideBar" style={{ "paddingTop": "9vh" }}>
            <hr style={{ "backgroundColor": "#1f262d" }} />
            <div className="SBItem" id={AOo} ref="TabChange" onClick={() => this.setState({ Tab: 1 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-clipboard-list"></i>
              &nbsp;&nbsp;&nbsp;
              Outlet Overview
            </div>
            <hr style={{ "backgroundColor": "#1f262d" }} style={{ "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={ASd} ref="TabChange" onClick={() => this.setState({ Tab: 2 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-truck-moving"></i>
              &nbsp;&nbsp;&nbsp;
              Schedule Delivery
            </div>
            <hr style={{ "backgroundColor": "#1f262d" }} style={{ "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={ARs} ref="TabChange" onClick={() => this.setState({ Tab: 3 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-money-check-alt"></i>
              &nbsp;&nbsp;&nbsp;
              Revenue Statistics
            </div>
            <hr style={{ "backgroundColor": "#1f262d" }} style={{ "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={AUo} ref="TabChange" onClick={() => this.setState({ Tab: 4 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-map-marked-alt"></i>
              &nbsp;&nbsp;&nbsp;
              Update Outlet List
            </div>
            <hr style={{ "backgroundColor": "#1f262d" }} style={{ "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={ACf} ref="TabChange" onClick={() => this.setState({ Tab: 5 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-comments"></i>
              &nbsp;&nbsp;&nbsp;
              Customer Feedback
            </div>
          </div>
          <br /><br /><br /><br /><br />
          <div className="MainContent" style={{ "marginLeft": "19vw" }}>
            {this.state.Tab == 1 ? <OutletOverview /> : null}
            {this.state.Tab == 2 ? <ScheduleDelivery /> : null}
            {this.state.Tab == 3 ? <RevenueStatistics /> : null}
            {this.state.Tab == 4 ? <UpdateOutletList /> : null}
            {this.state.Tab == 5 ? <CustomerFeedback /> : null}
          </div>
        </div>

      </div>
    )
  }
}

class OutletOverview extends Component {
  render() {
    return (
      <div>
        oo
      </div>
    )
  }
}
class ScheduleDelivery extends Component {
  render() {
    return (
      <div>
        oo
      </div>
    )
  }


}
class RevenueStatistics extends Component {
  render() {
    return (
      <div>
        oo
      </div>
    )
  }


}
class UpdateOutletList extends Component {
  render() {
    return (
      <div>
        oo
      </div>
    )
  }

}
class CustomerFeedback extends Component {
  render() {
    return (
      <div>
        oo
      </div>
    )
  }

}