
import React, { Component } from 'react';
import { ReactComponent as FuelPump } from '../assets/Pump.svg';
import { ReactComponent as FuelPumpoff } from '../assets/Pump_off.svg';


export default class PumpStatistics extends Component {
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
