import React, { Component, Fragment } from 'react';
import Progress from 'react-circle-progress-bar';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <StationFuelStatistics fueltype={0} />
        <br />
        <StationFuelStatistics fueltype={1} />
        <br />
        <StationFuelStatistics fueltype={2} />
        <br /><br /><br />
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
