import React, { useEffect } from "react";
import { connect } from "react-redux";

import PostInputForm from "../../components/PostInputForm";
import { addPost, addPostReset } from "../../store/posts";
import { getAddPostUIState } from "../../store";

const mapStateToProps = state => ({
  ...getAddPostUIState(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit: post => dispatch(addPost(post)),
  onUnmount: () => dispatch(addPostReset())
});

function NewPost({ onSubmit, processing, error, done, history, onUnmount }) {
  useEffect(() => {
    if (done) {
      history.go(-1); // back to /my-posts
    }
  });

  useEffect(() => onUnmount, [onUnmount]); // clear form processing status

  return (
    <PostInputForm
      onSubmit={onSubmit}
      onCancel={() => history.go(-1)}
      processing={processing}
      error={error}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
