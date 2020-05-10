import React from "react";
import Login from "../Login/Login";
import Join from "../Join/Join";

const routes = [
    { 
      name: "Join", 
      path: "/", 
      exact: true, 
      main: props => <Join {...props}/> 
    },
    { 
      name: "Login", 
      path: "/login", 
      exact: true, 
      main: props => <Login {...props} /> 
    }
];

export default routes;
