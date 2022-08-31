// 菜单访问日志列表
export type AdminApiView$LogsGetParams = {
	// 品牌ID
	brandId?: number;
	// 当前页
	curPage?: number;
	// 每页数量
	pageSize?: number;
	startRow?: number;
};
