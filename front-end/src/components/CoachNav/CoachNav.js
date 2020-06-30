import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import SignOut from "../SignOut/SignOut.js";
import CoachHome from '../CoachHome/CoachHome';
import CoachProfile from '../CoachProfile/CoachProfile';
import { AuthContext } from "../App/App";
import './CoachNav.css';

export default (props) => {
    const {user} = useContext(AuthContext);

    return (
        <Router>
            <div className="coachNavContainerDiv">
                
                    <p className="coachNavGreeting">Hi {user.profile.firstName}!</p>
                 
                
                
                
                <ul className="coachNavListOfTabs">
                    <li>
                        <Link to="/" className="coachNavTab">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="coachNavTab">Profile</Link>
                    </li>
                    <li>
                        <Link to="/inbox" className="coachNavTab">Inbox</Link>
                    </li>
                    <li>
                        <Link to="/clients" className="coachNavTab">Clients</Link>
                    </li>
                    <li>
                        <Link to="/payments" className="coachNavTab">Payments</Link>
                    </li>
                    <li>
                        <Link to="/calender" className="coachNavTab">Calender</Link>
                    </li>
                    <li>
                        <Link to="/account" className="coachNavTab">Account</Link>
                    </li>
                    <li>
                        <Link to="/referrals" className="coachNavTab">Referrals</Link>
                    </li>
                    
                </ul>
                <Link to="/signout" className="coachNavTab">Sign Out</Link>
            </div>
            <Switch>
      
                <Route
                    path={[ "/"]}
                    exact
                    render={(props) => <CoachHome {...props} />}
                /> 
                <Route
                    path="/profile"
                    exact
                    render={(props) => <CoachProfile {...props} />}
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