import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {ReactComponent as Logo} from './logo.svg'

const { Header } = Layout;


const AppHeader = () => {
  const location = useLocation();
  return (
    <Header className="header">
      <div className="logo">
        <Logo />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        className="menu"
      >
        <Menu.Item key="/flex">
          <Link to="/flex">Flex</Link>
        </Menu.Item>
        <Menu.Item key="/grid">
          <Link to="/grid">Grid</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
export default AppHeader;
