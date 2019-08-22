import React from "react";
import { Layout } from "antd";
import { Link, Switch, Route } from "react-router-dom";

import AuthButton from "./components/AuthButton";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/public/Home";
import User from "./views/public/User";
import Post from "./views/public/Post";
import SignIn from "./views/public/SignIn";
import SignOut from "./views/public/SignOut";
import MyPosts from "./views/private/MyPosts";
import NewPost from "./views/private/NewPost";
import EditPost from "./views/private/EditPost";

function App() {
  return (
    <Layout className="chlt-layout">
      <Layout.Header className="chlt-layout__header">
        <div className="chlt-layout__header__container">
          <Link to="/" className="chlt-layout__header__home">
            <span>Simple blog</span>
          </Link>
          <AuthButton />
        </div>
      </Layout.Header>
      <Layout.Content>
        <div className="chlt-layout__content__container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users/:id" component={User} />
            <Route path="/posts/:id" component={Post} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signout" component={SignOut} />
            <ProtectedRoute path="/my-posts" exact component={MyPosts} />
            <ProtectedRoute path="/my-posts/new" component={NewPost} />
            <ProtectedRoute path="/my-posts/:id" component={EditPost} />
          </Switch>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
