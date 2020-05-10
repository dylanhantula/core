import React from 'react';
import ReportsView from '../Reports/ReportsView';
import SignOut from '../SignOut/SignOut';

const protectedRoutes = [
	{
		name: 'reports',
		exact: true,
		path: '/reports',
		main: props => <ReportsView {...props} />,
		public: false,
	},
	{
		name: 'sign_out',
		exact: true,
		path: '/signout',
		main: props => <SignOut {...props} />,
		public: false,
	},
];

export default protectedRoutes;