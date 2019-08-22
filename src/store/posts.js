import { createReducer, createAction } from "redux-starter-kit";

import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_ERROR,
  POST_PAGE_REQUEST,
  POST_PAGE_SUCCESS,
  POST_PAGE_ERROR,
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  MY_POSTS_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  ADD_POST_RESET,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  UPDATE_POST_RESET,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_RESET,
  USER_PAGE_SUCCESS,
  SIGN_OUT_SUCCESS
} from "./actions";
import { hasHomeLoaded, hasPostLoaded, getProfile } from ".";
import {
  loadPostsForHome as apiLoadPostsForHome,
  loadPost as apiLoadPost,
  loadMyPosts as apiLoadMyPosts,
  addPost as apiAddPost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost
} from "../api";

const homeRequest = createAction(HOME_PAGE_REQUEST);
const homeSuccess = createAction(HOME_PAGE_SUCCESS);
const homeError = createAction(HOME_PAGE_ERROR);
const postRequest = createAction(POST_PAGE_REQUEST);
const postSuccess = createAction(POST_PAGE_SUCCESS);
const postError = createAction(POST_PAGE_ERROR);
const myPostsRequest = createAction(MY_POSTS_REQUEST);
const myPostsSuccess = createAction(MY_POSTS_SUCCESS);
const myPostsError = createAction(MY_POSTS_ERROR);
const addPostRequest = createAction(ADD_POST_REQUEST);
const addPostSuccess = createAction(ADD_POST_SUCCESS);
const addPostError = createAction(ADD_POST_ERROR);
export const addPostReset = createAction(ADD_POST_RESET);
const updatePostRequest = createAction(UPDATE_POST_REQUEST);
const updatePostSuccess = createAction(UPDATE_POST_SUCCESS);
const updatePostError = createAction(UPDATE_POST_ERROR);
export const updatePostReset = createAction(UPDATE_POST_RESET);
const deletePostRequest = createAction(DELETE_POST_REQUEST);
const deletePostSuccess = createAction(DELETE_POST_SUCCESS);
const deletePostError = createAction(DELETE_POST_ERROR);
export const deletePostReset = createAction(DELETE_POST_RESET);

const initialState = {
  byId: {},
  allIds: [],
  loadedAt: null
};

export default createReducer(initialState, {
  [HOME_PAGE_SUCCESS]: (state, action) => {
    state.loadedAt = Date.now();
    _updatePosts(state, action.payload.posts);
  },

  [USER_PAGE_SUCCESS]: (state, action) =>
    _updatePosts(state, action.payload.posts),

  [POST_PAGE_SUCCESS]: (state, action) =>
    _updatePosts(state, [action.payload.post]),

  [MY_POSTS_SUCCESS]: (state, action) => _updatePosts(state, action.payload),
  [ADD_POST_SUCCESS]: (state, action) => _updatePosts(state, [action.payload]),
  [UPDATE_POST_SUCCESS]: (state, action) =>
    _updatePosts(state, [action.payload]),
  [DELETE_POST_SUCCESS]: (state, action) => {
    const allIds = state.allIds.filter(id => id !== action.payload);
    const byId = allIds.reduce((acc, id) => {
      acc[id] = state.byId[id];
      return acc;
    }, {});
    return {
      ...state,
      allIds,
      byId
    };
  },

  [SIGN_OUT_SUCCESS]: () => initialState
});

export function loadPostsForHome() {
  return async (dispatch, getState) => {
    if (hasHomeLoaded(getState())) {
      return;
    }

    dispatch(homeRequest());
    try {
      const data = await apiLoadPostsForHome();
      const { posts, users } = _normalizePosts(data);
      dispatch(homeSuccess({ posts, users }));
    } catch (ex) {
      dispatch(homeError(ex.message || "Unknown error"));
    }
  };
}

export function loadPost(postId) {
  return async (dispatch, getState) => {
    if (hasPostLoaded(getState(), postId)) {
      return;
    }

    dispatch(postRequest());
    try {
      const data = await apiLoadPost(postId);
      const { post, user } = _normalizePost(data);
      dispatch(postSuccess({ post, user }));
    } catch (ex) {
      dispatch(postError(ex.message || "Unknown error"));
    }
  };
}

export function loadMyPosts() {
  return async (dispatch, getState) => {
    if (getProfile(getState()).loadedAt) {
      return;
    }

    dispatch(myPostsRequest());
    try {
      const posts = await apiLoadMyPosts();
      dispatch(myPostsSuccess(posts));
    } catch (ex) {
      dispatch(myPostsError(ex.message || "Unknown error"));
    }
  };
}

export function addPost(input) {
  return async dispatch => {
    dispatch(addPostRequest());
    try {
      const post = await apiAddPost(input);
      dispatch(addPostSuccess(post));
    } catch (ex) {
      dispatch(addPostError(ex.message || "Unknown error"));
    }
  };
}

export function updatePost(input) {
  return async dispatch => {
    dispatch(updatePostRequest());
    try {
      const post = await apiUpdatePost(input);
      dispatch(updatePostSuccess(post));
    } catch (ex) {
      dispatch(updatePostError(ex.message || "Unknown error"));
    }
  };
}

export function deletePost(postId) {
  return async dispatch => {
    dispatch(deletePostRequest());
    try {
      await apiDeletePost(postId);
      dispatch(deletePostSuccess(postId));
    } catch (ex) {
      dispatch(deletePostError(ex.message || "Unknown error"));
    }
  };
}

export const hasLoaded = state => !!state.loadedAt;
export const get = ({ byId }, postId) => byId[postId];
export const getPublished = ({ allIds, byId }) =>
  allIds.filter(id => byId[id].status === "published").map(id => byId[id]);
export const getPublishedByUser = ({ allIds, byId }, userId) =>
  allIds
    .filter(
      id => byId[id].authorId === userId && byId[id].status === "published"
    )
    .map(id => byId[id]);
export const getAllByUser = ({ allIds, byId }, userId) =>
  allIds.filter(id => byId[id].authorId === userId).map(id => byId[id]);

/* helper functions */
function _normalizePost({ author, ...rest }) {
  return {
    post: { ...rest, authorId: author.id },
    user: author
  };
}

function _normalizePosts(data) {
  const authors = {};
  const posts = [];

  data.forEach(p => {
    const { author, ...rest } = p;

    posts.push({ ...rest, authorId: author.id });
    if (!authors[author.id]) {
      authors[author.id] = author;
    }
  });

  return { users: Object.values(authors), posts };
}

function _updatePosts({ byId, allIds }, posts) {
  posts.forEach(p => {
    if (!allIds.includes(p.id)) {
      allIds.push(p.id);
    }

    if (byId[p.id]) {
      Object.assign(byId[p.id], p);
    } else {
      byId[p.id] = p;
    }
  });
}
