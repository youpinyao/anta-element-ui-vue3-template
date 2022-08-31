// 访问日志列表
export type AdminApiService$LogsGetParams = {
	// 访问开始时间
	accessBeginTime?: string;
	// 访问结束时间
	accessEndTime?: string;
	// 品牌ID
	brandId?: number;
	// 当前页
	curPage?: number;
	// 姓名
	fullName?: string;
	// 每页数量
	pageSize?: number;
	startRow?: number;
	// 账户名
	username?: string;
};
