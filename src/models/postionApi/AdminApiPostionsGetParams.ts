// 职位分页列表
export type AdminApiPostionsGetParams = {
	// 品牌ID
	brandId?: number;
	// 当前页
	curPage?: number;
	// 名称
	name?: string;
	// 每页数量
	pageSize?: number;
	// 备注
	remark?: string;
	startRow?: number;
	// 状态:0-禁用,1-启用
	statusFlag?: number;
};
