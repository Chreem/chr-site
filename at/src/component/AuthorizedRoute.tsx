import * as React from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'

interface RedirectPropsType extends RouteProps {
    redirectPath: string;
    login: boolean;
}

export default class AuthorizedRoute extends React.Component<RedirectPropsType> {
    render() {
        const {login, redirectPath, children, ...otherProps} = this.props;
        if (!login) return <Redirect exact to={redirectPath}/>
        return <Route {...otherProps}>{children}</Route>
    }
}
