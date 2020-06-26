import React, { useState } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import OurStory from "../OurStory/OurStory.js";
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Join from '../Join/Join';
import CoachList from '../CoachList/CoachList';
import DedicatedCoaches from '../DedicatedCoaches/DedicatedCoaches';
import AthletesAndParents from "../AthletesAndParents/AthletesAndParents";
import logo from './Athletes-Untapped-Logo-Rectangle.png';
import './HomeNav.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Signup from "../Signup/Signup.js";


export default (props) => {

    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);

    const openLoginHandler = () => {
        setOpenLogin(true);
    }

    const closeLoginHandler = () => {
        setOpenLogin(false);
    }

    const openSignupHandler = () => {
        setOpenSignup(true);
    }

    const closeSignupHandler = () => {
        setOpenSignup(false);
    }

    return (
        <Router>
            <header className="homeNavHeader">
                <Link to="/" >
                    <img src={logo} className="AULogo" alt="Athletes Untapped"/>
                </Link>
                    <nav>
                        <ul className="homeNavBar">
                            <li>
                                <Link to="/athletesandparents" className="homeNavTab">Athletes & Parents</Link>
                            </li>
                            <li>
                                <Link to="/dedicatedcoaches" className="homeNavTab">Dedicated Coaches</Link>
                            </li>
                            <li>
                                <Link to="/ourstory" className="homeNavTab">Our Difference</Link>
                            </li>
                            <li>
                                <Link onClick={openLoginHandler} className="homeNavTab">Login</Link>
                                <Dialog onClose={closeLoginHandler} open={openLogin} fullWidth="true" maxWidth="sm">
                                    <DialogContent dividers>
                                    <Login switch={() => {closeLoginHandler(); openSignupHandler();}}/>
                                    </DialogContent>
                                </Dialog>
                            </li>
                            <li>
                                <Link onClick={openSignupHandler} className="homeNavTab">Sign Up</Link>
                                <Dialog onClose={closeSignupHandler} open={openSignup} fullWidth="true" maxWidth="sm">
                                    <DialogContent dividers>
                                    <Signup switch={() => {closeSignupHandler(); openLoginHandler();}} close={closeSignupHandler}/>
                                    </DialogContent>
                                </Dialog>
                            </li>
                        </ul>
                        </nav>
            </header>
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
                <Route
                    path="/dedicatedcoaches"
                    exact
                    render={(props) => <DedicatedCoaches {...props} />}
                /> 
                <Route
                    path="/athletesandparents"
                    exact
                    render={(props) => <AthletesAndParents {...props} />}
                /> 

                {/* Catch all for paths that don't match one of our routes  */}
                <Redirect  to='/'/>
            </Switch>
        </Router>
    )
}