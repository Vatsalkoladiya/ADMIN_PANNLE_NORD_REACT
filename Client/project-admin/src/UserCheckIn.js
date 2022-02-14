import React, { useEffect } from "react";
import {
  FileSearchOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import axios from "axios";
import moment from "moment";
const UserCheckIn = () => {
  const momentDate = moment().format("MM-DD-YYYY");
  const momentTime = moment().format("LTS");

  console.log("momentDate", momentDate);
  console.log("momentDate", momentTime);
  const token = JSON.parse(localStorage.getItem("TOKEN"));
  const [checkIn, setCheckIn] = React.useState([]);
  const [dataArr, setDataArr] = React.useState([]);
  const [data, setData] = React.useState({
    date: momentDate,
    checkin: momentTime,
    chekout: "",
    work: "",
    status: "",
  });

  const checkInData = async () => {
    const res = await axios.get(`http://localhost:5000/getcheckin:${token}`);
    console.log("response --> ", res.data);
    let tmpArr = res.data;
    setDataArr(tmpArr);
    const disable = res.data.map((item) => item.date === momentDate);
    setCheckIn(disable);
    console.log("disable", disable);
  };
  useEffect(() => {
    checkInData();
    // checkOutData();
  }, []);

  const checkOutData = async () => {
    const res = await axios.get(`http://localhost:5000/getcheckin:${token}`);
    console.log("response --> ", res.data);
    let tmpArr = res.data;
    setDataArr(tmpArr);
  };
  const handleCheckIn = async () => {
    const dataObj = {
      date: momentDate,
      checkin: momentTime,
    };
    const res = await axios.post("http://localhost:5000/checkin", {
      dataObj,
      token,
    });
    console.log("Api worked --> ", res.data.data);

    setData((prevVal) => {
      return {
        ...prevVal,
        date: res.data.data.date,
        checkin: res.data.data.checkin,
      };
    });
    setDataArr((oldArray) => [...oldArray, data]);
    checkInData();
  };
  const handleCheckOut = async () => {
    const dataOutObj = {
      chekout: momentTime,
      work: momentTime,
      status: "Compeleted",
    };
    const res = await axios.post("http://localhost:5000/checkout", {
      dataOutObj,
      token,
    });
    console.log("Api worked --> ", res.data.data);

    setData((prevVal) => {
      return {
        ...prevVal,
        chekout: res.data.data.checkout,
        work: res.data.data.work,
        status: res.data.status,
      };
    });
    setDataArr((oldArray) => [...oldArray, data]);
    // checkOutData();
  };

  // const handleCheckOut = () => {

  // }

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "CheckIn",
      dataIndex: "checkin",
      key: "checkin",
    },
    {
      title: "CheckOut",
      dataIndex: "checkout",
      key: "checkout",
    },
    {
      title: "TotalWork",
      dataIndex: "totalwork",
      key: "totalwork",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <>
      <div className="checkIn">
        <Button
          className="checkInButton"
          id="checkin"
          onClick={handleCheckIn}
          disabled={checkIn.map((item) => item == true) && checkIn.length != 0}
        >
          <LoginOutlined />
          CheckIn
        </Button>
        <Button
          id="checkout"
          onClick={handleCheckOut}
          // disabled={
          //   !checkIn.map((item) => item == true) && !checkIn.length != 0
          // }
        >
          <LogoutOutlined />
          CheckOut
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table
          className="checkinTable"
          style={{ textAlign: "center" }}
          dataSource={dataArr}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
        ;
      </div>
    </>
  );
};

export default UserCheckIn;
