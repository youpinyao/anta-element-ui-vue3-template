// 邮件模版列表
export type AdminV1Email$TemplatesGetParams = {
	// 编码,不能修改
	code?: string;
	// 模版类型,使用数字字典
	moduleFlag?: number;
	// 名称
	name?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
};
