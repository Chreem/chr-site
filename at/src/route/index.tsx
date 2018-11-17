import Home from './home/layout'

const routes = [
  {
    path: '/',
    component: Home
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

export const getRouteByPath = (path: string) => routes.filter(item => item.path === path);

export default routes;