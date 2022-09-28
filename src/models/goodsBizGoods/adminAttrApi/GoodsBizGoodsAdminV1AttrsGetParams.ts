// 商品属性名列表
export type GoodsBizGoodsAdminV1AttrsGetParams = {
	// 类型ID
	catId?: number;
	// ID
	id?: number;
	// 是否展示：1-展示、2-不展示
	isShow?: number;
	// 属性名字
	name?: string;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
};
