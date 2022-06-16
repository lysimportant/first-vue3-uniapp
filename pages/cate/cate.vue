<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px;'}">
				<block v-for="(item, index) in barList" :key="index">
					<view @click="changeNavigate(item, index)" :class="['left-scroll-view-item', active === index ? 'active' : 'll']" >
						{{ item.cat_name }}
					</view>
				</block>
				
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view :scroll-top="scrollTop" class="right-scroll-view" scroll-y="true" :style="{height: wh+'px;'}">
						<block v-for="item in barLevel2" :key="item.cat_id">
							<view class="right-scroll-view-item">
								<view class="title">
									/ {{ item.cat_name }} /
								</view>
								<view class="banner">
									<block v-for="sub in item.children" :key="sub.cat_id">
											<view @click="navigateThree(sub)" class="banner-item">
												<image :src="sub.cat_icon" mode=""></image>
												<view>{{sub.cat_name}}</view>
											</view>
									</block>
								</view>
							</view>
						</block>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {findCateBar} from '../../api/cate'
const barList = ref()
const barLevel2 = ref()
const active = ref(0)
const scrollTop = ref(0)
const wh = ref(0)
const changeNavigate =(item, index) => {
	active.value = index;
	barLevel2.value = item.children
	console.log(scrollTop.value)
	scrollTop.value = 1 - scrollTop.value
}
onLoad(async () => {
	const leftBar = await findCateBar()
		barList.value = leftBar.data.message
		barLevel2.value = leftBar.data.message[0].children
		const sysinfo = uni.getSystemInfoSync()
		wh.value = sysinfo.windowHeight
		console.log(barLevel2.value, 'barLevel2.value')
		}) 		
// 跳转到3级路由
const navigateThree = (sub) => {
	console.log(sub)
	uni.navigateTo({
		url: "/goodslist/pages/goods/goods?cid=" + sub.cat_id
	})
}
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view {
		width: 120px;
		.left-scroll-view-item {
			text-align: center;
			line-height: 60px;
			background-color: #f7f7ff;
			font-size: 12px;
			&.active {
				position: relative;
				background-color: #ffffff;
				&::before {
					content: " ";
					display: block;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					width: 3px;
					height: 30px;
					background-color: #C00000;
				}
			}
		}
	}
	.right-scroll-view {
		&-item {
			.title {
				text-align: center;
			}
			.banner {
				display: flex;
				align-items: center;
				justify-content: space-around;
				flex-wrap: wrap;
				margin: 20rpx 10rpx;
				&-item {
					margin: 20rpx 10rpx;
					font-size: 12px;
					text-align: center;
					image {
						width: 60px;
						height: 60px;
					}
				}
			}
		}
	}
}
</style>
