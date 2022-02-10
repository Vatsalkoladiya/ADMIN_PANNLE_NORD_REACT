import { Table } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [data, setData] = React.useState([]);
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
  React.useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log("deleteUser=====>", id);
    const data = await axios.delete(`http://localhost:5000/deleteuser/${id}`);
    console.log("deleteData", data);
    getData();
  };

  const handleUpdate = async (id) => {
    navigate(`/userform/${id}`);
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
      title: "Password",
      dataIndex: "password",
      key: "password",
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
        <Table dataSource={data} columns={columns} />;
      </div>
    </>
  );
};

export default UserDetails;
