import * as notification from 'antd/lib/notification';
import * as React from 'react';
import {getMessage} from './i18nUtil';

/**
 * 展示系统Tips Message函数。
 * @param openType:Message的类型 , message:Message的标题 , description：Message的内容
 * @type string(可选：success,error,info,warning) , string , string
 */
export function showNotification(openType: string, message: string, description: string){
    let notificationConfig = {};
    notificationConfig['message'] = message;
    notificationConfig['description'] = description;      
    notification[openType](notificationConfig);
}

/**
 * 展示Http请求失败后的系统Tips。
 * @param httpcode:HttpResponse的状态码
 * @type string
 */
export function showHttpErrorMessage(httpcode: string) {
    let message = getHttpErrorJsonConfig(httpcode);
    if (message) {
        showNotification('error',message.message,message.description);
    }

}
/**
 * 根据HttpResponse的状态码返回notification的配置对象。
 * @param httpcode:HttpResponse的状态码
 * @type string
 * @return Object
 */
function getHttpErrorJsonConfig(httpcode) {
    switch (httpcode) {
        case '404':
            return { message: getMessage('MESSAGE.BackGroundInfoType'), 'description': getMessage('MESSAGE.404Info') };
        case '500':
            return { message: getMessage('MESSAGE.BackGroundInfoType'), 'description': getMessage('MESSAGE.500Info') };
        default:
            return { message: getMessage('MESSAGE.BackGroundInfoType'), 'description': getMessage('MESSAGE.OtherInfo') };
    }
}