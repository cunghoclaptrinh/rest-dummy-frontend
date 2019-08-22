import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPostsForHome, getHomePageUIState } from "../../store";
import { loadPostsForHome } from "../../store/posts";
import BlogListingItem from "../../components/BlogListingItem";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const mapStateToProps = state => ({
  posts: getPostsForHome(state),
  ...getHomePageUIState(state)
});

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(loadPostsForHome())
});

function Home({ posts, loading, error, onMount }) {
  useEffect(() => {
    onMount();
  }, [onMount]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage message={error} />;
  } else if (posts) {
    return (
      <div>
        {posts.map(p => (
          <BlogListingItem key={p.id} post={p} />
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
