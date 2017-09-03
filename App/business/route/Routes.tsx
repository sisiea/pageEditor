import React = require('react');
import { Router, Route, Link, hashHistory, browserHistory, IndexRedirect, RouteProps } from "react-router";
import App from "../containers/App";
import DemoPage from '../containers/demoPage/DemoPage';
export default (
    <Route path="/" component={App}>
        <IndexRedirect to='/demopage' />
        <Route path="/demopage" component={DemoPage} />
    </Route>
)
