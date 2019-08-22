import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getProfile } from "../store";

const mapStateToProps = state => ({
  profile: getProfile(state)
});

function ProtectedRoute({ profile, ...rest }) {
  if (!profile) {
    return <Redirect to="/signin" />;
  } else {
    return <Route {...rest} />;
  }
}

export default connect(mapStateToProps)(ProtectedRoute);
