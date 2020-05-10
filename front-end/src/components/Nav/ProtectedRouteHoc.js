import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {  any, object } from 'prop-types';

const ProtectedRouteHoc = ({ component: Component, loggedInUser, ...rest }) => {
	if (loggedInUser || rest.public) {
		return (
			<Route
				{...rest}
				render={props => {
					return <Component {...props}></Component>;
				}}
			/>
		);
	}

	return <Redirect to={{ pathname: '/' }} />;
};

ProtectedRouteHoc.propTypes = {
	component: any,
	loggedInUser: object,
	rest: object,
	props: object,
};

export default withRouter(ProtectedRouteHoc);