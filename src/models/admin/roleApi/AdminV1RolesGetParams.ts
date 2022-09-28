// 角色列表
export type AdminV1RolesGetParams = {
	// 模块类型
	moduleFlag?: number;
	// 名字
	name?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 备注
	remark?: string;
};
