"use strict";
exports.__esModule = true;
var data = [
    { key: 'a', value: 1 },
    { key: 'b', value: 2 },
];
var Wrapper = /** @class */ (function () {
    function Wrapper() {
    }
    Wrapper.prototype.put = function (key, value) {
        var promise = new Promise(function (resolve, reject) {
            // Functionality here.
            // If success, then resolve else reject.
            var result = data.find(function (x) { return x.key === key; });
            if (result !== undefined && result !== null) {
                var index = data.findIndex(function (x) { return x.key === key; });
                result.value = value;
                data[index] = result;
                resolve(result);
            }
            else {
                reject("Data Not found");
            }
        });
        return promise;
    };
    Wrapper.prototype.del = function (key) {
        var promise = new Promise(function (resolve, reject) {
            // Functionality here.
            // If success, then resolve else reject.
            var result = data.find(function (x) { return x.key === key; });
            if (result !== undefined && result !== null) {
                var index = data.findIndex(function (x) { return x.key === key; });
                data.splice(index, 1);
                resolve(data);
            }
            else {
                reject("Data Not found");
            }
        });
        return promise;
    };
    Wrapper.prototype.get = function (key) {
        var promise = new Promise(function (resolve, reject) {
            var result = data.filter(function (x) { return x.key === key; });
            if (result !== undefined && result !== null) {
                resolve(result);
            }
            else {
                reject("Data Not found");
            }
        });
        return promise;
    };
    Wrapper.prototype.batchPut = function (dataArray) {
        var promise = new Promise(function (resolve, reject) {
            // Do your functionality here.
            // If success, then resolve else reject.
            var counter = 0;
            var originalData = data.slice();
            if (dataArray !== undefined && dataArray !== null) {
                if (dataArray.length > 0) {
                    dataArray.map(function (item, index) {
                        var result = data.find(function (x) { return x.key === item.key; });
                        if (result !== undefined && result !== null) {
                            var index_1 = data.findIndex(function (x) { return x.key === item.key; });
                            result.value = item.value;
                            data[index_1] = result;
                            counter++;
                        }
                        else {
                            data = originalData;
                            reject("Data Not found to update.");
                        }
                    });
                    if (counter > 0) {
                        resolve(data);
                    }
                }
            }
        });
        return promise;
    };
    return Wrapper;
}());
exports["default"] = Wrapper;
