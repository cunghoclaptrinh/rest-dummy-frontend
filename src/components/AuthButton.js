import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Avatar, Button } from "antd";

import { getProfile } from "../store";

const mapStateToProps = state => ({
  profile: getProfile(state)
});

const SignInButton = () => (
  <Link to="/signin">
    <Button type="link" icon="login" style={{ color: "white" }}>
      Sign In
    </Button>
  </Link>
);

const AvatarWithMenu = ({ profile }) => (
  <Menu
    mode="horizontal"
    theme="dark"
    style={{ margin: "auto 0" }}
    selectedKeys={[]}
  >
    <Menu.SubMenu title={<Avatar src={profile.avatar} />}>
      <Menu.Item>
        <Link to="/my-posts">
          <span>My Posts</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/signout">
          <span>Sign Out</span>
        </Link>
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

function AuthButton({ profile }) {
  return (
    <div className="chlt-layout__header__auth">
      {!profile && <SignInButton />}
      {!!profile && <AvatarWithMenu profile={profile} />}
    </div>
  );
}

export default connect(mapStateToProps)(AuthButton);
