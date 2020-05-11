import React from "react";
import { Switch, BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import SignOut from "../SignOut/SignOut.js";
import ReportsView from '../Reports/ReportsView';
export default (props) => {
    return (
        <Router>
            <ul className="nav">
                <li>
                    <Link to="/reports">Reports2</Link>
                </li>
                <li>
                    <Link to="/signout">Sign Out</Link>
                </li>
            </ul>
            <Switch>
      
                <Route
                    path={["/reports", "/"]}
                    exact
                    render={(props) => <ReportsView {...props} />}
                /> 
                <Route
                    path="/signout"
                    exact
                    render={(props) => <SignOut {...props} />}
                /> 

                {/* Catch all for paths that don't match one of our routes  */}
                <Redirect  to='/'/>
            </Switch>
        </Router>
    )
}