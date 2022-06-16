"use strict";
var common_vendor = require("../../common/vendor.js");
var api_cate = require("../../api/cate.js");
require("../../utils/network.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const barList = common_vendor.ref();
    const barLevel2 = common_vendor.ref();
    const active = common_vendor.ref(0);
    const scrollTop = common_vendor.ref(0);
    const wh = common_vendor.ref(0);
    const changeNavigate = (item, index) => {
      active.value = index;
      barLevel2.value = item.children;
      console.log(scrollTop.value);
      scrollTop.value = 1 - scrollTop.value;
    };
    common_vendor.onLoad(async () => {
      const leftBar = await api_cate.findCateBar();
      barList.value = leftBar.data.message;
      barLevel2.value = leftBar.data.message[0].children;
      const sysinfo = common_vendor.index.getSystemInfoSync();
      wh.value = sysinfo.windowHeight;
      console.log(barLevel2.value, "barLevel2.value");
    });
    const navigateThree = (sub) => {
      console.log(sub);
      common_vendor.index.navigateTo({
        url: "/goodslist/pages/goods/goods?cid=" + sub.cat_id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(barList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.cat_name),
            b: common_vendor.o(($event) => changeNavigate(item, index)),
            c: common_vendor.n(active.value === index ? "active" : "ll"),
            d: index
          };
        }),
        b: wh.value + "px;",
        c: common_vendor.f(barLevel2.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.cat_name),
            b: common_vendor.f(item.children, (sub, k1, i1) => {
              return {
                a: sub.cat_icon,
                b: common_vendor.t(sub.cat_name),
                c: common_vendor.o(($event) => navigateThree(sub)),
                d: sub.cat_id
              };
            }),
            c: item.cat_id
          };
        }),
        d: scrollTop.value,
        e: wh.value + "px;"
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Documents/HBuilderProjects/vue3-uni/pages/cate/cate.vue"]]);
wx.createPage(MiniProgramPage);
