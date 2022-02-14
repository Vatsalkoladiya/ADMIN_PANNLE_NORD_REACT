import React from "react";
import { Button, Card, Col, Input, Row, Form } from "antd";
import { CompassFilled, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
  let history = useHistory();
  const [allData, setAllData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAllData({ ...allData, [name]: value });
  };

  const handleSignin = () => {
    history.push("/userform");
  };

  const handleSubmit = async () => {
    const data = await axios.post("http://localhost:5000/loginuser", allData);
    localStorage.setItem("TOKEN", JSON.stringify(data.data.accesstoken));
    console.log("loginData--->", data);
    history.push("/userdetails");
    setAllData({});
  };
  return (
    <>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Card className="cardtop">
            <h1 className="h2login">LOGIN</h1>
            <p>
              <b>Create your account</b>
            </p>
            <Form>
              <Form.Item>
                <Input
                  name="email"
                  placeholder="Enter Your Email"
                  addonBefore={<MailOutlined />}
                  value={allData.email}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  name="password"
                  value={allData.password}
                  addonBefore={<CompassFilled />}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                />
              </Form.Item>
              <Form.Item>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <Button
                    className="btn-md buttonsubmitlogin"
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                  <Button
                    className="btn-md buttonsubmitlogin"
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    onClick={handleSignin}
                  >
                    Register
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8} />
      </Row>
    </>
  );
};

export default Login;
