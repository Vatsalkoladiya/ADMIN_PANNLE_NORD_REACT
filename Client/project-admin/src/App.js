import React, { useEffect } from "react";
import User from "./User";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import Header from "./Header";
import Login from "./Login";
import PublicRoute from "./PublicRoute";
import PrivetRoute from "./PrivetRoute";

const App = (props) => {
  useEffect(() => {
    console.log("props1111111111------->", props);
  }, []);
  return (
    <>
          <BrowserRouter>
      <div className="header">
        <Header />
      </div>
      <div className="container">
        <div className="main">
            <Switch {...props}>
              <Route path="/" exact component={UserForm} />
              <Route
                // restricted={false}
                path="/login"
                component={Login}
                // exact
              />
              <Route
                // restricted={false}
                path="/userform"
                component={UserForm}
                // exact
              />
              <PrivetRoute
                path="/userform/:id"
                component={UserForm}
                // exact
              />
              <PrivetRoute
                path="/userdetails"
                component={UserDetails}
                // exact
              />
            </Switch>
        </div>
      </div>
      <div className="footer">FOOTER</div>
          </BrowserRouter>
    </>
  );
};

export default App;
