import * as Spin from 'antd/lib/spin';
import * as React from 'react';

export default class BaseSpin extends React.Component<any,any>{

    listeners:any[] = [];

    constructor(){
        super();
        this.state={
            spinning:false
        }
    }

    componentWillReceiveProps(nextProps:any){
        if(nextProps.spinning){
            this.setState({
                spinning:true
            })
        }
    }

    render():React.ReactElement<{}>{
        return (
            <Spin {...this.props} spinning={this.state.spinning}>
                {this.props.children}
            </Spin>
        )
    }
}