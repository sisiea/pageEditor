import * as React from 'react';
import { ConfigStore, EmitterKeys } from '../store/react_emitter_store';
import GlobalSpin from '../components/common/common-global-spin';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
// import '../styles/main.less';
// import './App.less';
// const { Header, Footer, Sider, Content } = Layout;
export default class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    private allListeners = [];

    componentWillMount() {

    }
    render() {
        return (
            <div className="catalog-list-app">
                <GlobalSpin>
                    <Header></Header>
                    <div>{this.props.children}</div>
                    <Footer></Footer>
                </GlobalSpin>
            </div>
        )
    }
    componentWillUnmount() {
        //移除事件监听
        this.allListeners.forEach((listener) => {
            listener.remove();
        })
    }
}

// export default injectIntl(App);
