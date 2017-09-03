/*
 * @Author: z00382069 zhangxinghai 
 * @Date: 2017-08-24 15:38:51 
 * @Last Modified by: z00382069 zhangxinghai
 * @Last Modified time: 2017-08-25 11:09:35
 */
import * as React from 'react';
import { ConfigStore, EmitterKeys } from '../../store/react_emitter_store';
import { BaseComponent } from '../../../frame/components/BaseComponent';
import { FormattedMessage, injectIntl } from 'react-intl';
import { get, generateRestUrl } from "../../../frame/util/RestUtil";
import './Header.less';
class Header extends BaseComponent<any, any> {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }

    render() {
        return (
            <div className='catalog-header'>
                <span className="catalog-header-logo"></span>
                <ul className="catalog-header-nav">
                    <li className="active">tab1</li>
                    <li>tab2</li>
                </ul>
                <ul className="catalog-header-top-menu">
                    <li><span className="icon-account catalog-iconfont catalog-top-menu-icon"></span></li>
                    <li><span className="catalog-top-menu-icon">EN</span></li>
                    <li><span className="icon-help catalog-iconfont catalog-top-menu-icon"></span></li>
                </ul>
            </div>
        )
    }
}
export default injectIntl(Header)