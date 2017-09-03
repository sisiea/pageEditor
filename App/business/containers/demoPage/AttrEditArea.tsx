import * as React from 'react';
import { BaseComponent } from '../../../frame/components/BaseComponent';
import { FormattedMessage, injectIntl } from 'react-intl';
import { get, generateRestUrl } from "../../../frame/util/RestUtil";
import * as Button from 'antd/lib/button';
import * as Form from 'antd/lib/form';
const FormItem = Form.Item;
import * as objectAssign from 'object-assign';
// import { Panel as ColorPickerPanel } from 'rc-color-picker';
import { SketchPicker } from 'react-color'
class AttrEditArea extends BaseComponent<any, any>{
    constructor(props) {
        super(props);
    }

    private handleDele =()=>{
        this.props.editingData.hasDelete = true;
        this.props.onChange();
    }
    private renderConfig = (json)=>{
        if(!this.props.editingData.config){
            return;
        }
        return Object.keys(this.props.editingData.config).map((attr,index)=>{
            if ("style" == attr){
                var styleObj = this.props.editingData.config.style;
                return Object.keys(this.props.editingData.config.style).map((styleAttr,index)=>{
                    if("color" == styleObj[styleAttr].type){
                        return (<FormItem label={styleObj[styleAttr].text}>
                            {
                                React.createElement(
                                    SketchPicker,{
                                        color:this.props.editingData.props.style[styleAttr] || "#fff",
                                        onChangeComplete:({hex})=>{
                                            this.props.editingData.props.style[styleAttr] = hex;
                                            this.props.onChange();
                                        }
                                    }
                                )
                            }
                        </FormItem>)
                    }

                })
            }


        })
    }

    test =()=>{
        return (
            []
        )
    }
    render() {
        return (
            <div className="attr-edit-area">
                <div className='common-operation'>
                    <Button onClick={this.handleDele}>删除该元素</Button>
                    {this.renderConfig(this.props.editingData)}
                </div>
            </div>
        )
    }
}

export default injectIntl(AttrEditArea)


