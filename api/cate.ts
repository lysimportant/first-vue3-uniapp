import { netGet } from '../utils/network'

/**
 * 获取分类的导航数据
 * @param {} -
 * */
export const findCateBar = () => {
	return netGet('/api/public/v1/categories')
}
