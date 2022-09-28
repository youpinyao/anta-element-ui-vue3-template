// 商品分类列表
export type GoodsBizGoodsAdminV1CategorysGetParams = {
	// 分类编码
	code?: string;
	// ID
	id?: number;
	// 是否在前台页面显示，1，显示；0，不显示
	isShow?: number;
	// 商品分类名称
	name?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	PId?: number;
};
