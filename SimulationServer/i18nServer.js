var _ = require("lodash");

function queryI18n(queryObj, param) {
    var data = require("./i18nData");
    return {
        status: "200",
        serviceID: "c9b6c7f2-60a1-4c1c-a589-ca8eccde8bc9",
        data: data
    };
}

module.exports = {
    request: function (queryObj, param) {
        if (queryObj.query.method === "queryI18n") {
            return queryI18n(queryObj, param);
        } 
    }
};