/*
 * @Author: z00382069 zhangxinghai 
 * @Date: 2017-08-25 14:33:38 
 * @Last Modified by: z00382069 zhangxinghai
 * @Last Modified time: 2017-08-31 15:55:22
 */
import * as React from 'react';
import { BaseComponent } from '../../../frame/components/BaseComponent';
import { FormattedMessage, injectIntl } from 'react-intl';
import { get, generateRestUrl } from "../../../frame/util/RestUtil";
import * as Collapse from 'antd/lib/collapse';
const Panel = Collapse.Panel;
import * as Tag from 'antd/lib/tag';
import MainEditor from './MainEditor';
import ComponentSelection from './ComponentSelection';
import * as objectAssign from 'object-assign';
import './demo.less';
import json from './pageJson';
import * as _ from 'lodash';
import { NATIVE_DIV } from './ComponentJsonContants';

interface IPlaceProps {
    className?: string,
    onDragOver?: Function,
    onDrop?: Function,
    onDragLeave?: Function
}

class DemoPage extends BaseComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            store: {
                data: [JSON.parse(JSON.stringify(NATIVE_DIV))],
                isPreview: false,
                comNowIndex: 0,
                dependComponents: [],
                draggingData: {
                }
            },
            editingData:{

            }
        }
    }
    private onChange = ()=>{
        console.log('change force update');
        this.forceUpdate();
    }
    private onBeginEditComponentAttr =(data)=>{
        this.setState({
            editingData:data
        })
    }
    render() {
        return (
            <div className='demoPage'>
                <MainEditor store={this.state.store} onChange={this.onChange} onBeginEditComponentAttr={this.onBeginEditComponentAttr}></MainEditor>
                <ComponentSelection editingData={this.state.editingData} onChange={this.onChange}></ComponentSelection>
            </div>
        )
    }
}
export default injectIntl(DemoPage)