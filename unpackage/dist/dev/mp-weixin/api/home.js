"use strict";
var utils_network = require("../utils/network.js");
const findHomeSwiper = () => {
  return utils_network.netGet("/api/public/v1/home/swiperdata");
};
const findNavBar = () => {
  return utils_network.netGet("/api/public/v1/home/catitems");
};
const findFloorData = () => {
  return utils_network.netGet("/api/public/v1/home/floordata");
};
exports.findFloorData = findFloorData;
exports.findHomeSwiper = findHomeSwiper;
exports.findNavBar = findNavBar;
