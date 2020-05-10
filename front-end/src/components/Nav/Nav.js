import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import routes from "./routes.js";
import Header from "./Header";
import protectedRoutes from './protectedRoutes'
import ProtectedRouteHoc from './ProtectedRouteHoc'
import { AuthContext } from "../App/App";

export default (props) => {

    const {loggedInUser} = useContext(AuthContext);

    return (
        <Router>
            <Header loggedInUser={loggedInUser}/>
            <Switch>
                {protectedRoutes.map(route => (
                <ProtectedRouteHoc
                    key={route.path}
                    loggedInUser={loggedInUser}
                    path={route.path}
                    component={route.main}
                    exact={route.exact}
                    public={route.public}
                />
                ))}

                {routes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                />
                ))}

                {/* Catch all for paths that don't match one of our routes  */}
                <Redirect  to='/'/>
            </Switch>
        </Router>
    )
}
