import React, { Component } from "react";
import { getUser } from "../../ducks/userReducer";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.getUser();
    }
  }

  render() {
      return(
          <div>eyo</div>
      )
  }
}

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
