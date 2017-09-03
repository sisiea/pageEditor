const SERVICE_URL = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'backend' ? 'catalogui/dynamic/':'http://localhost:8080/cpi/api/';
const I18NDATA_URL = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'backend' ? 'catalogui/dynamic/':'http://localhost.huawei.com:9090/';
const NODE_ENV = process.env.NODE_ENV;

const ITEM_TYPE_PRODUCT = "1";
const ITEM_TYPE_MODULE = "2";

const IS_PRODUCT = (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production');
const IS_BACKEND = (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'backend');
export = {SERVICE_URL,I18NDATA_URL,NODE_ENV,ITEM_TYPE_PRODUCT,ITEM_TYPE_MODULE,IS_PRODUCT,IS_BACKEND};