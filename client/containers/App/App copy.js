import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import renderRoutes from 'react-router-config/renderRoutes';
import Helmet from 'react-helmet';

import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
import { isAuthLoaded, loadAuth, logout } from '../../redux/modules/auth';

import Notifs from '../../components/Notifs/Notifs';
import config from '../../../server/config';

import AppScss from './styles/AppScss.scss';
import AppCss from './styles/AppCss.css';

// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_and_CSS
import iconBar36 from './svg/icon-bar-36.svg';

@asyncConnect([
  {
    promise: async ({ store: { dispatch, getState } }) => {
      console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isAuthLoaded FALSE ??? <<<<<<<<<<<<<<<<<<<');
      if (!isAuthLoaded(getState())) {
        console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isAuthLoaded FALSE <<<<<<<<<<<<<<<<<');
        await dispatch(loadAuth());
      }
      console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isInfoLoaded FALSE ??? <<<<<<<<<<<<<<<<<<<');
      if (!isInfoLoaded(getState())) {
        console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isInfoLoaded FALSE <<<<<<<<<<<<<<<<<');
        await dispatch(loadInfo());
      }
    }
  }
])

@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user
  }),
  {
    logout
  }
)

export default class App extends Component {
  static propTypes = {
    user: PropTypes.shape({ email: PropTypes.string }),
    notifs: PropTypes.shape({ global: PropTypes.array }).isRequired,
    logout: PropTypes.func.isRequired,
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    })
  };

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.user && nextProps.user) {
  //     this.context.router.history.push('/loginSuccess');
  //   } else if (this.props.user && !nextProps.user) {
  //     this.context.router.history.push('/');
  //   }
  // }
  // <span className="navbar-toggler-icon"></span>
  // <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNzc3Nzc3IiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0zIDE4aDE4di0ySDN2MnptMC01aDE4di0ySDN2MnptMC03djJoMThWNkgzeiIvPgo8L3N2Zz4=" alt="Nav Menu">
  // <img src={iconBar36} alt="Nav Menu"/>


  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {

    const { notifs, route } = this.props;
    console.log('>>>>>>>>>>>>> APP.JS > render() <<<<<<<<<<<<<<');

    return (
      <div>
        <Helmet {...config.app.head} />

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><span className={`fa fa-headphones ${AppScss.colorGold}`}></span><span className={`${AppScss.colorGold}`}>Headphones!</span></a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="text"></input>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <div>
          {notifs.global && (
            <div>
              <Notifs
                namespace="global"
                NotifComponent={props => <div>{props.message}</div>}
              />
            </div>
          )}
          {renderRoutes(route.routes)}
        </div>

        <footer className="container" className={`container ${AppCss.colorCrimson}`}>
          <p>Copyright © 2018 · Election App 2018!</p>
        </footer>

      </div>
    );
  }
}
