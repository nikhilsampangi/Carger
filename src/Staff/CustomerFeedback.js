import React, { Component, Fragment } from 'react';
// import Rating from '@prontopro/react-rating';

export default class CustomerFeedback extends Component {
  render() {
    // backend: send array of feebacks
    var feedB = []
    // var len = feedB.length; // backend needed
    var len = 16 // hardcoded
    var render_feedB = []
    for (var i = 0; i < len; i++) {
      render_feedB.push(<Feedback />)// send props here
      render_feedB.push(<br />)
      render_feedB.push(<br />)
    }
    return (
      <Fragment>
        {render_feedB}
      </Fragment>
    )
  }
}

class Feedback extends Component {
  render() {
    return (
      <div className="row">
        <div className="col" />
        <div className="col-10" style={{ "height": "45vh", "borderRadius": "20px", "backgroundColor": "white" }}>
          <div className="container" style={{ "padding": "3%" }}>
            <div className="row" style={{ "fontFamily": "josefin sans", "fontSize": "1.4em" }}>
              <div className="col" style={{ "textAlign": "left" }}>
                <i className="fa fa-user" />&nbsp;&nbsp;Customer.Name {/*backend: get from props*/}
              </div>
              <div className="col" style={{ "textAlign": "right" }}>
                <i className="fa fa-clock" />&nbsp;&nbsp;Transaction.DateAndTime {/*backend: get from props*/}
              </div>
            </div>
            <br />
            <div className="row" style={{ "fontFamily": "josefin sans", "fontSize": "1.4em" }}>
              <div className="col" style={{ "textAlign": "left" }}>
                <i className="fa fa-clipboard-list" />&nbsp;&nbsp;Transaction Details
              </div>
              <div className="col" style={{ "textAlign": "right" }}>
                Rating : <Rating value={2} /> {/*backend: get from props and pass into this prop*/}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col"></div>
              <div className="col-10" style={{ "fontFamily": "josefin sans" }}>
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Feedback:</h2>
                    <p className="card-text">
                      No Feedback Given
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

class Rating extends Component {
  render() {
    return (
      <Fragment>
        {
          this.props.value === 5 ?
            <span>
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </span>
            : (
              this.props.value === 4 ?
                <span>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="far fa-star" />
                </span>
                : (
                  this.props.value === 3 ?
                    <span>
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="far fa-star" />
                      <i className="far fa-star" />
                    </span>
                    :
                    (
                      this.props.value === 2 ?
                        <span>
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                        </span>
                        :
                        <span>
                          <i className="fas fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                        </span>
                    )
                )

            )

        }
      </Fragment>
    )
  }
}