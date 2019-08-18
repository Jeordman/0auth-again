import React, { Component } from "react";
import { login, logout, getUser } from "../../ducks/userReducer";
import { connect } from "react-redux";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();

    this.userLogin = this.userLogin.bind(this);
  }

  userLogin() {
      this.props.login()
  }

 

  render() {
    return (
      <div>
        <button onClick={this.userLogin}>Login</button>
        <button>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps,
  { login, logout, getUser }
)(Header);
