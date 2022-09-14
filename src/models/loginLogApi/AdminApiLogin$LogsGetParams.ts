// 登录日志列表
export type AdminApiLogin$LogsGetParams = {
	// 开始时间
	beginTime?: string;
	// 结束时间
	endTime?: string;
	// 姓名
	fullName?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 状态
	successFlag?: number;
	// 用户名
	username?: string;
};
