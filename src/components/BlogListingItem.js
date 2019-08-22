import React from "react";
import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

function BlogListingItem({ post, showAuthor = true }) {
  const { id, title, shortDescription, author, updatedAt } = post;

  return (
    <Card bordered={false} className="chlt-blog-post-card">
      <Link to={`/posts/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>{shortDescription}</p>
      {showAuthor && (
        <div>
          <Link to={`/users/${author.id}`}>
            <span>
              <Avatar src={author.avatar} />{" "}
              <span style={{ textDecoration: "underline" }}>{author.name}</span>
            </span>
          </Link>
          {" posted "}
          {moment(updatedAt).fromNow()}
        </div>
      )}

      {!showAuthor && <div>Posted {moment(updatedAt).fromNow()}</div>}
    </Card>
  );
}

export default BlogListingItem;
