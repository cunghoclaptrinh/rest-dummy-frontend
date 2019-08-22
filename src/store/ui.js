import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_ERROR,
  USER_PAGE_REQUEST,
  USER_PAGE_SUCCESS,
  USER_PAGE_ERROR,
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
  DELETE_POST_RESET
} from "./actions";

export default combineReducers({
  home: _createLoadingReducer(
    HOME_PAGE_REQUEST,
    HOME_PAGE_SUCCESS,
    HOME_PAGE_ERROR
  ),
  user: _createLoadingReducer(
    USER_PAGE_REQUEST,
    USER_PAGE_SUCCESS,
    USER_PAGE_ERROR
  ),
  post: _createLoadingReducer(
    POST_PAGE_REQUEST,
    POST_PAGE_SUCCESS,
    POST_PAGE_ERROR
  ),
  signIn: _createProcessingReducer(
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR
  ),
  myPosts: _createLoadingReducer(
    MY_POSTS_REQUEST,
    MY_POSTS_SUCCESS,
    MY_POSTS_ERROR
  ),
  addPost: _createProcessingReducer(
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR,
    ADD_POST_RESET
  ),
  updatePost: _createProcessingReducer(
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_ERROR,
    UPDATE_POST_RESET
  ),
  deletePost: _createProcessingReducer(
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    DELETE_POST_RESET
  )
});

export const getHomePageState = state => state.home;
export const getUserPageState = state => state.user;
export const getPostPageState = state => state.post;
export const getSignInState = state => state.signIn;
export const getMyPostsState = state => state.myPosts;
export const getAddPostState = state => state.addPost;
export const getUpdatePostState = state => state.updatePost;
export const getDeletePostState = state => state.deletePost;

/* helper functions */
function _createLoadingReducer(
  reqActionType,
  successActionType,
  errorActionType
) {
  const initialState = {
    loading: false,
    error: null
  };

  return createReducer(initialState, {
    [reqActionType]: () => ({ loading: true, error: null }),
    [successActionType]: () => ({ loading: false, error: null }),
    [errorActionType]: (_state, action) => ({
      loading: false,
      error: action.payload
    })
  });
}

function _createProcessingReducer(
  reqActionType,
  successActionType,
  errorActionType,
  resetActionType
) {
  const initialState = {
    processing: false,
    error: null,
    done: false
  };

  return createReducer(initialState, {
    [reqActionType]: () => ({ processing: true, error: null, done: false }),
    [successActionType]: () => ({ processing: false, error: null, done: true }),
    [errorActionType]: (_state, action) => ({
      processing: false,
      error: action.payload,
      done: true
    }),
    [resetActionType]: () => initialState
  });
}
