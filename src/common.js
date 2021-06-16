"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var axiosHTTP = function () {
    var instance = axios_1["default"].create();
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error && error.response) {
            return error.response;
        }
        else {
            return Promise.reject(error);
        }
    });
    return instance;
};
exports["default"] = axiosHTTP();
