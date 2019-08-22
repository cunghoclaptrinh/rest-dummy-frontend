import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import SignInForm from "./SignInForm";
import { getProfile, getSignInUIState } from "../../../store";
import { signIn } from "../../../store/profile";

const mapStateToProps = state => ({
  profile: getProfile(state),
  ...getSignInUIState(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) => dispatch(signIn(email, password))
});

function SignIn({ profile, onSubmit, processing, error }) {
  if (profile) {
    return <Redirect to="/my-posts" />;
  } else {
    return (
      <SignInForm onSubmit={onSubmit} processing={processing} error={error} />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
