import React, { useEffect } from "react";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import axios from "axios";
import moment from "moment";
const UserCheckIn = () => {
  const momentDate = moment().format("MM-DD-YYYY");
  const momentTime = moment().format("LTS");
  const mainTime = moment().format("LTS");
  var x = new Date().toLocaleTimeString();
  const Time = moment().format('hh min-mm min-ss min')
  var startTime = moment(new Date().toLocaleTimeString(), "HH:mm:ss a");
  var endTime = moment(new Date().toLocaleTimeString(), "HH:mm:ss a");
  var duration = moment.duration((endTime).diff(startTime));
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes()) - hours * 60;
  var second = parseInt(duration.asSeconds()) - hours * 3600;
  var result1 = hours + " hour and " + minutes + " minutes." + second + "second";
console.log('new Date', x)
  var result =
    endTime.diff(startTime, 'hours') +
    " Hrs and " +
    endTime.diff(startTime, 'minutes') +
    " Mns";
    console.log('result',result);
  console.log("start", startTime._i);
  console.log("end", endTime._i);

  const token = JSON.parse(localStorage.getItem("TOKEN"));
  const [checkIn, setCheckIn] = React.useState([]);
  const [dataArr, setDataArr] = React.useState([]);
  const [data, setData] = React.useState({
    date: momentDate,
    checkin: startTime._id,
    chekout: endTime._id,
    work: result,
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
    const res = await axios.get(`http://localhost:5000/getcheckout:${token}`);
    console.log("response --> ", res.data);
    let tmpArr = res.data;
    setDataArr(tmpArr);
  };
  const handleCheckIn = async () => {
    const dataObj = {
      date: momentDate,
      checkin: startTime._i,
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
      chekout: endTime._i,
      work: result,
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
        status: res.data.data.status,
      };
    });
    setDataArr((oldArray) => [...oldArray, data]);
    checkOutData();
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
      dataIndex: "chekout",
      key: "chekout",
    },
    {
      title: "TotalWork",
      dataIndex: "work",
      key: "work",
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
          disabled={
            checkIn.map((item) => item === true) && checkIn.length !== 0
          }
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
