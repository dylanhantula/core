import React, { useContext } from "react";
import routes from "./routes";
import { Link } from "react-router-dom";
import { AuthContext } from "./App";

const Header = () => {
  const {loggedInUser} = useContext(AuthContext);
  return (
    <ul className="nav">
    {routes.map((route, i) => (
      <li key={i}>
        <Link to={route.path}>{route.name}</Link>
      </li>
    ))}
    {loggedInUser && <li><Link to="/reports">Reports</Link></li>}
    {loggedInUser && <li><Link to="/signout">Sign Out</Link></li>}
  </ul>
  )
}


export default Header;
