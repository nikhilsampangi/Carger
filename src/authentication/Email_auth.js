import React, { Component } from 'react'

export default class Email_verf extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props.match.params
    return (
      <div>
        {{ id } === 1 ?
          <p>Email verification successful</p>
          :
          <p>Email verification failed</p>
        }
      </div>
    )
  }
}
