// 角色列表
export type AdminApiRolesGetParams = {
	// 品牌ID
	brandId?: number;
	// 当前页
	curPage?: number;
	// 模块类型
	moduleFlag?: number;
	// 名字
	name?: string;
	// 每页数量
	pageSize?: number;
	// 备注
	remark?: string;
	startRow?: number;
};
