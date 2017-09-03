import * as React from 'react';
import { BaseComponent } from '../../../frame/components/BaseComponent';
import { FormattedMessage, injectIntl } from 'react-intl';
import { get, generateRestUrl } from "../../../frame/util/RestUtil";
import * as Collapse from 'antd/lib/collapse';
const Panel = Collapse.Panel;
import * as Tag from 'antd/lib/tag';
var Constant = require('../../../frame/constants/Constant');
import * as objectAssign from 'object-assign';
import DraggableComponent from './DraggableComponent';
import { NATIVE_IMG, NATIVE_DIV, ANTD_BUTTON, ANTD_ROW_2, ANTD_ROW_3, ANTD_ROW_4 } from './ComponentJsonContants';
import AttrEditArea from './AttrEditArea';
var DragableTag = DraggableComponent(Tag);
class ComponentSelection extends BaseComponent<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="component-selection">
                <Collapse defaultActiveKey={["1", "2", "3"]}>
                    <Panel header={"Attr Edit 属性编辑,正在编辑的元素是：" + (this.props.editingData.title ? this.props.editingData.title : "你还没有选择元素")} key="1">
                        <AttrEditArea {...this.props}></AttrEditArea>
                    </Panel>
                    <Panel header="Antd Test component" key="2">
                        <DragableTag data-json={ANTD_BUTTON}>Button</DragableTag>
                        <DragableTag data-json={NATIVE_IMG}>Img</DragableTag>
                    </Panel>
                    <Panel header="Layout component" key="3">
                        <DragableTag data-json={NATIVE_DIV}>通用布局块 div</DragableTag>
                        <DragableTag data-json={ANTD_ROW_2}>2列栅格</DragableTag>
                        <DragableTag data-json={ANTD_ROW_3}>3列栅格</DragableTag>
                        <DragableTag data-json={ANTD_ROW_4}>4列栅格</DragableTag>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default injectIntl(ComponentSelection)


