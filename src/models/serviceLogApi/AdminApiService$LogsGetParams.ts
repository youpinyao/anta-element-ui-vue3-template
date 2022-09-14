// 访问日志列表
export type AdminApiService$LogsGetParams = {
	// 访问开始时间
	accessBeginTime?: string;
	// 访问结束时间
	accessEndTime?: string;
	// 姓名
	fullName?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 账户名
	username?: string;
};
