import React from "react";
import Header from "./Header";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";

const User = () => {
  const [page, setPage] = React.useState("/");
  return (
    <>
      <div className="container">
        <div className="main">
          <UserDetails />
        </div>
      </div>
    </>
  );
};

export default User;
