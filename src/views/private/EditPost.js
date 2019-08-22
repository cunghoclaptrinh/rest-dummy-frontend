import React, { useEffect } from "react";
import { connect } from "react-redux";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import PostInputForm from "../../components/PostInputForm";
import { getPost, getUpdatePostUIState } from "../../store";
import { loadPost, updatePost, updatePostReset } from "../../store/posts";

const mapStateToProps = (state, { match }) => {
  const postId = match.params.id;
  return {
    postId,
    post: getPost(state, postId),
    ...getUpdatePostUIState(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onMount: postId => dispatch(loadPost(postId)),
  onSubmit: post => dispatch(updatePost(post)),
  onUnmount: () => dispatch(updatePostReset())
});

function EditPost({
  postId,
  post,
  onMount,
  onSubmit,
  loading,
  processing,
  processingDone,
  loadingError,
  processingError,
  history,
  onUnmount
}) {
  useEffect(() => {
    onMount(postId);
  }, [postId, onMount]);

  useEffect(() => {
    if (processingDone) {
      history.go(-1); // back to /my-posts
    }
  });

  useEffect(() => onUnmount, [onUnmount]); // clear form processing status

  if (loading) {
    return <Loading />;
  } else if (loadingError) {
    return <ErrorMessage message={loadingError} />;
  } else if (post && post.body) {
    return (
      <PostInputForm
        post={post}
        onCancel={() => history.go(-1)}
        onSubmit={onSubmit}
        processing={processing}
        error={processingError}
      />
    );
  } else {
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);
