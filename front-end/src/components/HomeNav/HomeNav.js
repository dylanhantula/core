import React from "react";
import { Switch, BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import OurStory from "../OurStory/OurStory.js";
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Join from '../Join/Join';
import CoachList from '../CoachList/CoachList';

export default (props) => {

    return (
        <Router>
            <ul className="nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/ourstory">Our story</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/join">Sign Up</Link>
                </li>
            </ul>
            <Switch>
      
                <Route
                    path={[ "/"]}
                    exact
                    render={(props) => <Landing {...props} />}
                /> 
                <Route
                    path="/ourstory"
                    exact
                    render={(props) => <OurStory {...props} />}
                /> 
                <Route
                    path="/login"
                    exact
                    render={(props) => <Login {...props} />}
                /> 
                <Route
                    path="/join"
                    exact
                    render={(props) => <Join {...props} />}
                /> 

                <Route
                    path="/coaches"
                    exact
                    render={(props) => <CoachList {...props} />}
                /> 

                {/* Catch all for paths that don't match one of our routes  */}
                <Redirect  to='/'/>
            </Switch>
        </Router>
    )
}