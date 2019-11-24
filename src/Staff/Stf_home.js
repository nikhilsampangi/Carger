import React, { Component, Fragment } from 'react';
import { ReactComponent as Logo } from "../assets/logo_v1.svg";
import { Link } from "react-router-dom";
import "./Stf_home.css"
import { ReactComponent as FuelPump } from '../assets/Pump.svg';
import { ReactComponent as FuelPumpoff } from '../assets/Pump_off.svg';
import Progress from 'react-circle-progress-bar';
import Rating from '@prontopro/react-rating';

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
    this.state = { Tab: 4 }
  }

  // componentDidMount() {
  //   this.refs.myComponentDiv.addEventListener('click', this.clickHandler);
  // }

  // clickHandler() {

  // }

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
            <h5 style={{ "color": "white", "marginRight": "1.7vw" }}><i className="fas fa-sign-out-alt"></i>&nbsp;Log out</h5>
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
              <i class="fas fa-money-check-alt"></i>&nbsp;&nbsp;&nbsp;Revenue Statistics
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={Ps} ref="TabChange" onClick={() => this.setState({ Tab: 3 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i class="fas fa-gas-pump"></i>&nbsp;&nbsp;&nbsp;Pump Statistics
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={Cf} ref="TabChange" onClick={() => this.setState({ Tab: 4 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i class="fas fa-comment-dots"></i>&nbsp;&nbsp;&nbsp;Customer Feedback
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

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <StationFuelStatistics fueltype={0} />
        <br />
        <StationFuelStatistics fueltype={1} />
        <br />
        <StationFuelStatistics fueltype={2} />
      </div>
    )
  }

}
class RevenueStatistics extends Component {
  render() {
    return (
      <div>
        Revenue Statistics
      </div>
    )
  }


}
class PumpStatistics extends Component {
  render() {
    var pumps = [[], [], []]
    // backend index of pumps
    var count = 0
    for (var i = 0; i < this.props.pumpcount[0]; i++) {
      // Backend : Pass parameters unique for each pump ( fuel quantity) and fuel type 0here
      pumps[0].push(<Pump index={count} fueltype={0} />);
      count = count + 1;
    }
    for (var j = 0; j < this.props.pumpcount[1]; j++) {
      // Backend : Pass parameters unique for each pump ( fuel quantity) and fuel type 0here
      pumps[1].push(<Pump index={count} fueltype={1} />);
      count = count + 1;
    }
    for (var k = 0; k < this.props.pumpcount[2]; k++) {
      // Backend : Pass parameters unique for each pump ( fuel quantity) and fuel type 0here
      pumps[2].push(<Pump index={count} fueltype={3} />);
      count = count + 1;
    }
    return (
      <div className="container-fluid" style={{ "marginLeft": "3%" }}>
        <StationFuelStatistics fueltype={0} />
        <br />
        <StationFuelStatistics fueltype={1} />
        <br />
        <StationFuelStatistics fueltype={2} />
        <div className="row">
          {pumps[0]}
          {pumps[1]}
          {pumps[2]}
        </div>
      </div>
    )
  }
}

class StationFuelStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = { updvolswitch: 0 }
  }
  render() {
    let fname = this.props.fueltype === 0 ? "Diesel" : (this.props.fueltype === 1 ? "Petrol" : "Cng")
    return (
      <div className="row">
        <div className="col-1" />
        <div className="col-9" style={{ "height": "45vh", "borderRadius": "20px", "backgroundColor": "white" }}>
          <div className="row">
            <div className="col-1" />
            <div className="col-5">
              {/* Backend : send progress percentage of pump in place of 75 here */}
              {this.props.fueltype === 0
                ? <Progress progress={75} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} />
                : (
                  this.props.fueltype === 1
                    ? <Progress progress={75} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} gradient={[{ stop: 0.0, color: '#f7b733' }, { stop: 1, color: '#fc4a1a' }]} />
                    : <Progress progress={75} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} gradient={[{ stop: 0.0, color: '#38ef7d' }, { stop: 1, color: '#11998e' }]} />
                )
              }

            </div>
            <div className="col-6">
              <ul className="list-group list-group-flush ststats">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Current Quantity
                <span className="flex-row-reverse">
                    {/* backend */}
                    Y litres
                </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Capacity
                <span className="flex-row-reverse">
                    {/* backend */}
                    X litres
                </span>
                </li>
                {/* <li className="list-group-item">Update Quantity</li> */}

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Operational Pumps
                <span className="flex-row-reverse">
                    {/* backend */}
                    #working / #total
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {this.state.updvolswitch ?
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">No of Litres</span>
                      </div>
                      <input type="text" className="form-control" placeholder="current quantity" />
                      <div className="input-group-append">
                        {/* backend */}
                        <button className="btn btn-outline-dark" onClick={() => this.setState({ updvolswitch: 0 })}>
                          <i className="fa fa-save" />&nbsp;&nbsp;Save
                        </button>
                      </div>
                    </div>
                    :
                    // backend
                    <button className="btn btn-outline-dark btn-block" onClick={() => this.setState({ updvolswitch: 1 })}>Update Volume</button>}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-2" />
      </div>

    )
  }
}

class Pump extends Component {
  constructor(props) {
    super(props);
    this.state = { pumpstate: 1 }
  }

  render() {
    return (
      <div className="col-5" style={{ "height": "35vh", "borderRadius": "20px", "backgroundColor": "white", "margin": "2%" }}>
        <div className="row">
          <div className="col-5">
            {/* <Progress progress={75} subtitle="Fuel" style={{ "width": "11vw" }} /> */}
            {this.state.pumpstate ? <FuelPump style={{ "width": "10vw", "marginLeft": "1%", "marginTop": "25%" }} />
              : <FuelPumpoff style={{ "width": "10vw", "marginLeft": "1%", "marginTop": "25%" }} />
            }
          </div>
          <div className="col-7">
            <br />
            <br />
            <center className="pumptitle">
              Pump {this.props.index + 1}
            </center>
            <br />
            <center className="pumpstats">
              Fuel Type : {this.props.fueltype === 0 ? <span>diesel</span> : (this.props.fueltype === 1 ? <span>petrol</span> : <span>cng</span>)}
            </center>
            <br />
            <center className="pumpstats">
              <span>Status</span>
              &nbsp;&nbsp;:&nbsp;&nbsp;
              {this.state.pumpstate ?
                <button className="btn btn-outline-success" onClick={() => this.setState({ pumpstate: 0 })}>
                  Working&nbsp;<i className="fas fa-check-circle"></i>
                </button>
                :
                <button className="btn btn-outline-danger" onClick={() => this.setState({ pumpstate: 1 })}>
                  Out of Order&nbsp;<i className="fas fa-exclamation-triangle"></i>
                </button>

              }
            </center>
          </div>
        </div>
      </div>
    )
  }
}

class CustomerFeedback extends Component {
  render() {
    return (
      <div className="row">
        <div className="col" />
        <div className="col-10" style={{ "height": "45vh", "borderRadius": "20px", "backgroundColor": "white" }}>
          <div className="container" style={{ "padding": "3%" }}>
            <div className="row" style={{ "textAlign": "center", "fontFamily": "josefin sans", "fontSize": "1.4em" }}>
              <div className="col">
                <i className="fa fa-user" />&nbsp;&nbsp;Customer Name
              </div>
              <div className="col">
                <i className="fa fa-clipboard-list" />&nbsp;&nbsp;Transaction Details
              </div>
              <div className="col">
                <i className="fa fa-clock" />&nbsp;&nbsp;Transaction Time
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col"></div>
              <div className="col-10">
                <div className="card">
                  <div className="card-header">
                    Rating : 4/5 <Rating animateOnHover={true} initialRate={4} readonly={true} />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">Feedback:</h2>
                    <p className="card-text">
                      " backend:send feedback (if exsists) here "
                    </p>
                  </div>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
        <div className="col" />
      </div>
    )
  }
}