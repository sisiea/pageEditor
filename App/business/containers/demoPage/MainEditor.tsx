import * as React from 'react';
import { BaseComponent } from '../../../frame/components/BaseComponent';
import { FormattedMessage, injectIntl } from 'react-intl';
import DraggableComponent from './DraggableComponent';
import * as _ from 'lodash';
import * as objectAssign from 'object-assign';
import NativeListener from 'react-native-listener';
var Antd = require('./SSAntd');
import './editor.less';

interface IPlaceProps {
    className?: string,
    onDragOver?: Function,
    onDrop?: Function,
    onDragLeave?: Function
}

interface IOutProps {
    onMouseOver?: Function,
    onMouseLeave?: Function,
    onClick?: Function
}

class MainEditor extends BaseComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * 遮罩层的坐标和大小
             */
            layer_x: 0,
            layer_y: 0,
            layer_show: false,
            layer_w: 0,
            layer_h: 0,
            activeComponent: {}
        }
    }
    componentWillMount() {
        this.store = this.props.store;
    }
    shouldComponentUpdate(){
        return true;
    }
    
    private store;
    private _getComponent = (types) => {
        if (types.length == 1) {
            return Antd[types[0]]
        } else {
            var lastT = types.pop();
            var com = this._getComponent(types)[lastT];
            return com;
        }
    }
    /**
     * 从目标一直向上层遍历寻找可以放置子组件的组件
     * 
     * @private
     * 
     * @memberOf DemoPage
     */
    private findCanDropTarget = (target) => {
        if (target.className.indexOf('draggable') != -1) {
            return target;
        } else {
            return this.findCanDropTarget(target.parentNode);
        }
    }
    /**
     * 显示组件的遮罩
     */
    private showLayer(target, d) {
        var pos = this.getDOMPOS(target);
        this.state.activeComponent = d,
            this.state.layer_x = pos.x;
        this.state.layer_y = pos.y;
        this.state.layer_w = target.offsetWidth;
        this.state.layer_h = target.offsetHeight;
        this.state.layer_show = true;
        this.forceUpdate();
    }

    private hideLayer() {
        this.state.layer_show = false;
        this.forceUpdate();
    }

    /**
     * 获取一个元素的位置
     */
    getDOMPOS(target) {
        var actualLeft = target.offsetLeft;
        var current = target.offsetParent;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        var actualTop = target.offsetTop;
        var current = target.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return {
            x: actualLeft,
            y: actualTop
        }
    }

    renderJSON = (json, is_preview) => {
        return (
            json.map((d, i) => {
                d.id = this.store.comNowIndex++;
                // 如果组件标记为删除，则不渲染
                if(d.hasDelete) {
                    return;
                }
                var component;
                //native html tag compomemt
                if (d.is_native) {
                    component = d.type;
                } else {
                    component = this._getComponent(d.type.split('.'));
                }

                var placeProps: IPlaceProps = {};
                d.props = d.props || {};

                if (d.can_place) {
                    // 如果是预览状态，不高亮，否则显示一个高亮的border
                    if (!is_preview) {
                        placeProps.className = 'draggable';
                    }

                    placeProps.onDrop = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("container ondrop");
                        console.log(JSON.parse(e.dataTransfer.getData("optionJsonInfo")));
                        this.findCanDropTarget(e.target).className = this.findCanDropTarget(e.target).className.replace('isdroping', '')
                        // var com = this.store.draggingData;
                        var com = JSON.parse(e.dataTransfer.getData("optionJsonInfo"))
                        d.childrens = d.childrens ? d.childrens : [];
                        d.childrens.push(_.cloneDeep(com));
                        this.forceUpdate();
                        this.props.onChange();
                    }
                    placeProps.onDragOver = (e) => {
                        e.preventDefault();
                        if (this.findCanDropTarget(e.target).className.indexOf('isdroping') == -1) {
                            this.findCanDropTarget(e.target).className += (' isdroping')
                        }
                    }
                    placeProps.onDragLeave = (e) => {
                        e.preventDefault();
                        this.findCanDropTarget(e.target).className = this.findCanDropTarget(e.target).className.replace('isdroping', '')
                    }
                }
                // 外层绑定一些事件，用来显示遮罩层和点击编辑事件
                var outerProps: IOutProps = {};
                outerProps.onMouseOver = (e) => {
                    e.stopPropagation();
                    e.preventDefault()
                    this.showLayer(e.target, d);
                }
                outerProps.onMouseLeave = (e) => {
                    e.stopPropagation();
                    this.hideLayer();
                }
                outerProps.onClick = (e) => {
                    e.stopPropagation();
                    this.props.onBeginEditComponentAttr(d);
                }

                var realProps = objectAssign({}, d.props);

                if (is_preview) {
                    return React.createElement(
                        component,
                        realProps,
                        d.props.content ? [d.props.content] : (d.childrens ? this.renderJSON(d.childrens, is_preview) : null)
                    )
                } else {
                    // 正常组件
                    objectAssign(realProps, placeProps);
                    let pri = (new Date()).toString();
                    return <NativeListener {...outerProps}>
                            {
                                React.createElement(
                                    component,
                                    realProps,
                                    d.props.content ? [d.props.content] : (d.childrens ? this.renderJSON(d.childrens, is_preview) : null))
                            }
                        </NativeListener>

                }

            })
        )

    }
    render() {
        return (
            <div className='main-editor'>
                <div style={{position:"relative"}}>
                {
                    this.renderJSON(this.store.data, this.store.isPreview)
                }
                </div>
                <div className='edit_layer' style={{
                    zIndex: 1000,
                    display: (this.state.layer_show ? 'block' : 'none'),
                    width: this.state.layer_w,
                    height: this.state.layer_h,
                    left: this.state.layer_x,
                    top: this.state.layer_y
                }}>
                </div>
            </div>
        )
    }
}

export default injectIntl(MainEditor);