import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import { ReactComponent as OutletImage } from "../assets/outlet.svg";
import { addpetrolstation, getpetrolstations } from '../authentication/adminFunctions';

export default class UpdateOutletList extends Component {
  constructor(props) {
    super(props);
    this.state = { addOutletSwitch: 0 }
  }

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
  constructor(props) {
    super(props);
    this.state = {petrolPumps: null, valid: false}
  }

  handlegetpetrolstations(event) {
    const details = {
      token: Cookies.get('usertoken')
    };
    
    getpetrolstations(details)
    .then(res => {
      console.log(res)
      this.setState({petrolPumps:res.data, valid: true}, () => {
        console.log('state', this.state)
      })
    })
    .catch(err => {
      console.log("outlet list error", err)
    })
  }

  componentDidMount() {
    console.log('in component did mount state', this.state)
    this.handlegetpetrolstations()
  }

  render() {
    var Outlets = []
    console.log(this.state.valid)
    if(this.state.valid) {
      console.log(this.state.valid, this.state.petrolPumps)
      for (var i = 0; i < this.state.petrolPumps.length; i++) {
        Outlets.push(<Outlet id={i} state={this.state.petrolPumps[i]} />)
      }
      return (
        <div className="list-group list-group-flush">
          {Outlets}
        </div>
      )
    }
    else {
      return (
        <div>Waiting for server</div>
      )
    }
  }
}

class Outlet extends Component {
  render() {
    const fueltypes = []
    for(let i=0; i<this.props.state.fuelDetails.length; i++) {
      if(fueltypes.indexOf(this.props.state.fuelDetails[i].fuel)==-1) {
        fueltypes.push(this.props.state.fuelDetails[i].fuel)
        fueltypes.push(" ")
      }
    }
    // Backend : Get Outlet Details using id
    return (
      <Fragment>
        <li className="list-group-item list-group-item-action" style={{ "borderRadius": "15px" }}>
          <div className="row" style={{ "paddingTop": "3%", "paddingBottom": "3%" }}>
            <div className="col-6" style={{ "borderRight": "3px solid #fc6037" }}>
              
              <center><h1 className="OutletName">{this.props.state.name}</h1></center>
              <OutletImage />
            </div>
            <div className="col-5">
              <div className="container">
                <div className="row  d-flex justify-content-between align-items-center">
                  Address :
                  <span className="flex-row-reverse">
                    <i className="fas fa-map-marked-alt"></i>&nbsp;&nbsp;
                    {this.props.state.address}
                    abcd
                  </span>
                </div>
                <hr />
                <div className="row  d-flex justify-content-between align-items-center">
                  Fuel Types Offered :
                  <span className="flex-row-reverse">
                    <i className="fas fa-tint"></i>&nbsp;&nbsp;
                    {fueltypes}
                    
                  </span>
                </div>
                <hr />
                <div className="row  d-flex justify-content-between align-items-center">
                  Capacity :
                  <span className="flex-row-reverse">
                    <i className="fas fa-tachometer-alt"></i>&nbsp;&nbsp;
                    {/* Backend*/}
                    1000
                  </span>
                </div>
                <hr />
                <div className="row  d-flex justify-content-between align-items-center">
                  No. of Pumps :
                  <span className="flex-row-reverse">
                    
                    {this.props.state.pumps.length}
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
    this.state = { showd: 0, showp: 0, showc: 0, outletName: '', outletAddress: '', dieselCapacity: '', petrolCapacity: '', cngCapacity: '', petrolPumps: '', dieselPumps: '', cngPumps: '', petrolCost: null, dieselCost: null, cngCost: null };
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
      // const fuelDetails = {dieselCapacity: this.state.dieselCapacity,
      //   petrolCapacity: this.state.petrolCapacity,
      //   cngCapacity: this.state.cngCapacity,}
      const fuelDetails = [{
        fuel: 'Petrol',
        quantity: this.state.petrolCapacity,
        price: this.state.petrolCost
      }, {
        fuel: 'Diesel',
        quantity: this.state.dieselCapacity,
        price: this.state.dieselCost
      }, {
        fuel: 'CNG',
        quantity: this.state.cngCapacity,
        price: this.state.cngCost
      }]

      const outlet = {
        outletName: this.state.outletName,
        outletAddress: this.state.outletAddress,
        fuelDetails: fuelDetails,
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
            <div className="col">Cost</div>
            <div className="col"><input type="text" className="form-control" placeholder="Diesel" value={this.state.dieselCost} name='dieselCost' onChange={this.handleChange} /></div>
            <div className="col"><input type="text" className="form-control" placeholder="Petrol" value={this.state.petrolCost} name='petrolCost' onChange={this.handleChange} /></div>
            <div className="col"><input type="text" className="form-control" placeholder="CNG" value={this.state.cngCost} name='cngCost' onChange={this.handleChange} /></div>
          </div>
          <br/>
          {/* <div className="form-row">
            <div className="col">
              <label>Manager's Username</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <label>Manager's Password</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <br /> */}
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

