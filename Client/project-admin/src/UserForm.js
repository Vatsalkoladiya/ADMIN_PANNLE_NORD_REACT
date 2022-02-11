import React, { useEffect } from "react";
import { MailOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Radio, Form, Row } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import  from "antd/lib/form/Form";

const UserForm = (props) => {
  const data = props?.location?.pathname;
  const myArray = data.split("/");
  let history = useHistory();
  const [errors, setErrors] = React.useState({});
  const [allData, setAllData] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    rollpermission: "ADMIN",
  });

  useEffect(() => {
    getUpdatedData();
  }, []);

  const getUpdatedData = async () => {
    if (myArray[2]) {
      const data = await axios.get("http://localhost:5000/getuser");
      console.log("updatedgetData----->", data);
      const USER_DATA = data.data.filter((val) => val._id === myArray[2]);
      console.log("USER_DATA", USER_DATA);
      USER_DATA.map((value) => {
        return setAllData({
          firstName: value.firstName,
          middleName: value.middleName,
          lastName: value.lastName,
          email: value.email,
          mobile: value.mobile,
          gender: value.gender,
          rollpermission: value.rollpermission,
          password: "",
        });
      });
    }
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    let { name, value } = event.target;
    if (event.target.name === "firstName") {
      value = value.replace(/[^A-Z/^a-z\s-]/g, "");
    }
    if (event.target.name === "middleName") {
      value = value.replace(/[^A-Z/^a-z\s-]/g, "");
    }
    if (event.target.name === "lastName") {
      value = value.replace(/[^A-Z/^a-z\s-]/g, "");
    }
    if (event.target.name === "mobile") {
      value = value.replace(/[^0-9\s-]/g, "");
    }
    setAllData({ ...allData, [name]: value });
  };

  const validation = (name, value) => {
    const emailRegx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const mobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    switch (name) {
      case "firstName":
        if (!value) {
          return "Please Enter First Name";
        } else {
          return "";
        }
      case "middleName":
        if (!value) {
          return "Please Enter Middle Name";
        } else {
          return "";
        }
      case "lastName":
        if (!value) {
          return "Please Enter Last Nane";
        } else {
          return "";
        }
      case "email":
        if (!emailRegx.test(value)) {
          return "Please Enter Email";
        } else {
          return "";
        }
      case "mobile":
        if (!mobile.test(value)) {
          return "Please Enter Mobile";
        } else {
          return "";
        }
      case "gender":
        if (!value) {
          return "Please Enter Gender";
        } else {
          return "";
        }
      case "passWord":
        if (!value) {
          return "Please Enter PassWord";
        } else {
          return "";
        }
      case "rollpermission":
        if (!value) {
          return "Please Enter Rollpermission";
        } else {
          return "";
        }
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const Warn = {
      firstName: allData.firstName,
      middleName: allData.middleName,
      lastName: allData.lastName,
      email: allData.email,
      mobile: allData.mobile,
      gender: allData.gender,
      password: allData.password,
      rollpermission: allData.rollpermission,
    };
    let allErrors = {};
    Object.keys(Warn).forEach((key) => {
      const error = validation(key, Warn[key]);
      if (error && error.length) {
        allErrors[key] = error;
      }
    });
    if (Object.keys(allErrors).length) return setErrors(allErrors);
    console.log("allData", allData);
    if (myArray[2]) {
      const data = await axios.get("http://localhost:5000/getuser");
      console.log("updatedgetData----->", data);
      const USER_DATA = data.data.filter((val) => val._id === myArray[2]);
      USER_DATA[0] = allData;
      console.log("USER_DATA", USER_DATA);
      const updatedData = await axios.put(
        `http://localhost:5000/updateuser/${myArray[2]}`,
        USER_DATA[0]
      );
      console.log("UpdatedData----->>>", updatedData);
      history.push("/login");
      setAllData({});
    } else {
      const data = await axios.post(
        "http://localhost:5000/createuser",
        allData
      );
      console.log("CreateUser--->", data);
      history.push("/login");
      setAllData({});
    }
  };
  // axios
  //   .post("http://localhost:5000/createuser", allData)
  //   .then((res) => {
  //     console.log("res--->", res);
  //   })
  //   .catch((err) => {
  //     console.log("err------>", err);
  //   });
  // setAllData({});
  return (
    <>
      <div>
        <Row>
          <Col span={8} />
          <Col span={8}>
            <Card className="cardtop">
              <h4 className="h2login" style={{ textAlign: "center" }}>
                REGISTER
              </h4>
              <p style={{ textAlign: "center" }}>
                <b>Create your account</b>
              </p>
              <Form>
                <Form.Item>
                  <Input
                    name="firstName"
                    placeholder="Enter Your FirstName"
                    addonBefore={<UserOutlined />}
                    value={allData.firstName}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.firstName}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    name="middleName"
                    placeholder="Enter Your MiddleName"
                    addonBefore={<UserOutlined />}
                    value={allData.middleName}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.middleName}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    name="lastName"
                    placeholder="Enter Your Lastname"
                    addonBefore={<UserOutlined />}
                    value={allData.lastName}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.lastName}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    name="email"
                    placeholder="Enter Your Email"
                    addonBefore={<MailOutlined />}
                    value={allData.email}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.email}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    id="mobile"
                    name="mobile"
                    placeholder="Enter Your mobile"
                    addonBefore={<MobileOutlined />}
                    value={allData.mobile}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.mobile}</span>
                </Form.Item>
                <Form.Item
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    name="password"
                    value={allData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                  />
                </Form.Item>
                <span className="validation">{errors.password}</span>
                <h3>Gender</h3>
                <Radio.Group
                  onChange={(event) =>
                    handleChange({
                      target: { name: "gender", value: event.target.value },
                    })
                  }
                  value={allData.gender}
                >
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                  <Radio value="Other">Other</Radio>
                </Radio.Group>
                <span className="validation">{errors.gender}</span>
                <h3 style={{ marginTop: "10px" }}>Rollpermission</h3>
                <select
                  name="rollpermission"
                  id="rollpermission"
                  value={allData.rollpermission}
                  onChange={(event) =>
                    handleChange({
                      target: {
                        name: "rollpermission",
                        value: event.target.value,
                      },
                    })
                  }
                >
                  <option>ADMIN</option>
                  <option>USER</option>
                </select>
                <span className="validation">{errors.rollpermission}</span>
                <Form.Item style={{ margin: "10px 0px" }}>
                  <Button
                    className="btn-md buttonsubmitlogin"
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    onClick={handleSubmit}
                  >
                    {myArray[2] ? "UpdateData" : "Create Account"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8} />
        </Row>
      </div>
    </>
  );
};

export default UserForm;
