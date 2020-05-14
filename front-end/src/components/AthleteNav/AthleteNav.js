import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import SignOut from "../SignOut/SignOut.js";
import AthleteHome from '../AthleteHome/AthleteHome';
import AthleteProfile from '../AthleteProfile/AthleteProfile';
import { AuthContext } from "../App/App";

export default (props) => {
    const {user} = useContext(AuthContext);

    return (
        <Router>
            <ul className="nav">
                <li>
                    Current User: {user.profile.firstName} {user.profile.lastName}
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/signout">Sign Out</Link>
                </li>
            </ul>
            <Switch>
      
                <Route
                    path={[ "/"]}
                    exact
                    render={(props) => <AthleteHome {...props} />}
                /> 
                <Route
                    path="/profile"
                    exact
                    render={(props) => <AthleteProfile {...props} />}
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