// 数字字典列表
export type AdminApiDictsGetParams = {
	// 品牌ID
	brandId?: number;
	// 编码
	code?: string;
	// 当前页
	curPage?: number;
	// 字典模块标识
	moduleFlag?: number;
	// 名字
	name?: string;
	// 每页数量
	pageSize?: number;
	// 备注
	remark?: string;
	startRow?: number;
};
