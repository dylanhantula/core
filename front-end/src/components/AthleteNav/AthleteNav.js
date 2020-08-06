import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import SignOut from "../SignOut/SignOut.js";
import AthleteHome from '../AthleteHome/AthleteHome';
import AthleteProfile from '../AthleteProfile/AthleteProfile';
import { AuthContext } from "../App/App";
import './AthleteNav.css';
import AthleteCoaches from "../AthleteCoaches/AthleteCoaches.js";
import CoachList from '../CoachList/CoachList';
import AthleteAccount from '../AthleteAccount/AthleteAccount';

export default (props) => {
    const {user} = useContext(AuthContext);

    return (
        <Router>
            <div className="athleteNavContainerDiv">
                <p className="athleteNavGreeting">Hi {user.profile.firstName}!</p>
                <ul className="athleteNavListOfTabs">
                    <li>
                        <Link to="/" className="athleteNavTab">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="athleteNavTab">Profile</Link>
                    </li>
                    <li>
                        <Link to="/inbox" className="athleteNavTab">Inbox</Link>
                    </li>
                    <li>
                        <Link to="/athletecoaches" className="athleteNavTab">Coaches</Link>
                    </li>
                    <li>
                        <Link to="/calender" className="athleteNavTab">Calender</Link>
                    </li>
                    <li>
                        <Link to="/account" className="athleteNavTab">Account</Link>
                    </li>
                </ul>
                <Link to="/signout" className="athleteNavTab">Sign Out</Link>
            </div>
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
                <Route
                    path="/athletecoaches"
                    exact
                    render={(props) => <AthleteCoaches {...props}/>}
                /> 
                
                <Route 
                    path="/coaches"
                    exact
                    render={(props) => <CoachList {...props} />}
                /> 
                <Route 
                    path="/account"
                    exact
                    render={(props) => <AthleteAccount {...props} />}
                /> 

                {/* Catch all for paths that don't match one of our routes  */}
                <Redirect  to='/'/>
            </Switch>
        </Router>
    )
}