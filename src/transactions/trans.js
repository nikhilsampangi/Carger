import React, { Component } from 'react';
import { transac } from './transFunctions'



export default class Trans extends Component {
    constructor() {
      super();
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    handleSubmit(event) {
  
      const user = {
        email: this.state.email,
        hashedPassword: this.state.hashedPassword
      }
  
      transac(user)
        .then(res => {
          if (res.status) {
            // this.props.history.push('/')
            console.log(res.status)
          }
          else {
            console.log(res.error)
          }
        })
        .catch(err => {
          console.log('error:-' + err)
        })
  
      event.preventDefault();
    }
  
    render() {
      return (
          <button type="submit" className="btn btn-outline-success btn-login" onClick={this.handleSubmit}>Buy</button>
      )
    }
  }