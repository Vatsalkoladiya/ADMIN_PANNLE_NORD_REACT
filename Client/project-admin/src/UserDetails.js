import { Table } from "antd";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

const UserDetails = () => {
  const [data, setData] = React.useState([]);
  let local = JSON.parse(localStorage.getItem("TOKEN"));
  console.log("local", local);
  const getData = async () => {
    const data = await axios.get("http://localhost:5000/getuser");
    console.log("res--->", data);
    setData(data.data);
    // axios
    //   .get("http://localhost:5000/getuser")
    //   .then((res) => {
    //     console.log("res--->", res.data);
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log("err------>", err);
    //   });
  };

  const getDataWithToken = async () => {
    const res = await axios.get(`http://localhost:5000/getuser/:${local}`);
    console.log("res--->", typeof(res));
    let dataOne = [];
    if (typeof(res.data) == "object") {
      dataOne.push(res.data);
      setData(dataOne);
    } else {
      setData(res.data);
    }
  };
  React.useEffect(() => {
    getDataWithToken();
    // getData();
  }, []);
  const history = useHistory();

  const handleDelete = async (id) => {
    console.log("deleteUser=====>", id);
    const data = await axios.delete(`http://localhost:5000/deleteuser/${id}`);
    console.log("deleteData", data);
    getData();
  };

  const handleUpdate = async (id) => {
    history.push(`/userform/${id}`);
  };
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Middlename",
      dataIndex: "middleName",
      key: "middleName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Rollpermission",
      dataIndex: "rollpermission",
      key: "rollpermission",
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <div className="action_button">
          <button
            className="edit "
            onClick={() => {
              handleUpdate(text._id);
            }}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => {
              handleDelete(text._id);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table
          style={{ textAlign: "center" }}
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
        ;
      </div>
    </>
  );
};

export default UserDetails;
