import BaseSpin from '../../../../frame/components/common/baseSpin';
import * as React from 'react';
import {ConfigStore} from "../../../store/react_emitter_store";
import {EmitterKeys} from "../../../store/emitter_keys";

export default class CommonSpin extends BaseSpin{
    static storeKey: string;
    listeners:any[] = [];
    real_storeKey:string;

    constructor(){
        super();
        let constructor: any = this.constructor;
        if (!constructor.storeKey) {
            throw new Error("继承自CommonSpin的对象必须包含属性：storeKey");
        }
        this.real_storeKey = constructor.storeKey;
    }

    componentWillMount(){
        this.listeners.push(
            ConfigStore.addListener(this.real_storeKey,(newState)=>{
                this.setState({
                    spinning:newState
                })
            })
        )
    }

    componentWillUnmount(){
        this.listeners.forEach((listener)=>{
            listener.remove();
        })
    }
}