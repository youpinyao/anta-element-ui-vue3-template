// 职位分页列表
export type AdminV1PostionsGetParams = {
	// 名称
	name?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 备注
	remark?: string;
	// 状态:0-禁用,1-启用
	statusFlag?: number;
};
