export const getMessage = (key: string, defaultMessage?: string, params?: any) => {
    if (!key) {
        return null;
    }

    // 如果找不到国际化对象，直接返回defaultMessage
    if (!window['intl']) {
        return defaultMessage || key;
    }

    const intlParams = params || {};
    return window['intl'].formatMessage({ id: key, defaultMessage: defaultMessage }, intlParams);
}
