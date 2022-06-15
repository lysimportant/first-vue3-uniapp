"use strict";
var common_vendor = require("../common/vendor.js");
function netWork() {
  common_vendor.index.$http = common_vendor.$http;
  common_vendor.$http.baseUrl = "https://www.uinav.com";
  common_vendor.$http.beforeRequest = function() {
    common_vendor.index.showLoading({
      title: "\u6570\u636E\u52A0\u8F7D\u4E2D...."
    });
  };
  common_vendor.$http.afterRequest = function() {
    common_vendor.index.hideLoading();
  };
}
const netGet = (url, data) => {
  return common_vendor.$http.get(url, data);
};
exports.netGet = netGet;
exports.netWork = netWork;
