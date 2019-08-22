import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import Markdown from "react-remarkable";

import { getPost, getPostPageUIState } from "../../store";
import { loadPost } from "../../store/posts";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function PostHeader({ post }) {
  const { author, updatedAt } = post;
  return (
    <Card bordered={false} style={{ background: "none" }}>
      <Card.Meta
        avatar={
          <Link to={`/users/${author.id}`}>
            <Avatar size={96} src={author.avatar} />
          </Link>
        }
        title={
          <Link
            to={`/users/${author.id}`}
            style={{ textDecoration: "underline" }}
          >
            <span>{author.name}</span>
          </Link>
        }
        description={
          <div>
            <p>
              {author.about}
              <br />
            </p>
            <p>Posted {moment(updatedAt).fromNow()}</p>
          </div>
        }
      />
    </Card>
  );
}

function PostBody({ post }) {
  return (
    <>
      <h2 style={{ paddingTop: "1rem", paddingBottom: "0.5rem" }}>
        {post.title}
      </h2>
      <Markdown source={post.body} />
    </>
  );
}

const mapStateToProps = (state, { match }) => {
  const postId = match.params.id;
  return {
    postId,
    post: getPost(state, postId),
    ...getPostPageUIState(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onMount: postId => dispatch(loadPost(postId))
});

function Post({ postId, post, onMount, loading, error }) {
  useEffect(() => {
    onMount(postId);
  }, [onMount, postId]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage message={error} />;
  } else if (post && post.body) {
    return (
      <div>
        <PostHeader post={post} />
        <PostBody post={post} />
      </div>
    );
  } else {
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
