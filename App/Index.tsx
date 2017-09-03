import * as  React from 'react';
import * as  ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRedirect, RouteProps } from "react-router";
import objectAssign = require('object-assign');
import Root from './business/containers/Root';

// class App
console.log("App");
ReactDOM.render(<Root></Root>,document.getElementById('root'));