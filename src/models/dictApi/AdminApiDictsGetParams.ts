// 数字字典列表
export type AdminApiDictsGetParams = {
	// 编码
	code?: string;
	// 字典模块标识
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
