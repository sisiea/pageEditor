import * as React from 'react';
export abstract class BaseComponent<P, S> extends React.Component<P, S> {

    // ----------------------- constructor --------------------------
    constructor(props: any) {
        super(props);
    }

    // ------------------------ i18n --------------------------------
    /**
     *   getMessage('ProductList.tip.NoSale')
     * 
     */
    protected getMessage(key: string, defaultMessage?: string, params?: any) {
        if (!key) {
            return null;
        }

        const props: any = this.props;

        // 如果找不到国际化对象，直接返回defaultMessage
        if (!props.intl) {
            return defaultMessage || key;
        }

        const intlParams = params || {};
        return props.intl.formatMessage({ id: key, defaultMessage: defaultMessage }, intlParams);
    }

    /**
     *  getIntlField({
     *          chsDesc: '描述',
     *          engDesc: 'Description'
     *      }, 'desc')
     */
    protected getIntlField(obj: any, field: string) {
        if (!field) {
            return null;
        }

        const props: any = this.props;

        // 如果找不到国际化对象中的前缀字段，直接返回obj[field]
        if (!props.intl || !props.intl.messages) {
            return obj[field];
        }

        // desc =====> chsDesc
        const intlField = props.intl.messages.fieldPrefix + field.substr(0, 1).toUpperCase() + field.substr(1);

        return obj[intlField];
    }

    /**
     * 判断当前在哪个locale下
     * 
     * isLocale('zh')
     */
    protected isLocale(locale: string) {
        if (!locale) {
            return false;
        }

        const props: any = this.props;

        // 如果找不到国际化对象，直接返回false
        if (!props.intl) {
            return false;
        }

        return props.intl.locale === locale;
    }

    /**
     * 将日期格式化成yyyy-MM-dd
     */
    protected formatDate(date: Date) {
        let year: any = date.getFullYear();
        let month: any = date.getMonth();
        if (month < 10) {
            month = '0' + month;
        }
        let day: any = date.getDay();
        if (day < 10) {
            day = '0' + day;
        }
        return `${year}-${month}-${day}`;
    }

    // ------------------------ listener ----------------------------
    protected allListeners: any = [];

    public componentWillUnmount() {
        //移除事件监听
        this.allListeners.forEach((listener) => {
            listener.remove();
        })
    }

    // --------------------- pure render --------------------------------

    /**
     * 判断组件是否需要重新渲染
     * 
     * @param {Object} nextProps - 下一个Props对象
     * @param {Object} nextState - 下一个state对象
     * @return {boolean} 组件是否需要渲染
     */
    public shouldComponentUpdate(nextProps: any, nextState: any) {
        return !this.shallowEqual(this.props, nextProps) ||
            !this.shallowEqual(this.state, nextState);
    }

    /**
     * 只展开对象下面的第一层来比较
     * 如果是普通对象，比较引用。
     * 
     * @param {Object} objA - 左值
     * @param {Object} objB - 右值
     * @return {boolean} 对象是否相等
     */
    private shallowEqual(objA: any, objB: any) {
        if (objA === objB) {
            return true;
        }

        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }

        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
        for (var i = 0; i < keysA.length; i++) {
            if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
            }
        }

        return true;
    }
}
