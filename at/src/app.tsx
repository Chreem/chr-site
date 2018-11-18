import '@babel/polyfill'
import * as React from 'react'
import {Component} from 'react'
import {createHashHistory} from 'history'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import StoreReceiver from '~components/hoc/StoreReceiver'
import AuthorizedRoute from './component/AuthorizedRoute'
import store from './model'
import {UserStoreType, actions} from './model/user'
import {getRouteByPath} from './route'
import 'antd/dist/antd.min.css'
import './style.less'
// import i18n from './services/i18n'

// i18n.setLang('en-US');

const history = createHashHistory();
const {title} = window.CONFIG;
const {path: homePath, component: Home} = getRouteByPath('/');
const {path: userPath, component: User} = getRouteByPath('/user');

class App extends Component<UserStoreType> {
  async componentWillMount() {
    // console.log(this.props.login);
    // this.componentDidUpdate();
  };
  async componentDidUpdate(prevProps?: UserStoreType) {
    const {login} = this.props;
    if (!prevProps || (prevProps.login !== login)) return history.replace(login ? homePath : userPath);
  }

  render() {
    const {login} = this.props;
    return <Router>
      <Route render={({location}) => {
        const {name} = getRouteByPath(location.pathname);
        document.title = name ? `${name} - ${title}` : title;

        return <Switch>
          <AuthorizedRoute login={login}
                           redirectPath={userPath}
                           path={homePath}
                           component={Home}
                           exact/>
          <Route path={userPath} component={User}/>
        </Switch>
      }}>
      </Route>
    </Router>
  }
};

export default StoreReceiver(App, store, 'user')