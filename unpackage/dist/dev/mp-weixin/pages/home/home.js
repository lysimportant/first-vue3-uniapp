"use strict";
var common_vendor = require("../../common/vendor.js");
var api_home = require("../../api/home.js");
var utils_Toast = require("../../utils/Toast.js");
require("../../utils/network.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const swiperList = common_vendor.ref();
    const barList = common_vendor.ref();
    const floorList = common_vendor.ref();
    const getHomeData = async () => {
      const res = await api_home.findHomeSwiper();
      const bar = await api_home.findNavBar();
      const floor = await api_home.findFloorData();
      if (res.data.meta.status !== 200 || bar.data.meta.status !== 200 || floor.data.meta.status !== 200) {
        return utils_Toast.Toast();
      } else {
        swiperList.value = res.data.message;
        barList.value = bar.data.message;
        floor.data.message.forEach((item) => {
          item.product_list.forEach((prod) => {
            prod.url = "/goodslist/pages/goods/goods?" + prod.navigator_url.split("?")[1];
          });
        });
        floorList.value = floor.data.message;
        console.log(floorList.value);
      }
    };
    const navigate = (item) => {
      console.log(item);
      if (item.name === "\u5206\u7C7B") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    };
    const floorClick = (item) => {
      common_vendor.index.navigateTo({
        url: item.url
      });
      console.log(item);
    };
    common_vendor.onMounted(() => {
      getHomeData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (item, k0, i0) => {
          return {
            a: item.image_src,
            b: "/subshop/pages/shop/shop?id=" + item.goods_id,
            c: item.goods_id
          };
        }),
        b: common_vendor.f(barList.value, (item, k0, i0) => {
          return {
            a: item.image_src,
            b: item.id,
            c: common_vendor.o(($event) => navigate(item), item.id)
          };
        }),
        c: common_vendor.f(floorList.value, (item, index, i0) => {
          return {
            a: item.floor_title.image_src,
            b: common_vendor.f(item.product_list, (sub, index2, i1) => {
              return common_vendor.e({
                a: index2 === 0
              }, index2 === 0 ? {
                b: common_vendor.o(($event) => floorClick(sub)),
                c: sub.image_src
              } : {}, {
                d: sub.image_src,
                e: index2
              });
            }),
            c: common_vendor.f(item.product_list, (sub, index2, i1) => {
              return common_vendor.e({
                a: index2 > 0
              }, index2 > 0 ? {
                b: sub.image_width + "rpx",
                c: common_vendor.o(($event) => floorClick(sub)),
                d: sub.image_src
              } : {}, {
                e: sub.image_src,
                f: index2
              });
            }),
            d: index
          };
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Documents/HBuilderProjects/vue3-uni/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
