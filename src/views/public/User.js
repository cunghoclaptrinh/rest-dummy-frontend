import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";

import { getUser, getUserPageUIState, getPostsByUser } from "../../store";
import { loadUser } from "../../store/users";
import BlogListingItem from "../../components/BlogListingItem";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const mapStateToProps = (state, { match }) => {
  const userId = match.params.id;
  return {
    userId,
    user: getUser(state, userId),
    posts: getPostsByUser(state, userId),
    ...getUserPageUIState(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onMount: userId => dispatch(loadUser(userId))
});

function User({ userId, user, posts, onMount, loading, error }) {
  useEffect(() => {
    onMount(userId);
  }, [onMount, userId]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage message={error} />;
  } else if (user && posts && posts.length > 0) {
    return (
      <>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Avatar size={96} src={user.avatar} />
          <h2 style={{ marginTop: "0.5rem" }}>{user.name}</h2>
          <p>{user.about}</p>
        </div>

        <div>
          {posts.map(p => (
            <BlogListingItem key={p.id} post={p} showAuthor={false} />
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
