import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table, Button, Empty, Icon } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getMyPosts, getMyPostsUIState } from "../../store";
import { loadMyPosts, deletePost, deletePostReset } from "../../store/posts";

const mapStateToProps = state => ({
  posts: getMyPosts(state),
  ...getMyPostsUIState(state)
});

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(loadMyPosts()),
  onDelete: postId => dispatch(deletePost(postId)),
  onUnmount: () => dispatch(deletePostReset())
});

function MyPosts({
  posts,
  onMount,
  onDelete,
  onUnmount,
  loading,
  loadingError,
  deleting,
  deletingError
}) {
  const columns = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      render: (title, post) => (
        <Link to={`/my-posts/${post.id}`}>
          <span>{title}</span>
        </Link>
      )
    },
    { key: "status", title: "Status", dataIndex: "status" },
    {
      key: "updatedAt",
      title: "Updated",
      dataIndex: "updatedAt",
      render: updatedAt => moment(updatedAt).fromNow()
    },
    {
      key: "action",
      title: "",
      dataIndex: "id",
      render: id => (
        <Icon
          type="delete"
          style={{ color: "crimson" }}
          onClick={() => onDelete(id)}
        />
      )
    }
  ];

  useEffect(() => {
    onMount();
  }, [onMount]);

  useEffect(() => onUnmount, [onUnmount]); // clear blog deleting status

  if (loading || deleting) {
    return <Loading />;
  } else if (loadingError || deletingError) {
    return <ErrorMessage message={loadingError || deletingError} />;
  } else if (posts.length === 0) {
    return (
      <Empty description="">
        <p>No posts yet.</p>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/my-posts/new">
            <Button type="primary">Create Post</Button>
          </Link>
        </div>
      </Empty>
    );
  } else {
    return (
      <>
        <h2>My Posts</h2>
        <Table
          dataSource={posts}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
        <div style={{ marginTop: "1rem" }}>
          <Link to="/my-posts/new">
            <Button type="primary">Create Post</Button>
          </Link>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
