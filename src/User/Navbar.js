import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import { ReactComponent as Nav_s } from "../assets/nav_s.svg";
import { ReactComponent as Nav_w } from "../assets/nav_w.svg";
import { ReactComponent as Nav_a } from "../assets/nav_a.svg";
import { ReactComponent as Nav_p } from "../assets/nav_p.svg";
import { ReactComponent as Nav_s_h } from "../assets/nav_s_h.svg";
import { ReactComponent as Nav_w_h } from "../assets/nav_w_h.svg";
import { ReactComponent as Nav_a_h } from "../assets/nav_a_h.svg";
import { ReactComponent as Nav_p_h } from "../assets/nav_p_h.svg";
import { ReactComponent as Logo_sym } from "../assets/logo_symbol.svg";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { nav_s: false, nav_w: false, nav_a: false, nav_p: false }
    this.toggle_s = this.toggle_s.bind(this);
    this.toggle_w = this.toggle_w.bind(this);
    this.toggle_a = this.toggle_a.bind(this);
    this.toggle_p = this.toggle_p.bind(this);
  }
  toggle_s() {
    this.setState({ nav_s: true })
  }
  toggle_w() {
    this.setState({ nav_w: true })
  }
  toggle_a() {
    this.setState({ nav_a: true })
  }
  toggle_p() {
    this.setState({ nav_p: true })
  }

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light userhomenavbar row">
          <div className="col" />
          <div className="col" />
          <div className="col-2" style={{ "paddingBottom": "3rem" }}>
            {this.state.nav_s ?
              <Link to="/User_Shop">
                <Nav_s_h onMouseLeave={() => this.setState({ nav_s: false })} className="animated pulse" style={{ "cursor": "pointer" }} />
              </Link>
              :
              <Nav_s onMouseEnter={this.toggle_s} />
            }
          </div>
          <div className="col" />
          <div className="col-2" style={{ "paddingBottom": "3rem" }}>
            {this.state.nav_w ?
              <Link to="/User_Wallet">
                <Nav_w_h onMouseLeave={() => this.setState({ nav_w: false })} className="animated pulse" style={{ "cursor": "pointer" }} />
              </Link>
              :
              <Nav_w onMouseEnter={this.toggle_w} />
            }
          </div>
          <div className="col-2" style={{ "textAlign": "center" }}>
            <Link to="/Home">
              <Logo_sym style={{ "height": "125px ", "cursor": "pointer" }} />
            </Link>
          </div>
          <div className="col-2" style={{ "paddingBottom": "3rem" }}>
            {this.state.nav_a ?
              <Link to="User_About">
                <Nav_a_h onMouseLeave={() => this.setState({ nav_a: false })} className="animated pulse" style={{ "cursor": "pointer" }} />
              </Link>
              :
              <Nav_a onMouseEnter={this.toggle_a} />
            }
          </div>
          <div className="col" />
          <div className="col-2" style={{ "paddingBottom": "3rem" }}>
            {this.state.nav_p ?
              <Link to="User_Profile">
                <Nav_p_h onMouseLeave={() => this.setState({ nav_p: false })} className="animated pulse" style={{ "cursor": "pointer" }} />
              </Link>
              :
              <Nav_p onMouseEnter={this.toggle_p} />
            }
          </div>
          <div className="col" />
          <div className="col" />
        </nav>
      </div>
    )
  }
}