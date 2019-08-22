import { combineReducers } from "redux";

import profileReducer from "./profile";
import uiReducer, * as ui from "./ui";
import postsReducer, * as posts from "./posts";
import usersReducer, * as users from "./users";

export default combineReducers({
  profile: profileReducer,
  posts: postsReducer,
  users: usersReducer,
  ui: uiReducer
});

export const getProfile = state => state.profile;

export const getHomePageUIState = state => ui.getHomePageState(state.ui);
export const getUserPageUIState = state => ui.getUserPageState(state.ui);
export const getPostPageUIState = state => ui.getPostPageState(state.ui);
export const getSignInUIState = state => ui.getSignInState(state.ui);
export const getMyPostsUIState = state => {
  const { loading, error: loadingError } = ui.getMyPostsState(state.ui);
  const {
    processing: deleting,
    error: deletingError,
    done: deletingDone
  } = ui.getDeletePostState(state.ui);
  return {
    loading,
    loadingError,
    deleting,
    deletingDone,
    deletingError
  };
};
export const getAddPostUIState = state => ui.getAddPostState(state.ui);
export const getUpdatePostUIState = state => {
  const { loading, error: loadingError } = ui.getPostPageState(state.ui);
  const {
    processing,
    error: processingError,
    done: processingDone
  } = ui.getUpdatePostState(state.ui);
  return {
    loading,
    loadingError,
    processing,
    processingDone,
    processingError
  };
};

export const getUsers = state => users.getAll(state.users);
export const getUser = (state, userId) => users.get(state.users, userId);
export const hasUserLoaded = (state, userId) =>
  users.hasLoaded(state.users, userId);

export const hasHomeLoaded = state => posts.hasLoaded(state.posts);
export const hasPostLoaded = (state, postId) => {
  const post = posts.get(state.posts, postId);
  return post && post.body;
};

export const getPostsForHome = state =>
  _denormalizePosts(posts.getPublished(state.posts), state);
export const getPostsByUser = (state, userId) =>
  _denormalizePosts(posts.getPublishedByUser(state.posts, userId), state);
export const getPost = (state, postId) =>
  _denormalizePost(posts.get(state.posts, postId), state);
export const getMyPosts = state =>
  _denormalizePosts(posts.getAllByUser(state.posts, state.profile.id), state);

/* helper functions */
const _denormalizePost = (post, state) => {
  if (!post) return post;
  const { authorId, ...rest } = post;
  return {
    ...rest,
    author: getUser(state, authorId)
  };
};

const _denormalizePosts = (posts, state) =>
  posts.map(p => _denormalizePost(p, state));
