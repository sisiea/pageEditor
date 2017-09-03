import * as React from 'react';
import * as objectAssign from 'object-assign'
import { IntlProvider, addLocaleData } from 'react-intl';
import * as LocaleProvider from 'antd/lib/locale-provider';
const enUS = require('antd/lib/locale-provider/en_US.js');
import { get, generateRestUrl } from '../util/RestUtil';
import * as Lockr from "lockr";
import 'intl/dist/Intl.min.js';
import {first_frame_zh,first_frame_en} from '../i18n/firstFrameI18n';

// 全局INTL对象
let intl = null;

export default class CatalogIntlProvider extends React.Component<any, any> {

    constructor(props) {
        super(props);
        const defaultLocale = 'zh';
        let uiLocale;
        let localeFromLocalStorage;
        if (!localStorage) {
            localeFromLocalStorage = localStorage.getItem('ui_locale');
        }
        if (!localeFromLocalStorage) {
            this.state = {
                locale: defaultLocale,
                hasLoadLatestI18n: false
            }
        } else {
            this.state = {
                locale: localeFromLocalStorage,
                hasLoadLatestI18n: false
            }
        }
    }
    private _copyI18nInfo(sourceArray: any[], targetMap: any) {
        for (let i18nInfo of sourceArray) {
            targetMap[i18nInfo.message_key] = i18nInfo.message;
        }
    }

    private first_frame_zh_info = first_frame_zh;
    private first_frame_en_info = first_frame_en;
    private i18n_zh_info;
    private i18n_en_info;

    componentWillMount() {
        if (Lockr.get('catalog_mall_zh') == null) {
            Lockr.set('catalog_mall_zh', this.first_frame_zh_info);
        }
        if (Lockr.get('catalog_mall_en') == null) {
            Lockr.set('catalog_mall_en', this.first_frame_en_info);
        }

        this.i18n_zh_info = Lockr.get('catalog_mall_zh');
        this.i18n_en_info = Lockr.get('catalog_mall_en');

        addLocaleData({
            ...this.i18n_en_info, pluralRuleFunction: function (n, ord) {
                return '';
            }
        });
        addLocaleData({
            ...this.i18n_zh_info, pluralRuleFunction: function (n, ord) {
                return '';
            }
        });
        let i18nUrl = generateRestUrl("i18n/getMessages?", { languages: "en_US,zh_CN" }, {
            entity: "i18nServer",
            method: "queryI18n"
        })
        get(i18nUrl).then(response => {
            let enInfoArray = response.data["en_US"];
            let zhInfoArray = response.data["zh_CN"];
            this._copyI18nInfo(enInfoArray, this.i18n_en_info);
            this._copyI18nInfo(zhInfoArray, this.i18n_zh_info);
            Lockr.set("catalog_mall_zh", this.i18n_zh_info);
            Lockr.set("catalog_mall_en", this.i18n_en_info);
            addLocaleData({
                ...this.i18n_en_info, pluralRuleFunction: function (n, ord) {
                    return '';
                }
            });
            addLocaleData({
                ...this.i18n_zh_info, pluralRuleFunction: function (n, ord) {
                    return '';
                }
            });
            this.setState({
                hasLoadLatestI18n: true
            })
        }).catch(e => console.log(e))
    }

    componentDidMount() {
        this.intlProvider();
    }

    componentDidUpdate() {
        this.intlProvider();
    }

    intlProvider() {
        const provider: any = (this.refs as any).innerProvider;
        window['intl'] = provider.getChildContext().intl;
    }

    getLangConfig = () => {
        if (!localStorage) {
            alert('浏览器不支持语言切换，请使用chrome IE8+ Opera FireFox Safari等浏览器\n' +
                'The browser can not support language switch,use chrome IE8+ Opera FireFox or Safari please');
            return {
                locale: 'zh',
                antdMessage: {},
                IntlMessage: this.i18n_zh_info
            };
        }

        if (this.state.locale == 'zh') {
            return {
                locale: 'zh',
                antdMessage: {},
                IntlMessage: this.i18n_zh_info
            }
        }
        else {
            return {
                locale: 'en',
                antdMessage: enUS,
                IntlMessage: this.i18n_en_info
            }

        }

    }

    render() {
        const langConfig = this.getLangConfig();

        return (
            <IntlProvider locale={this.state.locale} messages={langConfig.IntlMessage} ref='innerProvider'>
                <LocaleProvider locale={langConfig.antdMessage}>
                    {this.props.children}
                </LocaleProvider>
            </IntlProvider>
        )
    }
}
