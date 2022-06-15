<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="item in swiperList" :key="item.goods_id">
			<navigator :url="'/subshop/pages/shop/shop?id='+item.goods_id" class="swiper-item"><image :src="item.image_src"></image></navigator>
		</swiper-item>
	</swiper>
	<view class="nav-list">
		<view v-for="item in barList" :key="item.id" @click="navigate(item)">
		 <image :src="item.image_src" class="nav-img"></image>
		</view>
	</view>
	<view class="floor">
		<view class="floor-item" v-for="(item, index) in floorList" :key="index">
			<view class="header"> <image mode="heightFix" :src="item.floor_title.image_src"></image> </view>
			<view class="body">
				<view class="left">
					<block
					class="sub-img"
					v-for="(sub, index) in item.product_list"
					:src="sub.image_src"
					:key="index"
					>
						<image
						v-if="index === 0"
						@click="floorClick(sub)"
						:src="sub.image_src"
						></image>
					</block>
				</view>
				<view class="right">
					<block
					v-for="(sub, index) in item.product_list"
					:src="sub.image_src"
					:key="index"
					>
						<image v-if="index > 0" 
						:style="{'width': sub.image_width+'rpx'}"
						@click="floorClick(sub)" :src="sub.image_src"></image>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref , onMounted } from 'vue'
import { findHomeSwiper, findNavBar, findFloorData } from '../../api/home.ts'
import Toast from '../../utils/Toast'
const swiperList = ref()
const barList = ref()
const floorList = ref()
const getHomeData = async ()  => {
	const res = await findHomeSwiper()
	const bar = await findNavBar()
	const floor = await findFloorData()
	if (res.data.meta.status !== 200 || bar.data.meta.status !== 200 || floor.data.meta.status !== 200) {
		return Toast()
	} else {
		swiperList.value = res.data.message
		barList.value = bar.data.message
		  // 通过双层 forEach 循环，处理 URL 地址
  floor.data.message.forEach(item => {
    item.product_list.forEach(prod => {
      prod.url = '/goodslist/pages/goods/goods?' + prod.navigator_url.split('?')[1]
    })
  })

		floorList.value = floor.data.message
		console.log(floorList.value)
	}
}

const navigate = (item) => {
	console.log(item)
	if (item.name === '分类') {
		uni.switchTab({
			url: '/pages/cate/cate'
		})
	}
}

const floorClick = (item) => {
	uni.navigateTo({
		url: item.url
	})
	console.log(item)
}

onMounted(() => {
	getHomeData()
})

</script>

<style lang="scss">
swiper {
 height: 330rpx;
 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor {
	.floor-item {
		margin: 10px 0;
		.header {
			height: 50rpx;
			margin-left: 10px;
			image {		
				width: 100%;
				height: 100%;
			}
		}
		.body {
			display: flex;
			.left {
				width: 233rpx;
				margin-left: 10px;
				image {
					width: 100%;
				}
			}
			.right {
				flex: 1;
				flex-wrap: wrap;
				image {
					margin: 0 3px;
					// width: 220rpx;
					height: 238rpx;
				}
			}
		}
	}
}
</style>
