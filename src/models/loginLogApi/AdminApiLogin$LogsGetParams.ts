// 登录日志列表
export type AdminApiLogin$LogsGetParams = {
	// 开始时间
	beginTime?: string;
	// 品牌ID
	brandId?: number;
	// 当前页
	curPage?: number;
	// 结束时间
	endTime?: string;
	// 姓名
	fullName?: string;
	// 每页数量
	pageSize?: number;
	startRow?: number;
	// 状态
	successFlag?: number;
	// 用户名
	username?: string;
};
