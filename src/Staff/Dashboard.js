import React, { Component, Fragment } from 'react';
import Progress from 'react-circle-progress-bar';
import {fuelDetails} from '../authentication/staffFunctions'
import Cookies from 'js-cookie';
import { updateFuel } from '../authentication/staffFunctions'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded:false, fuelDetails: null,pumps: null}
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
      for(let i=0; i<this.state.fuelDetails.length; i++) {
        console.log(i)
        res.push(
          <StationFuelStatistics fueltype={i} tempstate={this.state}/>)
        res.push(<br />)
      }
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
    this.state = { updvolswitch: 0 , quantity:this.props.tempstate.fuelDetails[this.props.fueltype].quantity}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ updvolswitch: 0 })
    const fuel=['Petrol', 'Diesel', 'CNG']
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
    const arr = ['Diesel', 'Petrol', 'CNG']
    let workingcount = 0;
    let totalcount = 0;
    for(let i=0; i<this.props.tempstate.pumps.length; i++) {
      console.log(this.props.tempstate.pumps[i].pumptype, arr[this.props.fueltype])
      if(this.props.tempstate.pumps[i].pumptype==arr[this.props.fueltype]) {
        if(!this.props.tempstate.pumps[i].shutdown) {
          workingcount++;
        }
        totalcount++;
      }
    }

    console.log('pops', this.props)
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
                ? <Progress progress={this.state.quantity/10} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} />
                : (
                  this.props.fueltype === 1
                    ? <Progress progress={this.state.quantity/10} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} gradient={[{ stop: 0.0, color: '#f7b733' }, { stop: 1, color: '#fc4a1a' }]} />
                    : <Progress progress={this.state.quantity/10} subtitle={fname} style={{ "width": "20vw", "paddingTop": "9%" }} gradient={[{ stop: 0.0, color: '#38ef7d' }, { stop: 1, color: '#11998e' }]} />
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
                    {workingcount}/{totalcount}
                    {/* #working / #total */}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {this.state.updvolswitch ?
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">No of Litres</span>
                      </div>
                      <input type="text" className="form-control" placeholder="current quantity" value={this.state.quantity} name='quantity' onChange={this.handleChange}/>
                      <div className="input-group-append">
                        {/* backend */}
                        <button className="btn btn-outline-dark" onClick= {this.handleSubmit}>
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
