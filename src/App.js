import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
// import logo from './logo_v1.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from "./front_page/FrontPage";
import Cust from "./authentication/Cust";
import Stf from "./authentication/Stf";
import Adm from "./authentication/Adm";
import Stf_home from "./Staff/Stf_home";
import Adm_home from "./admin/Adm_home";
import Trans from "./transactions/trans";
// import Register from "./Register"
// import Login from "./Login"

export default class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/Customer" component={Cust} />
            <Route exact path="/Staff" component={Stf} />
            <Route exact path="/Admin" component={Adm} />
            <Route exact path="/Employee_home" component={Stf_home} />
            <Route exact path="/Admin_home" component={Adm_home} />
            <Route exact path="/trans" component={Trans} />
            {/* <div className="App" >
            <div className="App-header">
              <img src={logo} className="App-logo"
                alt="logo" />
            </div>
            <div className="c2">
              <p>
                Hello user!<br />
              </p>
            </div>
          </div> */}
          </Switch>
        </Fragment>
      </Router>
    );
  }
}