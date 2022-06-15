"use strict";
var common_vendor = require("../common/vendor.js");
function Toast(title = "\u6570\u636E\u52A0\u8F7D\u5931\u8D25...", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
}
exports.Toast = Toast;
