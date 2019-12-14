import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import { ReactComponent as OutletImage } from "../assets/outlet.svg";
import { addpetrolstation } from '../authentication/adminFunctions';

export default class UpdateOutletList extends Component {
  constructor(props) {
    super(props);
    this.state = { addOutletSwitch: 0 }
  }

  // handleSubmit(event) {
  //   if(Cookies.get('usertoken')){
  //     const state = this.props.state;
  //     console.log(state)
  //     const outlet= {
  //         outletName: state.outletName,
  //         outletAddress: state.outletAddress,
  //         dieselCapacity: state.dieselCapacity,
  //         petrolCapacity: state.petrolCapacity,
  //         cngCapacity: state.cngCapacity,
  //         petrolPumps: state.petrolPumps,
  //         dieselPumps: state.dieselPumps,
  //         cngPumps: state.cngPumps,
  //         token: Cookies.get('usertoken')
  //     }
  //     console.log(outlet);
  //   } 
  //   else{
  //     console.log('please login');
  //   }
  // }

  render() {
    return (
      <div className="container-fluid">
        {this.state.addOutletSwitch === 0 ?
          <button className="btn btn-outline-dark btn-block btn-lg" onClick={() => this.setState({ addOutletSwitch: 1 })}>
            <i className="fas fa-gas-pump"></i>&nbsp;&nbsp;Add New Outlet&nbsp;&nbsp;<i className="fas fa-gas-pump"></i>
          </button>
          :
          // Backend
          <button className="btn btn-outline-dark btn-block btn-lg" onClick={() => this.setState({ addOutletSwitch: 0 })}>
            <i className="fas fa-save"></i>&nbsp;&nbsp;Save Changes
          </button>
        }
        <br />
        <br />
        {/* Backend : Send no of outlets here */}
        {this.state.addOutletSwitch === 0 ?
          <OutletsList outletcount={7} />
          :
          <AddOutletForm />
        }
        <br />
        <br />
        <br />
      </div>
    )
  }
}

class OutletsList extends Component {
  render() {
    var Outlets = []
    for (var i = 0; i < this.props.outletcount; i++) {
      Outlets.push(<Outlet id={i} />)
    }
    return (
      <div className="list-group list-group-flush">
        {Outlets}
      </div>
    )
  }
}

class Outlet extends Component {
  render() {
    // Backend : Get Outlet Details using id
    return (
      <Fragment>
        <li className="list-group-item list-group-item-action" style={{ "borderRadius": "15px" }}>
          <div className="row" style={{ "paddingTop": "3%", "paddingBottom": "3%" }}>
            <div className="col-6" style={{ "borderRight": "3px solid #fc6037" }}>
              {/* Backend : Outlet Name */}
              <center><h1 className="OutletName">Outlet Name</h1></center>
              <OutletImage />
            </div>
            <div className="col-5">
              <div className="container">
                <div className="row  d-flex justify-content-between align-items-center">
                  Address :
                  <span className="flex-row-reverse">
                    <i className="fas fa-map-marked-alt"></i>&nbsp;&nbsp;
                    {/* Backend*/}
                    abcd
                  </span>
                </div>
                <hr />
                <div className="row  d-flex justify-content-between align-items-center">
                  Fuel Types Offered :
                  <span className="flex-row-reverse">
                    <i className="fas fa-tint"></i>&nbsp;&nbsp;
                    {/* Backend*/}
                    abcd
                  </span>
                </div>
                <hr />
                <div className="row  d-flex justify-content-between align-items-center">
                  Capacity :
                  <span className="flex-row-reverse">
                    <i className="fas fa-tachometer-alt"></i>&nbsp;&nbsp;
                    {/* Backend*/}
                    abcd
                  </span>
                </div>
                <hr />
                <div className="row  d-flex justify-content-between align-items-center">
                  Monthly Income :
                  <span className="flex-row-reverse">
                    <i className="fas fa-rupee-sign"></i>&nbsp;&nbsp;
                    {/* Backend*/}
                    abcd
                    /-
                  </span>
                </div>
                <hr />
                <div className="row">
                  <button className="col-5 btn btn-outline-dark" style={{ "marginRight": "2%" }}>Schedule a Delivery</button>
                  <button className="col-6 btn btn-outline-dark">View Revenue Statistics</button>
                </div>
              </div>
            </div>

          </div>
        </li>
        <hr />
      </Fragment>
    )
  }
}

class AddOutletForm extends Component {
  constructor(props) {
    super(props);
    this.state = { showd: 0, showp: 0, showc: 0, outletName: '', outletAddress: '', dieselCapacity: '', petrolCapacity: '', cngCapacity: '', petrolPumps: '', dieselPumps: '', cngPumps: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSubmit(event) {
    if (Cookies.get('usertoken')) {
      const outlet = {
        outletName: this.state.outletName,
        outletAddress: this.state.outletAddress,
        dieselCapacity: this.state.dieselCapacity,
        petrolCapacity: this.state.petrolCapacity,
        cngCapacity: this.state.cngCapacity,
        petrolPumps: this.state.petrolPumps,
        dieselPumps: this.state.dieselPumps,
        cngPumps: this.state.cngPumps,
        token: Cookies.get('usertoken')
      }
      console.log(outlet.token)
      addpetrolstation(outlet)
        .then(res => {
          if (res.status) {
            // this.props.history.push('/')
            console.log(res.data)
            // this.setState({authenticated:true})
          }
          else {
            console.log(res.error)
          }
        })
        .catch(err => {
          console.log('error:-' + err)
        })

    }
    else {
      console.log('please login')
    }


    // login(user)
    //   .then(res => {
    //     if (res.status) {
    //       // this.props.history.push('/')
    //       this.setState({ authenticated: 1 })
    //       // console.log(res.data)
    //     }
    //     else {
    //       this.setState({ errorFlag: true, errMsg: String(res.error) })
    //       // console.log(res.error)

    //     }
    //   })
    //   .catch(err => {
    //     console.log('error:-' + err)
    //   })

    event.preventDefault();
  }

  render() {
    return (
      <div className="card container" style={{ "padding": "3%" }}>
        <h3 className="card-title addoutletformtitle">
          New Outlet Enrollment
        </h3>
        <div className="card-body">

          <div className="form-group">
            <label for="formoutletname">Outlet Name</label>
            <input type="text" id="formoutletname" class="form-control" value={this.state.outletName} name='outletName' onChange={this.handleChange} />
          </div>
          <br />
          <div className="form-group">
            <label for="formaddress">Address</label>
            <input type="text" id="formaddress" class="form-control" value={this.state.outletAddress} name='outletAddress' onChange={this.handleChange} />
          </div>
          <br />
          {/* <div className="form-group row" >
              <div className="col-2">Fuel Types </div>
              <div className="col-2">
                {this.state.showd === 0 ?
                  <button className="btn btn-outline-success btn-sm" onClick={() => this.setState({ showd: 1 })}>
                    <i className="fa fa-check" />
                    &nbsp;&nbsp;
                    Diesel
                </button>
                  :
                  <button className="btn btn-outline-danger btn-sm" onClick={() => this.setState({ showd: 0 })}>
                    <i className="fa fa-times" />
                    &nbsp;&nbsp;
                    Diesel
                </button>
                }
              </div>
              <div className="col-2">
                {this.state.showp === 0 ?
                  <button className="btn btn-outline-success btn-sm" onClick={() => this.setState({ showp: 1 })}>
                    <i className="fa fa-check" />
                    &nbsp;&nbsp;
                    Petrol
                </button>
                  :
                  <button className="btn btn-outline-danger btn-sm" onClick={() => this.setState({ showp: 0 })}>
                    <i className="fa fa-times" />
                    &nbsp;&nbsp;
                    Petrol
                </button>
                }
              </div>
              <div className="col-2">
                {this.state.showc === 0 ?
                  <button className="btn btn-outline-success btn-sm" onClick={() => this.setState({ showc: 1 })}>
                    <i className="fa fa-check" />
                    &nbsp;&nbsp;
                    CNG
                </button>
                  :
                  <button className="btn btn-outline-danger btn-sm" onClick={() => this.setState({ showc: 0 })}>
                    <i className="fa fa-times" />
                    &nbsp;&nbsp;
                    CNG
                </button>
                }
              </div>
            </div> */}
          <br />
          <div className="form-row">
            <div className="col">Capacities</div>
            <div className="col"><input type="text" className="form-control" placeholder="Diesel Tank Capacity" value={this.state.dieselCapacity} name='dieselCapacity' onChange={this.handleChange} /></div>
            <div className="col"><input type="text" className="form-control" placeholder="Petrol Tank Capacity" value={this.state.petrolCapacity} name='petrolCapacity' onChange={this.handleChange} /></div>
            <div className="col"><input type="text" className="form-control" placeholder="CNG Tank Capacity" value={this.state.cngCapacity} name='cngCapacity' onChange={this.handleChange} /></div>
          </div>
          <br />
          <div className="form-row">
            <div className="col">No of Pumps</div>
            <div className="col"><input type="text" className="form-control" placeholder="Diesel Pumps" value={this.state.dieselPumps} name='dieselPumps' onChange={this.handleChange} /></div>
            <div className="col"><input type="text" className="form-control" placeholder="Petrol Pumps" value={this.state.petrolPumps} name='petrolPumps' onChange={this.handleChange} /></div>
            <div className="col"><input type="text" className="form-control" placeholder="CNG Pumps" value={this.state.cngPumps} name='cngPumps' onChange={this.handleChange} /></div>
          </div>
          <br />
          <div className="form-row">
            <div className="col">
              <label>Manager's Username</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <label>Manager's Password</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <br />
          <div className="form-row">
            <div className="col"></div>
            <button className="btn btn-outline-dark btn-block col-10" onClick={this.handleSubmit}>
              Submit
              </button>
            <div className="col"></div>
          </div>
        </div>
      </div>
    )
  }
}

