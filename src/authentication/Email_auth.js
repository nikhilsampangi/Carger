import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Email_verf extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props.match.params
    return (
      <div className="container">
        <br /><br /><br />
        {id === '1' ?
          <p>Email verification successful.<Link to="/Customer">Click here</Link> to Login </p>
          :
          <p>Email verification failed. <Link to="/">Click here</Link> to try again </p>
        }
      </div>
    )
  }
}
