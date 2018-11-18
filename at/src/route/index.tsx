import i18n from '../services/i18n'

/**
 * 主layout
 */
import Home from './home/layout'
import User from './user/layout'

const routes = [
  {
    path: '/',
    component: Home
  },


  {
    path: '/user',
    component: User
  }, {
    path: '/user/login',
    name: i18n.get('login-title'),
    component: require('./user/login').default
  }, {
    path: '/user/register',
    name: i18n.get('register-title'),
    component: require('./user/register').default
  }
];

export const getChildrenRoutes = (path: string, except?: string | string[]) => {
  return routes.filter(item => {
    if (item.path === path) return false;
    if (item.path.indexOf(path) < 0) return false;
    if (!except) return true;
    if (typeof except === 'string') return item.path.indexOf(except) < 0;
    for (let i = 0, len = except.length; i < len; i++) {
      if (item.path.indexOf(except[i]) >= 0) return false;
    }
    return true;
  });
};

export const getRouteByPath = (path: string) => routes.filter(item => item.path === path)[0];

export default routes;