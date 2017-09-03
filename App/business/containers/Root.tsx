import * as React from 'react';
import { Router, Route, Link, hashHistory, browserHistory, IndexRedirect, RouteProps } from "react-router";
import { ConfigStore, EmitterKeys } from '../store/react_emitter_store';
import CatalogIntlProvider from '../../frame/components/CatalogIntlProvider';
import Routes from '../route/Routes';
import App from "../containers/App";

export default class Root extends React.Component<any, any>{
    render(): React.ReactElement<{}> {
        return (
            <CatalogIntlProvider>
                <Router history={hashHistory} routes={Routes}>
                </Router>
            </CatalogIntlProvider>
        )
    }
}