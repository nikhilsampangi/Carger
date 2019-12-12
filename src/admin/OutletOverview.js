import React, { Component, Fragment } from 'react';
// import Dashboard from "../Staff/Dashboard";
import PumpStatistics from "../Staff/PumpStatistics";

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
        <br /><br /><br />
        <PumpStatistics pumpcount={[3, 4, 3]} />
      </Fragment>
    )
  }
}


