import { createReducer, createAction } from "redux-starter-kit";

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  // SIGN_OUT_REQUEST,
  // SIGN_OUT_ERROR,
  MY_POSTS_SUCCESS
} from "./actions";
import { signIn as apiSignIn } from "../api";

const signInRequest = createAction(SIGN_IN_REQUEST);
const signInSuccess = createAction(SIGN_IN_SUCCESS);
const signInError = createAction(SIGN_IN_ERROR);
// const signOutRequest = createAction(SIGN_OUT_REQUEST);
const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
// const signOutError = createAction(SIGN_OUT_ERROR);

export default createReducer(null, {
  [SIGN_IN_SUCCESS]: (_, action) => action.payload,
  [SIGN_OUT_SUCCESS]: () => null,
  [MY_POSTS_SUCCESS]: state => {
    state.loadedAt = Date.now();
  }
});

export function signIn(email, password) {
  return async dispatch => {
    dispatch(signInRequest());

    try {
      const profile = await apiSignIn(email, password);
      dispatch(signInSuccess(profile));
    } catch (ex) {
      dispatch(signInError(ex.message || "Unknown error."));
    }
  };
}

export function signOut() {
  return async dispatch => {
    // dispatch(signOutRequest());

    // try {
    //   await apiSignOut();
    dispatch(signOutSuccess());
    // } catch (ex) {
    //   dispatch(signOutError(ex.message || "Unknown error."));
    // }
  };
}
