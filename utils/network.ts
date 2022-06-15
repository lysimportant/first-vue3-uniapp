import { $http } from '@escook/request-miniprogram'

export default function netWork () {
	uni.$http = $http
	$http.baseUrl = 'https://www.uinav.com'
	$http.beforeRequest = function () {
		uni.showLoading({
			title: "数据加载中...."
		})
	}
	$http.afterRequest = function () {
		uni.hideLoading()
	}
}
export const netGet = (url: string, data?: any) => {
	 return $http.get(url, data)
}
export const netPost = (url: string, data?: any) => {
	 return $http.post(url, data)
}
export const netPut = (url: string, data?: any) => {
	 return $http.put(url, data)
}
export const netDel = (url: string, data?: any) => {
	 return $http.delete(url, data)
}

