import {EventEmitter} from 'fbemitter';
import {EmitterKeys} from './emitter_keys'
import * as objectAssign from 'object-assign'

let dataStore = {
    //default
};
let emitter = new EventEmitter();
//default err listener
emitter.addListener("error", (err)=> {
    console.trace(err);
});
export let ConfigStore = {

    getStore() {
        return dataStore;
    },

    getData(key)
    {
        return dataStore[key];
    },

    /**
     * 向store中放入数据并触发对应事件
     * @param key
     * @param value
     */
    putData(key, value)
    {
        dataStore[key] = value;
        emitter.emit(key, value);

    },

    /**
     * 向store中合并数据并触发对应事件
     * @param key
     * @param value
     */
    mergeData(key, value)
    {
        // Object 合并，其他直接赋值
        if (Object.prototype.toString.call(value) === '[object Object]') {
            //第一个参数target不设置，避免dataStore里没值时出错
            dataStore[key] = objectAssign({}, dataStore[key], value);
        } else {
            dataStore[key] = value;
        }
        emitter.emit(key, dataStore[key]);
    },

    /**
     * 删除数据
     * @param key
     */
    remove(key)
    {
        dataStore[key] = undefined;
        emitter.emit(key);
    },

    /**
     * 添加对应key的监听回调
     * @param key
     * @param callback
     * @returns {EventSubscription}
     */
    addListener(key, callback) {
        return emitter.addListener(key, (data)=> {
            //加一层异常处理
            try {
                callback(data)
            } catch (e) {
                console.log(e.stack);
            }
        });
    },

    /**
     * 添加仅执行一次后移除的监听
     * @param key
     * @param callback
     * @returns {EventSubscription}
     */
    once(key, callback){
        return emitter.once(key, (data)=> {
            //加一层异常处理
            try {
                callback(data)
            } catch (e) {
                console.log(e.stack);
            }
        });
    },

    /**
     * 获取对应key的监听回调
     * @param key
     */
    getListeners(key){
        emitter.listeners(key);
    },

    /**
     * 移除对应key的监听回调，不传参数则移除所有
     * @param key
     */
    removeAllListeners(key?: string){
        key ? emitter.removeAllListeners(key) : emitter.removeAllListeners()
    },

};

export {EmitterKeys};