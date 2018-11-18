import * as React from 'react'
import {Component} from "react";
import {RouteComponentProps} from 'react-router-dom'

interface HomeLayoutProps extends RouteComponentProps {
}

export default class extends Component<HomeLayoutProps> {
    render() {
        return <div id="home_layout">home</div>
    }
}
