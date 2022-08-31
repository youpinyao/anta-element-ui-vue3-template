// 邮件模版列表
export type AdminApiEmail$TemplatesGetParams = {
	// 品牌ID
	brandId?: number;
	// 编码,不能修改
	code?: string;
	// 当前页
	curPage?: number;
	// 模版类型,使用数字字典
	moduleFlag?: number;
	// 名称
	name?: string;
	// 每页数量
	pageSize?: number;
	startRow?: number;
};
