import * as Promise from 'es6-promise';
import fetch = require ('isomorphic-fetch');
import {showHttpErrorMessage} from './MessageUtil';

Promise.polyfill();

export function get(url: string, options?: any): Promise<any> {
    let reqUrl = url;
    return fetch(reqUrl, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(response => {
        if(response.status != 200){
            showHttpErrorMessage(response.status+'');
        }
        return response.json();
    });
}

export function post(url: string, paramjson: any): Promise<any> {
    let reqUrl = url;
    return fetch(reqUrl, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(paramjson)
    }).then(response => {
        if(response.status != 200){
            showHttpErrorMessage(response.status+'');
        }
        return response.json();
    });
}

export function put(url: string, paramjson: any): Promise<any> {
    let reqUrl = url;
    return fetch(reqUrl, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(paramjson)
    }).then(response => {
        if(response.status != 200){
            showHttpErrorMessage(response.status+'');
        }
        return response.json();
    });
}

// 这里不能用delete，delete是关键字
export function del(url: string, paramjson: any): Promise<any> {
    let reqUrl = url;
    return fetch(reqUrl, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(paramjson)
    }).then(response => {
        if(response.status != 200){
            showHttpErrorMessage(response.status+'');
        }
        return response.json();
    });
}

export function generateRestUrl(url: string,urlPram:Object ,simServerParam: Object) {
    let urlPrefix = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'backend' ? '' : 'http://localhost:8089/simserver/';
    let urlPostfix = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'backend' ? '' : setQueryConfig(simServerParam);
    let resultUrl = urlPrefix + url + setQueryConfig(urlPram) + urlPostfix;
    resultUrl = resultUrl.slice(0,resultUrl.length-1);
    return resultUrl;
}

function setQueryConfig(params) {
    let _str = "";
    for (let key in params) {
        if (params[key] != -1) {
            _str += key + "=" + encodeURIComponent(params[key]) + "&";
        }
    }
    return _str;
} 