function generator(data,curPage,pageSize){
    var totalPages = Math.ceil(data.length / pageSize);
    var startIndex = (curPage - 1) * pageSize;
    var endIndex = data.length < (curPage * pageSize) ? (data.length) : (curPage * pageSize);
    var result = data.slice(startIndex,endIndex);
    var totalRows = data.length;

    return {
        status: "200",
        serviceID: "c9b6c7f2-60a1-4c1c-a589-ca8eccde8bc9",
        data: {
            pageVO: {
                totalRows,
                curPage,
                pageSize,
                totalPages
            },
            result
        }
    };
}

module.exports = generator;