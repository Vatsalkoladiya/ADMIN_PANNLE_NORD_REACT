import React from "react";
import Logo from "./Images/download (1).png";
import { Menu, Button } from "antd";
import { useHistory } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  LoginOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
const Header = () => {
  let history = useHistory();
  const handleClick = (one) => {
    history.push(one);
  };
  const [collapsed, setCollapsed] = React.useState(true);
  // const [route, setRoute] = React.useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="header_main">
        <div className="header_sub_main">
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
          >
            <Menu.Item
              key="1"
              icon={<PieChartOutlined />}
              onClick={() => {
                handleClick("/userform");
              }}
            >
              REGISTER
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<LoginOutlined />}
              onClick={() => handleClick("/login")}
            >
              LOGIN
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<DesktopOutlined />}
              onClick={() => {
                handleClick("/userdetails");
              }}
            >
              USER-DETAILS
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<CheckCircleOutlined />}
              onClick={() => handleClick("/usercheckin-out")}
            >
              USER-CHECK IN-OUT
            </Menu.Item>
          </Menu>
        </div>
        <img
          src={Logo}
          alt=""
          height={75}
          width={75}
          style={{ margin: "10px", position: "absolute", right: "0" }}
        />
      </div>
    </>
  );
};

export default Header;
