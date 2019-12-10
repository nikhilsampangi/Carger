import React, { Component } from 'react';
import Rating from '@prontopro/react-rating';

export default class CustomerFeedback extends Component {
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