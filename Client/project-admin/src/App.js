import React, { useEffect } from "react";
import User from "./User";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import Header from "./Header";

const App = (props) => {
  useEffect(()=>{
console.log("props1111111111------->",props)
  },[])
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="container">
        <div className="main">
          <Routes {...props}>
            <Route path="/" element={<UserForm />} />
            <Route path="/userform" element={<UserForm />} />
            <Route path="/userform/:id" element={<UserForm/>} />
            <Route path="/userdetails" element={<UserDetails />} />
            
          </Routes>
        </div>
      </div>
      <div className="footer">FOOTER</div>
    </>
  );
};

export default App;
