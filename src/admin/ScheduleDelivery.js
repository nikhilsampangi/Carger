import React, { Component } from 'react';

export default class ScheduleDelivery extends Component {
  render() {
    return (
      <div className="row">
        <div className="col" />
        <div className="col-9" style={{ "height": "45vh", "borderRadius": "20px", "backgroundColor": "white" }}>
          <div className="container" style={{ "padding": "2%" }}>
            <h2 style={{ "fontFamily": "josefin sans" }}><i className="fa fa-truck-moving" />&nbsp;&nbsp;Schedule Delivery</h2>
            <br />
            <form>
              <div className="form-group row">
                <label className="col-3">Select Outlet</label>
                <select className="form-control custom-select col-7">
                  {/* Backend */}
                  <option value="0">Select outlet</option>
                  <option value="1">Outlet A</option>
                  <option value="2">Outlet B</option>
                  <option value="3">Outlet C</option>
                </select>
                <div className="col" />
              </div>
              <div className="form-group row">
                <label className="col-3">Choose Fuel Type</label>
                <select className="form-control custom-select col-7">
                  <option value="1">Diesel</option>
                  <option value="2">Petrol</option>
                  <option value="3">CNG</option>
                </select>
                <div className="col" />
              </div>
              <div className="form-group row">
                <label className="col-3">Enter Quantity</label>
                <input className="form-control col-7" type="text" placeholder="amount in litres" />
              </div>
              <div className="form-group row">
                <div className="col-3" />
                <div className="col-7">
                  <button className="btn btn-outline-primary btn-block" type="submit">
                    Deliver
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col" />
      </div>
    )
  }
}
