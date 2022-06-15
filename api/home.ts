import { netGet } from '../utils/network'
/**
 * 轮播图的数据
 * @param {}  - 
 * */ 
export const findHomeSwiper = () => {
	return netGet('/api/public/v1/home/swiperdata')
}

/**
 * 获取导航的数据
 * @param {} - 
 * */
export const findNavBar = () => {
	return netGet('/api/public/v1/home/catitems')
}

/**
 * 获取楼层数据
 * @param {} - 
 * */
export const findFloorData = () => {
	return netGet('/api/public/v1/home/floordata')
}