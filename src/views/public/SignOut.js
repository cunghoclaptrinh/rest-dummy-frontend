import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Loading from "../../components/Loading";
import { getProfile } from "../../store";
import { signOut } from "../../store/profile";

const mapStateToProps = state => ({
  profile: getProfile(state)
});

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(signOut())
});

function SignOut({ profile, onMount }) {
  useEffect(() => {
    onMount();
  }, [onMount]);

  if (profile) {
    return <Loading />;
  } else {
    return <Redirect to="/" />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOut);
