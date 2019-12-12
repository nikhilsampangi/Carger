import React, { Component, Fragment } from 'react';
// import Dashboard from "../Staff/Dashboard";
// import PumpStatistics from "../Staff/PumpStatistics";
import Progress from 'react-circle-progress-bar';
import { ReactComponent as FuelPump } from '../assets/Pump.svg';
import { ReactComponent as FuelPumpoff } from '../assets/Pump_off.svg';
import { fuelDetails } from '../authentication/staffFunctions'
import Cookies from 'js-cookie';
import { updateFuel } from '../authentication/staffFunctions'

export default class OutletOverview extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(event) {

  }
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-1" />
          <div className="col-9" style={{ "height": "30vh", "borderRadius": "20px", "backgroundColor": "white" }}>
            <div className="container" style={{ "padding": "2%" }}>
              <br />
              <h3 style={{ "fontFamily": "josefin sans" }}><i className="fa fa-clipboard-list" />&nbsp;&nbsp;Outlet Statistics</h3>
              <br />
              <div className="form-group row">
                <select className="form-control custom-select col-12" name="OutletName" onChange={this.handleSelect}>
                  {/* Backend */}
                  <option value="1">Outlet A</option>
                  <option value="2">Outlet B</option>
                  <option value="3">Outlet C</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col" />
        </div>
        <br />
        <Dashboard />
        <br /><br /><br />
        <PumpStatistics pumpcount={[3, 4, 3]} />
      </Fragment>
    )
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, fuelDetails: null, pumps: null }
  }

  handleFuelDetails(event) {
    const user = {
      token: Cookies.get('usertoken')
    }
    console.log(user.token)
    fuelDetails(user)
      .then(res => {
        console.log(res)
        this.setState({
          loaded: true,
          fuelDetails: res.data.fuelDetails,
          pumps: res.data.pumps
        }, () => {
          console.log(this.state.fuelDetails)
        })
      })
  }

  componentDidMount() {
    this.handleFuelDetails()
  }

  loopedval() {
    let res = []
    return res
  }

  render() {
    if (this.state.loaded) {
      const res = []
      // Error Here
      // for (let i = 0; i < this.state.fuelDetails.length; i++) {
      //   console.log(i)
      //   res.push(
      //     <StationFuelStatistics fueltype={i} tempstate={this.state} />)
      //   res.push(<br />)
      // }
      return (
        <div className="container-fluid">
          {res}
          <br /><br /><br />
        </div>
      )
    }
    else {
      return (<div>Waiting to load</div>)
    }
  }
}

class StationFuelStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = { updvolswitch: 0, quantity: this.props.tempstate.fuelDetails[this.props.fueltype].quantity }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ updvolswitch: 0 })
    const fuel = ['Petrol', 'Diesel', 'CNG']
    const fuelDetails = {
      token: Cookies.get('usertoken'),
      fuel: fuel[this.props.fueltype],
      quantity: this.state.quantity
    }

    updateFuel(fuelDetails)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log('error:-' + err)
      })
    event.preventDefault();

    // if (this.state.hashedPassword !== this.state.confirmPassword) {
    //   this.setState({ errorFlag: true, errMsg: "Password and Confirm Password Fields do not match" })
    // }
    // else {
    //   register(newUser)
    //     .then(res => {
    //       console.log(res.status)
    //       if (res.status) {
    //         // this.props.history.push('/login')
    //         this.setState({ authenticated: 1 })
    //         // console.log(res.data)
    //       }
    //       else {
    //         this.setState({ errorFlag: true, errMsg: res.error })
    //         // console.log(res.error)
    //       }
    //     })
    //     .catch(err => {
    //       console.log('error:-' + err)
    //     })
    // }


  }

  render() {
    let x = this.props.tempstate
    // x = x.fuelDetails[y].fuel
    let y = this.props.fueltype
    // console.log("x", x.fuelDetails[y].fuel)
    console.log('y', y)
    let fname = this.props.fueltype === 0 ? "Diesel" : (this.props.fueltype === 1 ? "Petrol" : "Cng")
    // let quantity = this.props.tempstate.fuelDetails[this.props.fueltype].quantity
    return (
      <div className="row">
        <div className="col-1" />
        <div className="col-9" style={{ "height": "45vh", "borderRadius": "20px", "backgroundColor": "white" }}>
          <div className="row">
            <div className="col-1" />
            <div className="col-5">
              {/* Backend : send progress percentage of pump in place of 75 here */}
              {this.props.fueltype === 0
                ? <Progress progress={this.state.quantity / 10} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} />
                : (
                  this.props.fueltype === 1
                    ? <Progress progress={this.state.quantity / 10} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} gradient={[{ stop: 0.0, color: '#f7b733' }, { stop: 1, color: '#fc4a1a' }]} />
                    : <Progress progress={this.state.quantity / 10} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} gradient={[{ stop: 0.0, color: '#38ef7d' }, { stop: 1, color: '#11998e' }]} />
                )
              }

            </div>
            <div className="col-6">
              <ul className="list-group list-group-flush ststats">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Current Quantity
                <span className="flex-row-reverse">                {this.state.quantity}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Capacity
                <span className="flex-row-reverse">
                    {/* backend */}
                    1000 litres
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
                      <input type="text" className="form-control" placeholder="current quantity" value={this.state.quantity} name='quantity' onChange={this.handleChange} />
                      <div className="input-group-append">
                        {/* backend */}
                        <button className="btn btn-outline-dark" onClick={this.handleSubmit}>
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
        {/* <StationFuelStatistics fueltype={0} />
        <br />
        <StationFuelStatistics fueltype={1} />
        <br />
        <StationFuelStatistics fueltype={2} /> */}
        <div className="row">
          {pumps[0]}
          {pumps[1]}
          {pumps[2]}
        </div>
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