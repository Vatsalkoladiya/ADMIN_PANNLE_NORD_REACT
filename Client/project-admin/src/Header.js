import React from "react";
import Logo from "./Images/download (1).png";
import { Menu, Button } from "antd";
import { useNavigate } from "react-router";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
const Header = (page, setPage) => {
  let navigate = useNavigate();
  const handleClick = (one) =>{
    navigate(one);
  }
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
            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => {handleClick('/userform')}}>
              USER-FORM
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => {handleClick('/userdetails')}}>
              USER-DETAILS
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
              USER-PROFILE
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
