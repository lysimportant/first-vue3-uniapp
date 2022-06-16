"use strict";
var utils_network = require("../utils/network.js");
const findCateBar = () => {
  return utils_network.netGet("/api/public/v1/categories");
};
exports.findCateBar = findCateBar;
