import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo_v1.svg";
import { ReactComponent as OutletImage } from "../assets/outlet.svg";
import "./Adm_home.css";
import Cookies from 'js-cookie';
import '../authentication/adminFunctions';
import { addpetrolstation } from '../authentication/adminFunctions';

function change_bg(cls) {
  document
    .getElementById("bd")
    .classList.remove(document.getElementById("bd").classList[0]);
  document.getElementById("bd").classList.add(cls);
}

export default class Adm_home extends Component {
  constructor(props) {
    super(props);
    this.state = { Tab: 1
     }
  }

  render() {
    let AOo = "AOo"
    let ASd = "ASd"
    let ARs = "ARs"
    let AUo = "AUo"
    let ACf = "ACf"
    switch (this.state.Tab) {
      case 1:
        AOo = "AOoActive"
        break;
      case 2:
        ASd = "ASdActive"
        break;
      case 3:
        ARs = "ARsActive"
        break;
      case 4:
        AUo = "AUoActive"
        break;
      case 5:
        ACf = "ACfActive"
        break;
      default:
        break;
    }
    return (
      <div onLoad={change_bg("adminpages")} className="container-fluid">
        <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow" style={{ "backgroundColor": "#1f262d" }}>
          <Link to="/Admin_home">
            <Logo id="stfhmlogo" />
          </Link>
          {/* <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
          {/* <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link">Sign out</a>
            </li>
          </ul> */}
          {/* backend: log out */}
          <Link className="flex-row-reverse" to="/">
            <h5 style={{ "color": "white", "marginRight": "1.7vw" }}><i className="fas fa-sign-out-alt"></i>&nbsp;Log out</h5>
          </Link>
        </nav>
        <div>
          <div className="SideBar" style={{ "paddingTop": "9vh" }}>
            <hr style={{ "backgroundColor": "#1f262d" }} />
            <div className="SBItem" id={AOo} ref="TabChange" onClick={() => this.setState({ Tab: 1 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-clipboard-list"></i>
              &nbsp;&nbsp;&nbsp;
              Outlet Overview
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={ASd} ref="TabChange" onClick={() => this.setState({ Tab: 2 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-truck-moving"></i>
              &nbsp;&nbsp;&nbsp;
              Schedule Delivery
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={ARs} ref="TabChange" onClick={() => this.setState({ Tab: 3 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-money-check-alt"></i>
              &nbsp;&nbsp;&nbsp;
              Revenue Statistics
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={AUo} ref="TabChange" onClick={() => this.setState({ Tab: 4 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-map-marked-alt"></i>
              &nbsp;&nbsp;&nbsp;
              Update Outlet List
            </div>
            <hr style={{ "backgroundColor": "#1f262d", "marginTop": "0", "marginBottom": "0" }} />
            <div className="SBItem" id={ACf} ref="TabChange" onClick={() => this.setState({ Tab: 5 })} style={{ "paddingTop": "1.2rem", "paddingBottom": "1.2rem" }}>
              <i className="fas fa-comments"></i>
              &nbsp;&nbsp;&nbsp;
              Customer Feedback
            </div>
          </div>
          <br /><br /><br /><br /><br />
          <div className="MainContent" style={{ "marginLeft": "19vw" }}>
            {this.state.Tab === 1 ? <OutletOverview /> : null}
            {this.state.Tab === 2 ? <ScheduleDelivery /> : null}
            {this.state.Tab === 3 ? <RevenueStatistics /> : null}
            {this.state.Tab === 4 ? <UpdateOutletList /> : null}
            {this.state.Tab === 5 ? <CustomerFeedback /> : null}
          </div>
        </div>

      </div>
    )
  }
}

class OutletOverview extends Component {
  render() {
    return (
      <div>
        OutletOverview
      </div>
    )
  }
}
class ScheduleDelivery extends Component {
  render() {
    return (
      <div>
        ScheduleDelivery
      </div>
    )
  }


}
class RevenueStatistics extends Component {
  render() {
    return (
      <div>
        RevenueStatistics
      </div>
    )
  }


}
class UpdateOutletList extends Component {
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
          <button className="btn btn-outline-dark btn-block btn-lg" onClick={() => this.setState({ addOutletSwitch: 0 }, ()=> {
            AddOutletForm.prototype.handleSubmit();
          })}>
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
    this.state = { showd: 0, showp: 0, showc: 0, outletName: '', outletAddress: '', dieselCapacity: '', petrolCapacity: '', cngCapacity: '', petrolPumps:'', dieselPumps: '', cngPumps:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, ()=>{
      console.log(this.state);
    });
  }

  handleSubmit(event) {
    if(Cookies.get('usertoken')){
      const outlet= {
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
      console.log(outlet)
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
    else{
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
          <form >
            <div className="form-group">
              <label for="formoutletname">Outlet Name</label>
              <input type="text" id="formoutletname" class="form-control" value={this.state.outletName} name='outletName' onChange={this.handleChange} />
            </div>
            <br />
            <div className="form-group">
              <label for="formaddress">Address</label>
              <input type="text" id="formaddress" class="form-control" value={this.state.outletAddress} name='outletAddress' onChange={this.handleChange}/>
            </div>
            <br />

            <div className="form-group row" >
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
            </div>
            <br />
            <div className="form-row">
              <div className="col"><input type="text" className="form-control" placeholder="Diesel Tank Capacity"  value={this.state.dieselCapacity} name='dieselCapacity' onChange={this.handleChange}/></div>
              <div className="col"><input type="text" className="form-control" placeholder="Petrol Tank Capacity"  value={this.state.petrolCapacity} name='petrolCapacity' onChange={this.handleChange} /></div>
              <div className="col"><input type="text" className="form-control" placeholder="CNG Tank Capacity" value={this.state.cngCapacity} name='cngCapacity' onChange={this.handleChange}/></div>
            </div>
            <br />
            <div className="form-row">
              <div className="col">No of Pumps</div>
              <div className="col"><input type="text" className="form-control" placeholder="Diesel Pumps"  value={this.state.dieselPumps} name='dieselPumps'  onChange={this.handleChange}/></div>
              <div className="col"><input type="text" className="form-control" placeholder="Petrol Pumps"  value={this.state.petrolPumps} name='petrolPumps' onChange={this.handleChange}/></div>
              <div className="col"><input type="text" className="form-control" placeholder="CNG Pumps" value={this.state.cngPumps} name='cngPumps' onChange={this.handleChange}/></div>
              <button className="btn btn-outline-success btn-sm" onClick={() => this.handleSubmit}>
                    Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

class CustomerFeedback extends Component {
  render() {
    return (
      <div>
        CustomerFeedback
      </div>
    )
  }

}