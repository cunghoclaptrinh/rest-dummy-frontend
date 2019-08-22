import { createReducer, createAction } from "redux-starter-kit";

import {
  USER_PAGE_REQUEST,
  USER_PAGE_SUCCESS,
  USER_PAGE_ERROR,
  HOME_PAGE_SUCCESS,
  POST_PAGE_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from "./actions";
import { hasUserLoaded } from ".";
import { loadUser as apiLoadUser } from "../api";

const loadRequest = createAction(USER_PAGE_REQUEST);
const loadSuccess = createAction(USER_PAGE_SUCCESS);
const loadError = createAction(USER_PAGE_ERROR);

const initialState = {
  byId: {},
  allIds: [],
  userLoadedAt: {}
};

export default createReducer(initialState, {
  [USER_PAGE_SUCCESS]: (state, action) => {
    state.userLoadedAt[action.payload.user.id] = Date.now();
    _updateUser(state, action.payload.user);
  },

  [HOME_PAGE_SUCCESS]: (state, action) =>
    action.payload.users.forEach(u => _updateUser(state, u)),

  [POST_PAGE_SUCCESS]: (state, action) =>
    _updateUser(state, action.payload.user),

  [SIGN_IN_SUCCESS]: (state, action) => _updateUser(state, action.payload),

  [SIGN_OUT_SUCCESS]: () => initialState
});

export function loadUser(userId) {
  return async (dispatch, getState) => {
    if (hasUserLoaded(getState(), userId)) {
      return;
    }

    dispatch(loadRequest());
    try {
      const data = await apiLoadUser(userId);
      const { user, posts } = _normalizeData(data);
      dispatch(loadSuccess({ user, posts }));
    } catch (ex) {
      dispatch(loadError(ex.message || "Unknown error"));
    }
  };
}

export const hasLoaded = (state, userId) => !!state.userLoadedAt[userId];
export const getAll = ({ allIds, byId }) => allIds.map(id => byId[id]);
export const get = ({ byId }, userId) => byId[userId];

/* helper functions */
const _normalizeData = ({ posts, ...rest }) => ({ user: rest, posts });
const _updateUser = ({ byId, allIds }, user) => {
  if (!allIds.includes(user.id)) {
    allIds.push(user.id);
  }

  if (byId[user.id]) {
    Object.assign(byId[user.id], user);
  } else {
    byId[user.id] = user;
  }
};
