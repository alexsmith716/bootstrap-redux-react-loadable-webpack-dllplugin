import { routerActions } from 'react-router-redux';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { App, Home, NotFound } from '../containers';

import Login from '../containers/Login/Login';
import Register from '../containers/Register/Register';
import About from '../containers/About/About';

// import About from '../containers/About/Loadable';
// import Login from '../containers/Login/Loadable';
// import Register from '../containers/Register/Loadable';
// import LoginSuccess from 'containers/LoginSuccess/Loadable';

const locationHelper = locationHelperBuilder({});

// const isAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: state => !!state.auth.user,
//   redirectPath: '/login',
//   redirectAction: routerActions.replace,
//   wrapperDisplayName: 'UserIsAuthenticated'
// });

const isNotAuthenticated = connectedRouterRedirect({
  authenticatedSelector: state => !state.auth.user,
  redirectAction: routerActions.replace,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated'
});

const routes = [{
  component: App,
  routes: [
    { path: '/', exact: true, component: Home },
    { path: '/about', component: About },
    { path: '/login', component: isNotAuthenticated(Login) },
    // { path: '/login-success', component: isAuthenticated(LoginSuccess) },
    { path: '/register', component: isNotAuthenticated(Register) },
    { component: NotFound },
  ],
}];

export default routes;
