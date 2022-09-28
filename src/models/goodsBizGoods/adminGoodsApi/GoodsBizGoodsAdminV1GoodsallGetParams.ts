// 商品连表列表
export type GoodsBizGoodsAdminV1GoodsallGetParams = {
	// 款号
	alias?: string;
	// 小系列
	cat?: number;
	// 品类
	catAlias?: number;
	// 大类
	catType?: number;
	// 商品id
	id?: number;
	// 当前页
	page?: number;
	// 每页数量
	pageSize?: number;
	// 销售季节
	season?: number;
	// 系列
	series?: number;
	// 性别
	sex?: number;
	// 店铺id
	shopId?: number;
	// 商品状态：0-待上架、1-在架、2-下架
	status?: number;
};
