import * as React from 'react'
import styled from 'styled-components'
import {createHashHistory} from 'history'
import StoreReceiver from '~components/hoc/StoreReceiver'
import store from '../../model'
import {UserStoreType} from '../../model/user'
import {Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom'
import {getChildrenRoutes} from '../index'

// const history = createHashHistory();

interface UserLayoutProps extends RouteComponentProps, UserStoreType {
}

const UserLayoutComponent = styled.div`
  height:100%;
  background-image:url(${require('../../assets/user-bg.svg')});
  background-repeat:repeat;
`;

class UserLayout extends React.Component<UserLayoutProps> {
  render() {
    const {path} = this.props.match;
    const routes = getChildrenRoutes(path);
    const login = routes.filter(({path}) => path.indexOf('login') >= 0)[0];
    const routesView = routes.map(route => {
      const {path, component} = route;
      return <Route key={route.path} path={path} component={component}/>
    });

    return <UserLayoutComponent id={'user_layout'}>
      <Switch>
        <Redirect from={path} to={login ? login.path : '/'} exact/>
        {routesView}
      </Switch>
    </UserLayoutComponent>
  }
}

export default UserLayout;